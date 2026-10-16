import { Reveal } from '../pages/HomePage.jsx'
import { skills } from '../data/portfolio.js'

const FRAMEWORK_LOGOS = [
  {
    name: 'React',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#61DAFB" strokeWidth="1.5">
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: 'Vite',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#646CFF" />
        <path d="M2 17l10 5 10-5" fill="#FFD62E" />
        <path d="M2 12l10 5 10-5" fill="#646CFF" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'Tailwind',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#38BDF8">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-2 3.5-2 1.5 0 2.5.75 3.5 2s2 2 3.5 2c1.33 0 2.5-.67 3.5-2-.67-2.67-2.33-4-5-4zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-2 3.5-2 1.5 0 2.5.75 3.5 2s2 2 3.5 2c1.33 0 2.5-.67 3.5-2-.67-2.67-2.33-4-5-4z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#3178C6">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">TS</text>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#339933">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.31l6.5 3.63v7.24L12 18.81l-6.5-3.63V8.94L12 4.31z" />
        <path d="M12 7l-4 2.25v4.5L12 16l4-2.25v-4.5L12 7z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Python',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 2C8 2 7 4 7 6v2h5v1H5c-2 0-3 2-3 4s1 4 3 4h2v-2c0-2 2-3 4-3h5c2 0 3-1 3-3V6c0-2-1-4-5-4h-2z" fill="#3776AB" />
        <circle cx="9.5" cy="5" r="1" fill="white" />
        <path d="M12 22c4 0 5-2 5-4v-2h-5v-1h7c2 0 3-2 3-4s-1-4-3-4h-2v2c0 2-2 3-4 3H9c-2 0-3 1-3 3v3c0 2 1 4 5 4h1z" fill="#FFD43B" />
        <circle cx="14.5" cy="19" r="1" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#2496ED">
        <path d="M13.98 11.08h2.12a.4.4 0 00.4-.4V8.56a.4.4 0 00-.4-.4h-2.12a.4.4 0 00-.4.4v2.12c0 .22.18.4.4.4zm-3.04 0h2.12a.4.4 0 00.4-.4V8.56a.4.4 0 00-.4-.4h-2.12a.4.4 0 00-.4.4v2.12c0 .22.18.4.4.4zm-3.04 0h2.12a.4.4 0 00.4-.4V8.56a.4.4 0 00-.4-.4H7.9a.4.4 0 00-.4.4v2.12c0 .22.18.4.4.4zm-3.04 0h2.12a.4.4 0 00.4-.4V8.56a.4.4 0 00-.4-.4H4.86a.4.4 0 00-.4.4v2.12c0 .22.18.4.4.4zm6.08-3.04h2.12a.4.4 0 00.4-.4V5.52a.4.4 0 00-.4-.4h-2.12a.4.4 0 00-.4.4v2.12c0 .22.18.4.4.4zm-3.04 0h2.12a.4.4 0 00.4-.4V5.52a.4.4 0 00-.4-.4H7.9a.4.4 0 00-.4.4v2.12c0 .22.18.4.4.4zm-3.04 0h2.12a.4.4 0 00.4-.4V5.52a.4.4 0 00-.4-.4H4.86a.4.4 0 00-.4.4v2.12c0 .22.18.4.4.4zm12.16 6.08c-.5-.34-1.6-.46-2.4-.28-.13-.93-.63-1.73-1.5-2.4l-.5-.34-.34.5c-.68 1.02-.82 2.5-.34 3.52-.46.22-1.2.28-1.5.28H2.4a.4.4 0 00-.4.4c0 2.5.5 4.5 1.5 6 .9 1.34 2.5 2 4.5 2 4.5 0 8-2 10-6 .13 0 .82.06 1.16.06 1.5 0 2.5-.6 3.04-1.24l.14-.2-.2-.14z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#4169E1" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
        <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#3ECF8E">
        <path d="M13.5 2c-1.5 0-2.5 1-2.5 2.5v8.5c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5V4.5c0-1.5-1-2.5-2.5-2.5z" />
        <path d="M10.5 12c-1.5 0-2.5 1-2.5 2.5v5c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5v-5c0-1.5-1-2.5-2.5-2.5z" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'Cloudflare',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#F38020">
        <path d="M16.5 18h-9c-2.5 0-4.5-2-4.5-4.5 0-2.2 1.6-4 3.7-4.4C7.3 6.6 9.4 5 12 5c2.8 0 5.1 2 5.4 4.7.3-.1.7-.1 1.1-.1 2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5z" />
        <path d="M18.5 14.5h-13" stroke="#F38020" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.9 13.5l-4.2-7.3c-.1-.2-.3-.3-.5-.3s-.4.1-.5.3l-4.2 7.3c-.1.2-.1.5.1.6.1.1.2.1.3.1h1.5c.2 0 .4-.1.5-.3l2.3-4 2.3 4c.1.2.3.3.5.3h1.5c.2 0 .4-.1.5-.3.1-.2.1-.5-.1-.6z" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M8 2h4v7H8c-2.2 0-4-1.8-4-4s1.8-4 4-4z" fill="#F24E1E" />
        <path d="M12 2h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V2z" fill="#FF7262" />
        <path d="M8 9h4v7H8c-2.2 0-4-1.8-4-4s1.8-4 4-4z" fill="#A259FF" />
        <circle cx="16" cy="12.5" r="4" fill="#1ABCFE" />
        <path d="M8 16h4v3.5c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4z" fill="#0ACF83" />
      </svg>
    ),
  },
]

export default function SkillsSection() {
  return (
    <section id="keahlian" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10">
            <span className="type-label text-electric-500">Keahlian</span>
            <h2 className="type-heading text-ink-900 dark:text-ink-100 mt-2">
              Teknologi yang dikuasai
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 100}>
              <div className="card h-full">
                <h3 className="font-display font-semibold text-base text-ink-900 dark:text-ink-100 mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between">
                      <span className="text-sm text-ink-700 dark:text-ink-300">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-medium text-ink-500 dark:text-ink-500 uppercase tracking-wider">
                        {item.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Framework Logos */}
        <Reveal>
          <div className="mb-4">
            <span className="type-label text-ink-500 dark:text-ink-400">Framework & Tools</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {FRAMEWORK_LOGOS.map((fw) => (
              <div
                key={fw.name}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-line dark:border-ink-700/50 bg-surface dark:bg-ink-850"
              >
                {fw.svg}
                <span className="text-xs font-medium text-ink-700 dark:text-ink-300">
                  {fw.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
