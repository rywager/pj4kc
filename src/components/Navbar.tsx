import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'

const navLinks = [
  { label: 'About PJ', href: '#about' },
  { label: 'Platform', href: '#platform' },
  { label: 'The Northland', href: '#northland' },
  { label: 'Get Involved', href: '#involved' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-royal-950/98 backdrop-blur-md border-b border-royal-800/60 py-3 shadow-xl shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex-shrink-0">
          <Logo variant="light" size="sm" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-royal-200 hover:text-amber-400 text-sm font-medium tracking-wider uppercase transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#involved" className="btn-outline text-xs py-2.5 px-5">
            Volunteer
          </a>
          <a href="#donate" className="btn-primary text-xs py-2.5 px-5">
            Donate
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-royal-950/98 backdrop-blur-md border-t border-royal-800/50`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-royal-200 hover:text-amber-400 text-sm font-medium tracking-wider uppercase py-2 border-b border-royal-800/30"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href="#involved" className="btn-outline text-xs py-2.5 flex-1 text-center">
              Volunteer
            </a>
            <a href="#donate" className="btn-primary text-xs py-2.5 flex-1 text-center">
              Donate
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
