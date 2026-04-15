import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { MapPin, ArrowUp, Plane, Building, Users, TrendingUp } from 'lucide-react'

const northlandFacts = [
  {
    icon: Users,
    stat: '250,000+',
    label: 'Northland Residents',
    detail: 'Clay & Platte Counties combined',
  },
  {
    icon: TrendingUp,
    stat: '#1',
    label: 'Fastest Growing Area',
    detail: 'In the greater KC metro region',
  },
  {
    icon: Plane,
    stat: '$1.5B',
    label: 'KCI Airport Investment',
    detail: 'New terminal, still underutilized',
  },
  {
    icon: Building,
    stat: '0',
    label: 'Mayors From the Northland',
    detail: 'In recent KC history',
  },
]

const neighborhoods = [
  'North Kansas City',
  'Gladstone',
  'Liberty',
  'Smithville',
  'Kearney',
  'Excelsior Springs',
  'Claycomo',
  'Riverside',
  'Parkville',
  'Platte City',
]

export function Northland() {
  const [ref, inView] = useInView()

  return (
    <section id="northland" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1C0A35 0%, #0F0718 50%, #1C0A35 100%)',
        }}
      />

      {/* Decorative north arrow */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <svg width="200" height="400" viewBox="0 0 200 400" fill="none">
          <path d="M100 20 L80 200 L100 180 L120 200 Z" fill="#F59E0B" />
          <path d="M100 380 L80 200 L100 220 L120 200 Z" fill="white" opacity="0.3" />
          <text x="87" y="15" fill="#F59E0B" fontSize="22" fontFamily="serif" fontWeight="bold">N</text>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">The Heart of PJ's Base</span>
            <h2 className="section-title mb-4">
              The Northland Deserves{' '}
              <span className="text-amber-400">A Seat at the Table</span>
            </h2>
            <div className="gold-divider mx-auto" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-royal-300 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            North of the Missouri River. North Kansas City through to KCI Airport.
            The Northland is one of the fastest-growing areas in the metro — yet City Hall
            has treated it like an afterthought for decades. PJ has spent his entire life here.
            He knows every street, every business, and nearly every family in Clay County.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {northlandFacts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative border border-amber-500/20 bg-royal-900/40 p-6 text-center card-hover"
            >
              <fact.icon size={24} className="text-amber-400 mx-auto mb-3" />
              <div className="font-serif text-3xl font-bold text-white mb-1">{fact.stat}</div>
              <div className="text-amber-300 text-sm font-semibold mb-1">{fact.label}</div>
              <div className="text-royal-400 text-xs">{fact.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* The Problem + The Plan */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: The Problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-royal-900/40 border border-royal-700/40 p-8"
          >
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              The Problem
            </h3>
            <div className="gold-divider" />
            <ul className="space-y-4 text-royal-300">
              {[
                'Infrastructure investment consistently prioritized for downtown while Northland roads, bridges, and neighborhoods fall behind',
                'KCI — a $1.5B investment on our doorstep — has no real economic development plan from the city',
                'No Northland representation on key city boards and commissions',
                'Transit ends at the river. The streetcar never crosses north.',
                'Economic development dollars go to the Power & Light District while Northland businesses scrape for crumbs',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-1 text-red-400 flex-shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: The Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-royal-900/40 border border-amber-500/30 p-8"
          >
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              PJ's Northland Plan
            </h3>
            <div className="gold-divider" />
            <ul className="space-y-4 text-royal-300">
              {[
                'Mandate proportional infrastructure investment — the Northland pays taxes, it deserves results',
                'Create a KCI Airport Corridor Economic Development Zone — jobs, logistics, hospitality',
                'Appoint Northland residents to every major city board and commission',
                'Push for transit expansion across the Missouri River — connecting Northland workers to downtown jobs',
                'Establish a Northland Business Council with a direct line to the Mayor\'s office',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                  <ArrowUp size={14} className="mt-1 text-amber-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Neighborhood ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="section-label mb-4">Communities PJ Calls Home</p>
          <div className="flex flex-wrap justify-center gap-3">
            {neighborhoods.map((n) => (
              <div
                key={n}
                className="flex items-center gap-1.5 px-4 py-2 bg-royal-900/60 border border-royal-700/40 text-royal-300 text-sm"
              >
                <MapPin size={10} className="text-amber-400" />
                {n}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
