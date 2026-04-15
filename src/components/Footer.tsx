import { Logo } from './Logo'

// Social icon SVGs (lucide doesn't export brand icons)
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
)
const TwitterXIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="currentColor"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1C0A35"/>
  </svg>
)

const footerLinks = {
  Campaign: ['About PJ', 'Platform', 'The Northland', 'News & Press'],
  'Get Involved': ['Volunteer', 'Donate', 'Events', 'Yard Signs'],
  Contact: ['Media Inquiries', 'General Contact', 'Report an Issue', 'Accessibility'],
}

export function Footer() {
  return (
    <footer className="bg-royal-950 border-t border-royal-800/60">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo variant="light" size="sm" />
            <p className="text-royal-400 text-sm leading-relaxed mt-5 mb-6 max-w-xs">
              PJ Guastello Jr. is running for Kansas City Mayor in 2027.
              Born in the Northland. Fighting for all of KC.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: FacebookIcon, label: 'Facebook' },
                { icon: TwitterXIcon, label: 'X/Twitter' },
                { icon: InstagramIcon, label: 'Instagram' },
                { icon: YoutubeIcon, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 border border-royal-700/60 flex items-center justify-center text-royal-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-royal-400 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-royal-800/60">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-royal-500">
          <p>© 2027 PJ Guastello Jr. for Kansas City. All Rights Reserved.</p>
          <p>Paid for by PJ Guastello Jr. for Kansas City · North Kansas City, MO 64116</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-royal-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-royal-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-royal-300 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
