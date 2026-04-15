import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Quote } from 'lucide-react'

const quotes = [
  {
    name: 'Clay County Neighbor',
    role: 'Lifelong Northland Resident',
    quote:
      "My grandfather knew the Guastellos. My dad knew PJ's dad. I know PJ. Three generations of a family that actually gives a damn about this community. That's who I want in City Hall.",
  },
  {
    name: 'Small Business Owner',
    role: 'North Kansas City',
    quote:
      "PJ has been in my shop, eaten at my restaurant, and sent business my way for years. He doesn't just talk about supporting local — he does it. Every day.",
  },
  {
    name: 'KC Northland Resident',
    role: 'Clay County, 20 Years',
    quote:
      "We pay our taxes just like everyone south of the river. We just never get anything for it. PJ is the first candidate who's actually made us feel seen.",
  },
]

const placeholderEndorsers = [
  'Clay County Business Alliance',
  'Northland Neighborhood Association',
  'KC Independent Business Coalition',
  'Italian American Heritage Foundation',
  'North KC Chamber of Commerce',
  'Gladstone Community Council',
]

export function Endorsements() {
  const [ref, inView] = useInView()

  return (
    <section id="endorsements" className="py-24 bg-royal-950/80" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Community Voices</span>
            <h2 className="section-title mb-4">
              Clay County <span className="text-amber-400">Knows PJ</span>
            </h2>
            <div className="gold-divider mx-auto" />
            <p className="text-royal-300 text-lg max-w-2xl mx-auto">
              In the Northland, your reputation is everything — and everyone in Clay County either
              knows PJ or knows someone who does.
            </p>
          </motion.div>
        </div>

        {/* Quote cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {quotes.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-royal-900/50 border border-royal-700/40 p-7 card-hover relative"
            >
              <Quote size={28} className="text-amber-500/30 absolute top-6 right-6" />
              <p className="text-royal-200 text-sm leading-relaxed mb-6 italic">
                "{q.quote}"
              </p>
              <div className="border-t border-royal-700/40 pt-4">
                <div className="font-bold text-white text-sm">{q.name}</div>
                <div className="text-amber-400 text-xs tracking-wider mt-0.5">{q.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Endorser logos / name chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="section-label mb-6">Organizational Endorsements</p>
          <div className="flex flex-wrap justify-center gap-3">
            {placeholderEndorsers.map((org) => (
              <div
                key={org}
                className="px-5 py-2.5 border border-royal-600/50 bg-royal-900/30 text-royal-300 text-sm font-medium"
              >
                {org}
              </div>
            ))}
            <div className="px-5 py-2.5 border border-amber-500/30 bg-amber-500/5 text-amber-400 text-sm font-medium italic">
              + More Announced Soon
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
