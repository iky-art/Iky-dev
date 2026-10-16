import { Reveal } from '../pages/HomePage.jsx'
import { skills } from '../data/portfolio.js'

export default function SkillsSection() {
  return (
    <section id="keahlian" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10">
            <span className="type-label text-electric-500">Keahlian</span>
            <h2 className="type-heading text-ink-100 dark:text-ink-100 mt-2">
              Teknologi yang dikuasai
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 100}>
              <div className="card h-full">
                <h3 className="font-display font-semibold text-base text-ink-100 dark:text-ink-100 mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between">
                      <span className="text-sm text-ink-300 dark:text-ink-300">
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
      </div>
    </section>
  )
}
