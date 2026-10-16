import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
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

// Responsive items per page
function useItemsPerPage() {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return 6
    if (window.innerWidth < 640) return 4
    if (window.innerWidth < 1024) return 6
    return 8
  })

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 640) setItems(4)
      else if (window.innerWidth < 1024) setItems(6)
      else setItems(8)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return items
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export default function ProjectsSection() {
  const itemsPerPage = useItemsPerPage()
  const reducedMotion = usePrefersReducedMotion()
  const [currentPage, setCurrentPage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState('next') // 'next' | 'prev'
  const [visibleItems, setVisibleItems] = useState([])
  const [pageKey, setPageKey] = useState(0) // For re-triggering stagger
  const [expandedId, setExpandedId] = useState(null)
  const animationRef = useRef(null)
  const sectionRef = useRef(null)

  const totalPages = Math.ceil(projects.length / itemsPerPage)

  // Get items for current page
  const currentPageItems = useMemo(() => {
    const start = currentPage * itemsPerPage
    return projects.slice(start, start + itemsPerPage)
  }, [currentPage, itemsPerPage])

  // Update visible items when page or items change
  useEffect(() => {
    setVisibleItems(currentPageItems)
    setPageKey((k) => k + 1)
  }, [currentPageItems])

  // Reset to page 0 when itemsPerPage changes
  useEffect(() => {
    setCurrentPage(0)
  }, [itemsPerPage])

  const goToPage = useCallback(
    (page, dir) => {
      if (isAnimating) return // Prevent double-click
      if (page < 0 || page >= totalPages) return

      const newDirection = dir || (page > currentPage ? 'next' : 'prev')

      if (reducedMotion) {
        // Instant navigation for reduced motion
        setCurrentPage(page)
        return
      }

      setIsAnimating(true)
      setDirection(newDirection)

      // Delay the actual page change to allow exit animation
      animationRef.current = setTimeout(() => {
        setCurrentPage(page)
        setIsAnimating(false)
      }, 300)
    },
    [isAnimating, totalPages, currentPage, reducedMotion]
  )

  const goNext = useCallback(() => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1, 'next')
    }
  }, [currentPage, totalPages, goToPage])

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      goToPage(currentPage - 1, 'prev')
    }
  }, [currentPage, goToPage])

  // Cleanup animation timeout
  useEffect(() => {
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current)
    }
  }, [])

  // Animation classes
  const getSlideClass = (index) => {
    if (reducedMotion) {
      return 'opacity-100 translate-x-0'
    }
    if (isAnimating) {
      if (direction === 'next') {
        return 'opacity-0 -translate-x-8'
      } else {
        return 'opacity-0 translate-x-8'
      }
    }
    return 'opacity-100 translate-x-0'
  }

  const getSlideStyle = (index) => {
    if (reducedMotion) {
      return {
        opacity: 1,
        transform: 'translateX(0)',
        transition: 'none',
      }
    }
    if (isAnimating) {
      return {
        opacity: 0,
        transform: direction === 'next' ? 'translateX(-32px)' : 'translateX(32px)',
        transition: 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      }
    }
    // Stagger reveal on entry
    const staggerDelay = index * 60
    return {
      opacity: 1,
      transform: 'translateX(0)',
      transition: `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms`,
    }
  }

  const startItem = currentPage * itemsPerPage + 1
  const endItem = Math.min((currentPage + 1) * itemsPerPage, projects.length)

  return (
    <section id="proyek" className="py-16 sm:py-20 px-4 sm:px-6" ref={sectionRef}>
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
          <>
            {/* Items info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-ink-400 dark:text-ink-400">
                Menampilkan{' '}
                <span className="font-medium text-ink-100 dark:text-ink-100">{startItem}-{endItem}</span>{' '}
                dari{' '}
                <span className="font-medium text-ink-100 dark:text-ink-100">{projects.length}</span>{' '}
                proyek
              </p>
            </div>

            {/* Projects grid */}
            <div
              key={pageKey}
              className="grid sm:grid-cols-2 gap-4"
              style={{ minHeight: isAnimating ? '200px' : 'auto' }}
            >
              {visibleItems.map((project, i) => (
                <article
                  key={project.id}
                  className={`card h-full flex flex-col ${getSlideClass(i)}`}
                  style={getSlideStyle(i)}
                >
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

                  <div className="mb-4 flex-1">
                    <p className={`type-body text-ink-600 dark:text-ink-400 ${expandedId === project.id ? '' : 'line-clamp-2'}`}>
                      {project.deskripsi}
                    </p>
                    {project.deskripsi.length > 80 && (
                      <button
                        onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                        className="mt-1.5 text-xs font-medium text-electric-600 dark:text-electric-400 hover:underline"
                      >
                        {expandedId === project.id ? 'Tutup' : 'Baca selengkapnya'}
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300"
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
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Page info */}
              <div className="flex items-center gap-2 text-sm text-ink-400 dark:text-ink-400">
                <span>
                  Halaman{' '}
                  <span className="font-medium text-ink-100 dark:text-ink-100">{currentPage + 1}</span>
                  {' '}dari{' '}
                  <span className="font-medium text-ink-100 dark:text-ink-100">{totalPages}</span>
                </span>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-2">
                {/* Previous button */}
                <button
                  onClick={goPrev}
                  disabled={currentPage === 0}
                  className="btn-secondary !px-4 !py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ink-800 disabled:hover:border-ink-700 dark:disabled:hover:bg-ink-800 dark:disabled:hover:border-ink-700"
                  aria-label="Halaman sebelumnya"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>

                {/* Page dots */}
                <div className="hidden sm:flex items-center gap-1.5 px-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i === currentPage
                          ? 'bg-electric-500 scale-110'
                          : 'bg-ink-600 hover:bg-ink-500 dark:bg-ink-600 dark:hover:bg-ink-500'
                      }`}
                      aria-label={`Halaman ${i + 1}`}
                      aria-current={i === currentPage ? 'page' : undefined}
                    />
                  ))}
                </div>

                {/* Next button */}
                <button
                  onClick={goNext}
                  disabled={currentPage >= totalPages - 1}
                  className="btn-secondary !px-4 !py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ink-800 disabled:hover:border-ink-700 dark:disabled:hover:bg-ink-800 dark:disabled:hover:border-ink-700"
                  aria-label="Halaman berikutnya"
                >
                  <span className="hidden sm:inline">Berikutnya</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
