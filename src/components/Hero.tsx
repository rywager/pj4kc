import { motion } from 'framer-motion'
import { ArrowDown, Star } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1C0A35 0%, #2E1065 30%, #3B1F6B 60%, #1C0A35 100%)',
      }}
    >
      {/* Background video (Veo-generated KC skyline clip) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/pj-kc-skyline.mp4" type="video/mp4" />
      </video>

      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          }}
        />
      </div>

      {/* KC Skyline silhouette */}
      <div className="kc-skyline" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Party badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 border border-amber-500/40 bg-amber-500/10 backdrop-blur-sm"
        >
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-amber-300 text-xs font-bold tracking-[0.3em] uppercase">
            Purple Party · Kansas City, Missouri
          </span>
          <Star size={12} className="text-amber-400 fill-amber-400" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight mb-0"
        >
          PJ
          <br />
          <span
            className="relative inline-block"
            style={{
              background: 'linear-gradient(90deg, #F59E0B, #FCD34D, #F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            GUASTELLO JR.
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 mb-10"
        >
          <div className="gold-divider mx-auto" />
          <p className="text-xl md:text-2xl text-royal-200 font-light max-w-3xl mx-auto leading-relaxed">
            100 years of Kansas City roots.{' '}
            <span className="text-amber-400 font-semibold">A Northland voice.</span>
            <br className="hidden md:block" />
            Not right. Not left.{' '}
            <span className="text-white font-semibold">What's right for KC.</span>
          </p>
        </motion.div>

        {/* Issue pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['Affordable Housing', 'Cut The Fat', 'The Northland', 'KCPD Local Control', 'Every Neighborhood'].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 border border-royal-500/50 text-royal-200 text-xs font-medium tracking-wider uppercase bg-royal-900/30"
              >
                {tag}
              </span>
            )
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a href="#involved" className="btn-primary text-sm px-10 py-4">
            Join the Movement
          </a>
          <a href="#donate" className="btn-outline text-sm px-10 py-4">
            Donate Now
          </a>
        </motion.div>

        {/* Mayor 2027 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-10 text-royal-400 text-sm tracking-[0.2em] uppercase"
        >
          Kansas City Mayor · 2027
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-royal-400 hover:text-amber-400 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={18} className="animate-bounce" />
      </motion.a>
    </section>
  )
}
