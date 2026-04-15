#!/usr/bin/env node
/**
 * Veo 2 video generation script for PJ Guastello Jr. campaign.
 * Generates a clip of PJ waving in front of the Kansas City skyline.
 *
 * Prerequisites:
 *   gcloud auth application-default login
 *   npm install @google-cloud/aiplatform
 *
 * Usage:
 *   node scripts/generate-veo-clip.js
 *
 * Output: public/videos/pj-kc-skyline.mp4
 */

import { execSync } from 'child_process'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT_DIR = join(ROOT, 'public', 'videos')
const OUTPUT_FILE = join(OUTPUT_DIR, 'pj-kc-skyline.mp4')

// --- CONFIG ---
const PROJECT_ID = process.env.GCP_PROJECT || 'pj4kc-2027'
const LOCATION = 'us-central1'
const MODEL = 'veo-2.0-generate-001'

// The video prompt — cinematic, campaign-appropriate
const PROMPT = `
  Cinematic campaign video.
  A confident, warm middle-aged Italian-American man in a sharp navy suit
  waves to a crowd of cheering Kansas City supporters.
  Behind him, the iconic Kansas City skyline glows in golden late-afternoon light —
  Union Station visible in the distance, Missouri River catching the sunlight.
  Purple and gold campaign signs fill the crowd.
  The man smiles broadly, full of energy and connection with the crowd.
  Dolly shot, slow zoom out, shallow depth of field.
  Cinematic color grade — deep purples and warm golds.
  Patriotic but modern. Approachable, not stiff.
`.trim()

async function generateVeoClip() {
  console.log('🎬 Veo 2 Campaign Clip Generator')
  console.log('=================================')
  console.log(`Project: ${PROJECT_ID}`)
  console.log(`Model:   ${MODEL}`)
  console.log('')
  console.log('Prompt:')
  console.log(PROMPT)
  console.log('')

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Get access token via gcloud
  const token = execSync('gcloud auth application-default print-access-token 2>/dev/null', {
    encoding: 'utf8',
  }).trim()

  if (!token) {
    console.error('❌ No GCP credentials. Run: gcloud auth application-default login')
    process.exit(1)
  }

  const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:predictLongRunning`

  console.log('📡 Submitting to Vertex AI Veo 2...')

  const requestBody = {
    instances: [
      {
        prompt: PROMPT,
      },
    ],
    parameters: {
      aspectRatio: '16:9',
      durationSeconds: 8,
      sampleCount: 1,
      enhancePrompt: true,
      generateAudio: false,
    },
  }

  const submitResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  if (!submitResponse.ok) {
    const err = await submitResponse.text()
    console.error('❌ Failed to submit:', err)
    process.exit(1)
  }

  const operation = await submitResponse.json()
  const operationName = operation.name

  console.log(`✅ Operation submitted: ${operationName}`)
  console.log('⏳ Polling for completion (usually 2-3 minutes)...')

  // Poll for completion
  const pollEndpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/${operationName}`
  let attempts = 0

  while (attempts < 60) {
    await new Promise((r) => setTimeout(r, 5000))
    attempts++

    const pollToken = execSync('gcloud auth application-default print-access-token 2>/dev/null', {
      encoding: 'utf8',
    }).trim()

    const pollResponse = await fetch(pollEndpoint, {
      headers: { Authorization: `Bearer ${pollToken}` },
    })

    const pollData = await pollResponse.json()

    if (pollData.done) {
      if (pollData.error) {
        console.error('❌ Generation failed:', JSON.stringify(pollData.error, null, 2))
        process.exit(1)
      }

      const videos = pollData.response?.predictions
      if (!videos || videos.length === 0) {
        console.error('❌ No video in response:', JSON.stringify(pollData, null, 2))
        process.exit(1)
      }

      const videoData = videos[0]
      const videoBase64 = videoData.bytesBase64Encoded || videoData.video?.bytesBase64Encoded

      if (videoBase64) {
        const buffer = Buffer.from(videoBase64, 'base64')
        writeFileSync(OUTPUT_FILE, buffer)
        console.log(`✅ Video saved: ${OUTPUT_FILE}`)
        console.log(`   Size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`)
      } else if (videoData.gcsUri) {
        console.log(`✅ Video available at GCS: ${videoData.gcsUri}`)
        console.log('   Download with: gsutil cp', videoData.gcsUri, OUTPUT_FILE)
      }

      break
    }

    process.stdout.write(`.`)
    if (attempts % 12 === 0) {
      console.log(` (${attempts * 5}s elapsed)`)
    }
  }

  if (attempts >= 60) {
    console.error('\n❌ Timed out after 5 minutes')
    process.exit(1)
  }
}

generateVeoClip().catch(console.error)
