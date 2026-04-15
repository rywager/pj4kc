#!/bin/bash
# ============================================================================
# PJ Guastello Jr. for Kansas City — Campaign Video Generator
# Uses Veo 3.1 (AI Studio API) — same pattern as anava-marketing
# ============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="$ROOT_DIR/public/videos"
HEADSHOT="$ROOT_DIR/public/images/pj-headshot-2.jpg"

mkdir -p "$OUTPUT_DIR"

# ── API Key ──────────────────────────────────────────────────────────────────
if [ -z "${GEMINI_API_KEY:-}" ]; then
  GEMINI_API_KEY=$(gcloud secrets versions access latest --secret=GEMINI_API_KEY --project=anava-ai 2>/dev/null)
fi
if [ -z "${GEMINI_API_KEY:-}" ]; then
  echo "ERROR: GEMINI_API_KEY not available"
  echo "Run: gcloud config set account ryan@anava.ai"
  exit 1
fi

MODEL="veo-3.1-generate-preview"
DURATION=8
ASPECT="16:9"
RESOLUTION="1080p"

echo "════════════════════════════════════════"
echo " PJ Guastello Jr. — Campaign Video"
echo "════════════════════════════════════════"
echo " Model:    $MODEL"
echo " Duration: ${DURATION}s | $ASPECT | $RESOLUTION"
echo " Key:      ${GEMINI_API_KEY:0:10}..."
echo ""

# ── Veo generation function ──────────────────────────────────────────────────
generate_video() {
  local output_path="$1"
  local prompt="$2"
  local use_image="${3:-false}"  # "true" to use headshot as reference

  if [ -f "$output_path" ] && [ -s "$output_path" ]; then
    echo "  SKIP: $(basename "$output_path") already exists"
    return 0
  fi

  echo "  → Generating: $(basename "$output_path")"
  echo "    ${prompt:0:100}..."

  # Build request body
  local request_body
  if [ "$use_image" = "true" ] && [ -f "$HEADSHOT" ]; then
    echo "    Using headshot as reference image (image-to-video)"
    local image_b64
    image_b64=$(base64 -i "$HEADSHOT" | tr -d '\n')
    request_body=$(python3 -c "
import json, sys
prompt = sys.argv[1]
img = sys.argv[2]
body = {
  'instances': [{
    'prompt': prompt,
    'image': {
      'bytesBase64Encoded': img,
      'mimeType': 'image/jpeg'
    }
  }],
  'parameters': {
    'durationSeconds': $DURATION,
    'aspectRatio': '$ASPECT',
    'resolution': '$RESOLUTION',
    'personGeneration': 'allow_all'
  }
}
print(json.dumps(body))
" "$prompt" "$image_b64")
  else
    if [ "$use_image" = "true" ]; then
      echo "    (headshot not found, using text-to-video)"
    fi
    request_body=$(python3 -c "
import json, sys
prompt = sys.argv[1]
body = {
  'instances': [{'prompt': prompt}],
  'parameters': {
    'durationSeconds': $DURATION,
    'aspectRatio': '$ASPECT',
    'resolution': '$RESOLUTION',
    'personGeneration': 'allow_all'
  }
}
print(json.dumps(body))
" "$prompt")
  fi

  # Submit
  local response
  response=$(curl -s -w "\n<HTTP>%{http_code}" \
    -X POST "https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predictLongRunning" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$request_body" 2>/dev/null)

  local http_code
  http_code=$(echo "$response" | grep "<HTTP>" | sed 's/<HTTP>//')
  local body
  body=$(echo "$response" | grep -v "<HTTP>")

  if [ "$http_code" != "200" ]; then
    echo "  ERROR: HTTP $http_code"
    echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"
    return 1
  fi

  local operation_name
  operation_name=$(echo "$body" | python3 -c "import sys,json; print(json.load(sys.stdin)['name'])")

  echo "  ✓ Submitted: $operation_name"
  echo "  ⏳ Polling (up to 10 min)..."

  # Poll
  for ((i=1; i<=60; i++)); do
    sleep 10
    local poll
    poll=$(curl -s "https://generativelanguage.googleapis.com/v1beta/${operation_name}" \
      -H "x-goog-api-key: $GEMINI_API_KEY" 2>/dev/null)

    local done
    done=$(echo "$poll" | python3 -c "import sys,json; print(json.load(sys.stdin).get('done', False))" 2>/dev/null)

    if [ "$done" = "True" ]; then
      echo ""
      echo "  ✓ Done after $((i * 10))s"

      local video_uri
      video_uri=$(echo "$poll" | python3 -c "
import sys, json
d = json.load(sys.stdin)
resp = d.get('response', {})
gen = resp.get('generateVideoResponse', {})
samples = gen.get('generatedSamples', [])
if samples:
    print(samples[0].get('video', {}).get('uri', ''))
else:
    reasons = resp.get('raiMediaFilteredReasons', [])
    if reasons:
        print('FILTERED:' + ','.join(reasons))
" 2>/dev/null)

      if [[ "$video_uri" == FILTERED:* ]]; then
        echo "  ⚠ Content filtered: ${video_uri#FILTERED:}"
        echo "  Trying alternative prompt..."
        return 1
      fi

      echo "  ↓ Downloading..."
      curl -sL -H "x-goog-api-key: $GEMINI_API_KEY" "$video_uri" -o "$output_path"
      local sz
      sz=$(ls -lh "$output_path" 2>/dev/null | awk '{print $5}')
      echo "  ✅ Saved: $(basename "$output_path") ($sz)"
      return 0
    fi
    printf "  Polling %d/60 (%ds)...\r" "$i" "$((i * 10))"
  done
  echo "  TIMEOUT"
  return 1
}

# ── Segment 1: Candidate waving, KC skyline ───────────────────────────────────
echo "── Segment 1: Candidate + KC Skyline ──"
generate_video "$OUTPUT_DIR/pj-kc-skyline.mp4" \
  "Cinematic political campaign footage. A confident, charismatic Italian-American man in his 50s with dark wavy hair, wearing a sharp deep navy suit, waves warmly to an enthusiastic crowd of supporters at a Kansas City outdoor rally. Behind him, the iconic Kansas City skyline glows in golden late-afternoon light — Union Station visible in the distance, the Missouri River catching the sunlight. Purple and gold campaign signs fill the crowd. The man smiles broadly with genuine warmth and connection. Slow dolly shot pulling back to reveal the full scene. Shallow depth of field. Cinematic color grade — deep purples and warm ambers. 4K film quality, warm golden hour light." \
  "true"

# ── Segment 2: Northland street walk ─────────────────────────────────────────
echo ""
echo "── Segment 2: Northland Neighborhood Walk ──"
generate_video "$OUTPUT_DIR/pj-northland-walk.mp4" \
  "A confident, likable Italian-American man in his 50s with dark wavy hair wearing a navy suit jacket (no tie, approachable) walks down a tree-lined street in a classic North Kansas City residential neighborhood, stopping to shake hands and greet locals warmly. American flags visible on porches. A woman hands him a coffee cup. He laughs genuinely. Kids wave. Tracking shot following him from the side. Warm afternoon light. Cinematic but authentic — not slick or staged. Deep purple tones in sky, golden sunlight on neighborhood." \
  "true"

# ── Segment 3: Business / results energy ─────────────────────────────────────
echo ""
echo "── Segment 3: Business Leader Energy ──"
generate_video "$OUTPUT_DIR/pj-leader.mp4" \
  "A confident, successful businessman in his 50s with dark wavy hair stands at a podium addressing a packed town hall meeting room. Crowd is diverse — working class and business owners mixed together, all engaged. Purple and gold 'PJ for Kansas City' signs on the walls. He speaks with conviction and passion, gesturing firmly. Tight shot on his face — strong jaw, warm eyes, genuine conviction. Cut to crowd nodding, applauding. Cinematic lighting, deep purple and gold color grade. High production value political documentary aesthetic." \
  "false"

echo ""
echo "════════════════════════════════════════"
echo " ✅ Campaign video generation complete"
echo " Files in: $OUTPUT_DIR"
ls -lh "$OUTPUT_DIR"/*.mp4 2>/dev/null || echo " (no .mp4 files yet)"
echo "════════════════════════════════════════"
