import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Mail, Phone, MapPin, Heart, Users, Share2, CheckCircle } from 'lucide-react'

function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire to Firebase
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <CheckCircle size={48} className="text-amber-400" />
        <h4 className="font-serif text-2xl font-bold text-white">You're In!</h4>
        <p className="text-royal-300">We'll be in touch within 24 hours. Welcome to the team.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-royal-400 tracking-wider uppercase block mb-1.5">Full Name *</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full bg-royal-900/60 border border-royal-700/50 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-500/60 placeholder-royal-600 transition-colors"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="text-xs text-royal-400 tracking-wider uppercase block mb-1.5">Email *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full bg-royal-900/60 border border-royal-700/50 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-500/60 placeholder-royal-600 transition-colors"
            placeholder="jane@example.com"
          />
        </div>
      </div>
      <div>
        <label className="text-xs text-royal-400 tracking-wider uppercase block mb-1.5">Phone</label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="w-full bg-royal-900/60 border border-royal-700/50 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-500/60 placeholder-royal-600 transition-colors"
          placeholder="(816) 555-0100"
        />
      </div>
      <div>
        <label className="text-xs text-royal-400 tracking-wider uppercase block mb-1.5">How do you want to help?</label>
        <select
          value={form.interest}
          onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
          className="w-full bg-royal-900/60 border border-royal-700/50 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-500/60 transition-colors"
        >
          <option value="">Select an option</option>
          <option value="canvass">Canvassing / Door Knocking</option>
          <option value="phone">Phone Banking</option>
          <option value="events">Event Organizing</option>
          <option value="social">Social Media</option>
          <option value="donate">Financial Support</option>
          <option value="northland">Northland Outreach</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" className="btn-primary w-full text-sm">
        Join the Team
      </button>
      <p className="text-royal-500 text-xs text-center">
        Your information will never be sold or shared with third parties.
      </p>
    </form>
  )
}

export function GetInvolved() {
  const [ref, inView] = useInView()

  return (
    <section id="involved" className="py-24 bg-royal-950" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Get In The Fight</span>
            <h2 className="section-title mb-4">
              Kansas City Wins{' '}
              <span className="text-amber-400">When You Show Up</span>
            </h2>
            <div className="gold-divider mx-auto" />
            <p className="text-royal-300 text-lg max-w-2xl mx-auto">
              PJ can't change City Hall alone. He needs the Northland. He needs every KC neighborhood.
              He needs you.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Volunteer form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 bg-royal-900/50 border border-royal-700/40 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users size={20} className="text-amber-400" />
              <h3 className="font-serif text-2xl font-bold text-white">Volunteer</h3>
            </div>
            <VolunteerForm />
          </motion.div>

          {/* Donate + share */}
          <div className="flex flex-col gap-6">
            {/* Donate */}
            <motion.div
              id="donate"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-amber-500/10 border border-amber-500/30 p-7 flex-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart size={20} className="text-amber-400" />
                <h3 className="font-serif text-xl font-bold text-white">Donate</h3>
              </div>
              <p className="text-royal-300 text-sm leading-relaxed mb-6">
                PJ doesn't take PAC money or corporate donations.
                Every dollar comes from real Kansas Citians — people who want change.
              </p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['$25', '$50', '$100', '$250', '$500', 'Other'].map(amt => (
                  <button
                    key={amt}
                    className="py-2 text-sm font-bold border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 transition-colors"
                  >
                    {amt}
                  </button>
                ))}
              </div>
              <button className="btn-primary w-full text-sm">
                Donate Securely
              </button>
              <p className="text-royal-500 text-xs text-center mt-3">
                Paid for by PJ Guastello Jr. for Kansas City
              </p>
            </motion.div>

            {/* Spread the word */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-royal-900/50 border border-royal-700/40 p-7"
            >
              <div className="flex items-center gap-3 mb-4">
                <Share2 size={20} className="text-amber-400" />
                <h3 className="font-serif text-xl font-bold text-white">Spread the Word</h3>
              </div>
              <p className="text-royal-300 text-sm leading-relaxed mb-4">
                In the Northland, word of mouth is everything. Tell a neighbor. Text a friend.
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 text-xs font-bold border border-royal-600/50 text-royal-300 hover:border-amber-500/40 hover:text-amber-300 transition-colors">
                  Facebook
                </button>
                <button className="flex-1 py-2.5 text-xs font-bold border border-royal-600/50 text-royal-300 hover:border-amber-500/40 hover:text-amber-300 transition-colors">
                  X / Twitter
                </button>
                <button className="flex-1 py-2.5 text-xs font-bold border border-royal-600/50 text-royal-300 hover:border-amber-500/40 hover:text-amber-300 transition-colors">
                  Copy Link
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border border-royal-700/40 bg-royal-900/30 p-6"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm text-royal-300">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-amber-400" />
              <span>info@pjforkansascity.com</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-royal-700" />
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-amber-400" />
              <span>(816) 555-VOTE</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-royal-700" />
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-amber-400" />
              <span>North Kansas City, MO 64116</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
