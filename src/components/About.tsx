import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { BadgeCheck, Building2, Heart, Users } from 'lucide-react'

const pillars = [
  {
    icon: Building2,
    title: 'Successful Business Owner',
    body: 'Built a business from the ground up right here in Kansas City. He knows what it takes to create jobs, manage a budget, and deliver results without excuses.',
  },
  {
    icon: Heart,
    title: 'Italian-American Roots',
    body: 'PJ\'s family came to Kansas City generations ago and put down roots in the Northland. That immigrant work ethic — family first, community always — guides everything he does.',
  },
  {
    icon: Users,
    title: '100+ Years in KC',
    body: 'Three generations of Guastellos have called Clay County home. PJ grew up knowing every neighborhood, every business, every family on both sides of the river.',
  },
  {
    icon: BadgeCheck,
    title: 'Financially Independent',
    body: 'PJ doesn\'t need this job. He can\'t be bought, can\'t be pressured, and won\'t owe anyone a favor. That\'s what uncorruptable looks like.',
  },
]

export function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="py-24 bg-royal-950" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Meet the Candidate</span>
            <h2 className="section-title mb-6">
              PJ Guastello Jr.
              <br />
              <span className="text-amber-400">Built Here. Fighting Here.</span>
            </h2>
            <div className="gold-divider" />
            <p className="text-royal-300 text-lg leading-relaxed mb-6">
              PJ Guastello Jr. is not a career politician. He's a Kansas City man — a third-generation
              Northlander who grew up understanding what it means to work hard, build something real,
              and take care of your neighbors.
            </p>
            <p className="text-royal-300 text-lg leading-relaxed mb-6">
              While City Hall has spent decades focused on downtown development, the Power & Light District,
              and political pet projects, the Northland — Clay County, North KC, the corridor to KCI — has
              been largely ignored. PJ is done watching his community get left out of the conversation.
            </p>
            <p className="text-royal-300 text-lg leading-relaxed mb-8">
              He's running as a Purple Party candidate because Kansas City doesn't need another red or blue
              politician fighting culture wars. It needs someone who wakes up every morning asking one simple
              question: <em className="text-white">"What's actually right for Kansas City?"</em>
            </p>
            <blockquote className="border-l-4 border-amber-500 pl-6 py-2 mb-8">
              <p className="text-white text-xl font-serif italic leading-relaxed">
                "I'm not running to be a Democrat. I'm not running to be a Republican.
                I'm running to be your mayor."
              </p>
              <footer className="text-amber-400 text-sm font-bold mt-3 tracking-wider uppercase">
                — PJ Guastello Jr.
              </footer>
            </blockquote>
          </motion.div>

          {/* Right: Photo placeholder + pillars */}
          <div>
            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mb-10"
            >
              <div
                className="w-full aspect-[3/4] max-w-sm mx-auto lg:mx-0 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #3B1F6B 0%, #2E1065 50%, #1C0A35 100%)',
                }}
              >
                {/* Decorative frame */}
                <div className="absolute inset-0 border-2 border-amber-500/20" />
                <div className="absolute top-4 left-4 right-4 bottom-4 border border-amber-500/10" />
                {/* Placeholder content */}
                <img
                  src="/images/pj-headshot-2.jpg"
                  alt="PJ Guastello Jr."
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                <div className="absolute inset-0 hidden flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-royal-700 border-2 border-amber-500/40 flex items-center justify-center">
                    <span className="font-serif text-3xl font-bold text-amber-400">PJ</span>
                  </div>
                  <p className="text-royal-500 text-xs">Drop pj-headshot-2.jpg into /public/images/</p>
                </div>
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-500" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-500" />
              </div>
            </motion.div>

            {/* Pillar grid */}
            <div className="grid grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="bg-royal-900/60 border border-royal-700/50 p-4 card-hover"
                >
                  <p.icon size={20} className="text-amber-400 mb-2" />
                  <h4 className="text-white text-sm font-bold mb-1">{p.title}</h4>
                  <p className="text-royal-400 text-xs leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
