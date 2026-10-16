import { Reveal } from '../pages/HomePage.jsx'
import { profile } from '../data/portfolio.js'

export default function ContactSection() {
  return (
    <section id="kontak" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="max-w-2xl">
            <span className="type-label text-electric-500">Kontak</span>
            <h2 className="type-heading text-ink-100 dark:text-ink-100 mt-2 mb-4">
              Mari terhubung
            </h2>
            <p className="type-body text-ink-400 dark:text-ink-400 mb-8">
              Punya proyek yang ingin didiskusikan atau sekadar ingin menyapa?
              Jangan ragu untuk menghubungi saya melalui salah satu kanal di bawah.
            </p>

            <div className="space-y-3">
              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="card flex items-center gap-4 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-electric-500/10 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-electric-400">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-ink-100 dark:text-ink-100 group-hover:text-electric-400 transition-colors">
                    Email
                  </div>
                  <div className="text-sm text-ink-400 dark:text-ink-400">
                    {profile.email}
                  </div>
                </div>
              </a>

              {/* GitHub */}
              {profile.social.github && (
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-electric-500/10 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-electric-400">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink-100 dark:text-ink-100 group-hover:text-electric-400 transition-colors">
                      GitHub
                    </div>
                    <div className="text-sm text-ink-400 dark:text-ink-400">
                      {profile.social.github.replace('https://', '')}
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
