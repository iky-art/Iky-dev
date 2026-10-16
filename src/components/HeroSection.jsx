import { profile } from '../data/portfolio.js'

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-700/50 dark:border-ink-700/50 bg-ink-850/50 dark:bg-ink-850/50 px-3 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="type-label text-ink-300 dark:text-ink-300">
              Terbuka untuk proyek baru
            </span>
          </div>

          {/* Heading */}
          <h1 className="type-display text-ink-100 dark:text-ink-100 mb-4">
            {profile.name}
            <span className="text-electric-500">.</span>
          </h1>

          <p className="type-heading text-ink-300 dark:text-ink-300 mb-4">
            {profile.role}
          </p>

          <p className="type-body text-ink-400 dark:text-ink-400 max-w-xl mb-8">
            {profile.bio}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a href="#/proyek" className="btn-primary">
              Lihat Proyek
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#/kontak" className="btn-secondary">
              Hubungi Saya
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
