import { Reveal } from '../pages/HomePage.jsx'
import { projects } from '../data/portfolio.js'

const statusLabels = {
  production: 'Production',
  development: 'Development',
  archived: 'Archived',
}

const statusColors = {
  production: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  development: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  archived: 'bg-ink-500/10 text-ink-400 border-ink-500/20',
}

export default function ProjectsSection() {
  return (
    <section id="proyek" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10">
            <span className="type-label text-electric-500">Proyek</span>
            <h2 className="type-heading text-ink-100 dark:text-ink-100 mt-2">
              Yang pernah dibangun
            </h2>
          </div>
        </Reveal>

        {projects.length === 0 ? (
          <Reveal>
            <div className="card text-center py-12">
              <p className="type-body text-ink-400 dark:text-ink-400">
                Belum ada proyek untuk ditampilkan. Tambahkan proyek pertama Anda di{' '}
                <code className="text-electric-400 bg-ink-800 dark:bg-ink-800 px-1.5 py-0.5 rounded text-sm">
                  src/data/portfolio.js
                </code>
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 100}>
                <article className="card h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display font-semibold text-lg text-ink-100 dark:text-ink-100">
                      {project.name}
                    </h3>
                    <span
                      className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColors[project.status]}`}
                    >
                      {statusLabels[project.status]}
                    </span>
                  </div>

                  <p className="type-body text-ink-400 dark:text-ink-400 mb-4 flex-1">
                    {project.deskripsi}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-ink-800 dark:bg-ink-800 text-ink-300 dark:text-ink-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-ink-700/50 dark:border-ink-700/50">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-electric-400 hover:text-electric-300 transition-colors"
                      >
                        Live Demo
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-400 hover:text-ink-100 dark:text-ink-400 dark:hover:text-ink-100 transition-colors"
                      >
                        Source Code
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
