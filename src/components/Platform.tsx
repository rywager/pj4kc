import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Home, Scissors, Shield, TrendingUp, Vote, Building2 } from 'lucide-react'

const issues = [
  {
    icon: Home,
    title: 'Affordable Housing',
    tag: 'Priority #1',
    tagColor: 'text-amber-400',
    body: `Kansas City has a 64,000-unit affordable housing shortage — and the worst unsheltered homelessness rate of any major U.S. city. That's not a statistic. That's a failure of leadership.`,
    points: [
      'Fast-track permitting for affordable housing developments',
      'Partner with developers to convert underutilized commercial space into workforce housing',
      'Create a KC Housing First fund — a dedicated budget line, not a one-time grant',
      'Incentivize ADU construction to increase neighborhood density organically',
    ],
  },
  {
    icon: Scissors,
    title: 'Cut the Fat',
    tag: 'Fiscal Responsibility',
    tagColor: 'text-green-400',
    body: `Kansas City has a $2.6 billion budget. PJ has run payroll. He knows the difference between investment and waste — and he will bring that discipline to City Hall.`,
    points: [
      'Zero-based budget review in year one — every line item must justify itself',
      'Eliminate redundant departments and administrative bloat',
      'No new programs without an honest revenue source or offset',
      'Transparent, public spending dashboard — live, real-time, searchable',
    ],
  },
  {
    icon: Shield,
    title: 'Public Safety & KCPD',
    tag: 'Law & Order',
    tagColor: 'text-blue-400',
    body: `Kansas City is the largest U.S. city that doesn't control its own police department. A state-appointed board runs KCPD while our streets bear the consequences. That ends.`,
    points: [
      'Champion KCPD local control — the city must govern its own public safety',
      'Community-embedded policing in high-crime neighborhoods',
      'Full accountability for use-of-force incidents — no cover-ups',
      'Mental health first responders for non-violent calls',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Economic Development',
    tag: 'Jobs & Growth',
    tagColor: 'text-purple-400',
    body: `The Chiefs are moving to Kansas. The Royals stadium deal is a $600M question mark. PJ will make sure KC doesn't just survive the post-Chiefs era — it thrives.`,
    points: [
      'KCI Airport Corridor: a 10-year economic development plan, not a press release',
      'Attract tech and logistics companies to fill the Chiefs-shaped gap',
      'Royals stadium deal transparency — the city deserves to know what it\'s getting',
      'Small business support office: permits, licensing, and mentorship in one place',
    ],
  },
  {
    icon: Vote,
    title: 'Neighborhood Representation',
    tag: 'For Every KC',
    tagColor: 'text-amber-400',
    body: `Kansas City has 316 neighborhoods. City Hall pays attention to about 10 of them. PJ will change that with a governing philosophy that starts at the neighborhood level.`,
    points: [
      'Annual Mayor\'s Neighborhood Tour — all 316, not just the ones with lobbyists',
      'Northland advisory council with direct mayor access',
      'Mandate neighborhood impact statements for major development decisions',
      'Fix the infrastructure south AND north of the river',
    ],
  },
  {
    icon: Building2,
    title: 'Purple Party Values',
    tag: 'Independent',
    tagColor: 'text-royal-300',
    body: `No party tells PJ what to do. He evaluates every issue the same way: What's right? What works? What's honest? That's the Purple Party — the party of common sense.`,
    points: [
      'No special interest donations — period',
      'Decisions based on data and community input, not party platforms',
      'Willing to work with Republicans AND Democrats to get things done',
      'Civic accountability: publish a mayoral scorecard every quarter',
    ],
  },
]

export function Platform() {
  const [ref, inView] = useInView()

  return (
    <section id="platform" className="py-24 bg-royal-950/50 relative" ref={ref}>
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">What PJ Stands For</span>
            <h2 className="section-title mb-4">
              A Platform Built on{' '}
              <span className="text-amber-400">Common Sense</span>
            </h2>
            <div className="gold-divider mx-auto" />
            <p className="text-royal-300 text-lg max-w-2xl mx-auto">
              No ideology. No party line. Just honest answers to Kansas City's real problems.
            </p>
          </motion.div>
        </div>

        {/* Issue cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue, i) => (
            <motion.div
              key={issue.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group bg-royal-900/50 border border-royal-700/40 hover:border-amber-500/40 p-7 card-hover transition-all duration-300"
            >
              {/* Icon + tag */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <issue.icon size={20} className="text-amber-400" />
                </div>
                <span className={`text-xs font-bold tracking-wider uppercase ${issue.tagColor}`}>
                  {issue.tag}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors">
                {issue.title}
              </h3>

              <p className="text-royal-300 text-sm leading-relaxed mb-5">{issue.body}</p>

              {/* Points */}
              <ul className="space-y-2.5 border-t border-royal-700/40 pt-4">
                {issue.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-xs text-royal-300 leading-relaxed">
                    <span className="mt-0.5 text-amber-500 font-bold flex-shrink-0">→</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
