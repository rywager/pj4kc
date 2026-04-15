import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export function PurpleParty() {
  const [ref, inView] = useInView()

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1C0A35 0%, #2E1065 40%, #3B1F6B 60%, #2E1065 80%, #1C0A35 100%)',
        }}
      />

      {/* Decorative split */}
      <div className="absolute inset-y-0 left-0 w-1/2 opacity-5"
        style={{ background: 'linear-gradient(90deg, #DC2626, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-1/2 opacity-5"
        style={{ background: 'linear-gradient(270deg, #2563EB, transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Purple star icon */}
          <div className="flex justify-center mb-8">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="star-glow">
              <polygon
                points="40,5 46,28 70,28 50,43 57,67 40,52 23,67 30,43 10,28 34,28"
                fill="#F59E0B"
                opacity="0.95"
              />
              <circle cx="40" cy="40" r="10" fill="#1C0A35" />
              <circle cx="40" cy="40" r="6" fill="#FCD34D" />
            </svg>
          </div>

          <span className="section-label">What We Believe</span>
          <h2 className="section-title mb-6 text-white">
            The Purple Party:
            <br />
            <span className="text-amber-400">Neither. Both. Better.</span>
          </h2>
          <div className="gold-divider mx-auto" />

          {/* The blend explanation */}
          <div className="flex justify-center items-center gap-6 mb-10 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2 mx-auto"
                style={{ background: '#DC2626' }}>
                R
              </div>
              <p className="text-xs text-royal-300 tracking-wider uppercase">Fiscal Discipline<br />Individual Rights<br />Local Control</p>
            </div>
            <div className="text-amber-400 text-4xl font-bold">+</div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2 mx-auto"
                style={{ background: '#2563EB' }}>
                D
              </div>
              <p className="text-xs text-royal-300 tracking-wider uppercase">Affordable Housing<br />Workers' Rights<br />Community Investment</p>
            </div>
            <div className="text-amber-400 text-4xl font-bold">=</div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2 mx-auto"
                style={{ background: '#7C3AED' }}>
                PJ
              </div>
              <p className="text-xs text-amber-300 tracking-wider uppercase">Common Sense<br />For Kansas City<br />Full Stop</p>
            </div>
          </div>

          <p className="text-royal-200 text-lg leading-relaxed max-w-3xl mx-auto">
            Kansas City's problems don't care about party affiliation. Potholes don't vote Republican.
            Homelessness doesn't vote Democrat. PJ evaluates every issue on its merits — and he'll
            work with anyone who wants to actually get things done.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
