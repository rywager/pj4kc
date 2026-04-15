import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 100, suffix: '+', label: 'Years of KC Roots' },
  { value: 3, suffix: '', label: 'Generations in Clay County' },
  { value: 0, suffix: '$', label: 'Special Interest Money', prefix: '$' },
  { value: 316, suffix: '', label: 'KC Neighborhoods We Fight For' },
]

function CountUp({ target, suffix, prefix }: { target: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const step = target / (duration / 16)
          let current = 0
          const timer = setInterval(() => {
            current = Math.min(current + step, target)
            setCount(Math.floor(current))
            if (current >= target) clearInterval(timer)
          }, 16)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {prefix === '$' ? '$' : ''}{count}{suffix}
    </span>
  )
}

export function StatsBar() {
  return (
    <section className="bg-royal-900 border-y border-royal-700/50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <span className="font-serif text-4xl md:text-5xl font-bold text-amber-400">
                <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </span>
              <span className="text-royal-300 text-sm tracking-wider uppercase font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
