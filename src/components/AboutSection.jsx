import { useState, useEffect, useRef, useCallback } from 'react'
import { Reveal } from '../pages/HomePage.jsx'
import { profile } from '../data/portfolio.js'

const TEXT_SETS = [
  [
    'Saya adalah developer yang fokus pada pengembangan web, open-source, dan produk digital.',
    'Saya percaya pada kode yang bersih, desain yang jujur, dan produk yang benar-benar bekerja.',
    'Setiap proyek yang saya kerjakan dimulai dari pemahaman masalah, bukan dari tren teknologi.',
  ],
  [
    'Pengalaman membangun 50+ proyek — dari aplikasi chat, CLI tools, sampai AI assistant.',
    'Fokus pada performa, aksesibilitas, dan pengalaman pengguna yang halus.',
    'Teknologi: React, TypeScript, Node.js, Python, Docker, dan cloud deployment.',
  ],
  [
    'Membangun produk digital yang cepat, dapat diandalkan, dan memberikan nilai nyata.',
    'Dari konsep sampai deploy — setiap tahap dikerjakan dengan perhatian pada detail.',
    'Saat ini terbuka untuk kolaborasi proyek dan kesempatan baru.',
  ],
]

function useTypewriterCycle(sets, startTyping) {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [setIndex, setSetIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const currentSet = sets[setIndex]

  // Typewriter effect
  useEffect(() => {
    if (!startTyping || lineIndex >= currentSet.length) {
      if (lineIndex >= currentSet.length) {
        setIsTyping(false)
        setIsComplete(true)
      }
      return
    }

    const current = currentSet[lineIndex]

    if (charIndex < current.length) {
      const timer = setTimeout(() => {
        setCurrentLine(current.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
        setIsTyping(true)
      }, 25)
      return () => clearTimeout(timer)
    }

    // Line complete
    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, current])
      setCurrentLine('')
      setCharIndex(0)
      setLineIndex(lineIndex + 1)
    }, 300)
    return () => clearTimeout(timer)
  }, [startTyping, lineIndex, charIndex, currentSet])

  // Cycle to next set after 10 seconds
  useEffect(() => {
    if (!isComplete) return
    const timer = setTimeout(() => {
      setSetIndex((prev) => (prev + 1) % sets.length)
      setDisplayedLines([])
      setCurrentLine('')
      setLineIndex(0)
      setCharIndex(0)
      setIsTyping(false)
      setIsComplete(false)
    }, 10000)
    return () => clearTimeout(timer)
  }, [isComplete, sets.length])

  return { displayedLines, currentLine, isTyping: isTyping || isComplete }
}

export default function AboutSection() {
  const [startTyping, setStartTyping] = useState(false)
  const sectionRef = useRef(null)
  const { displayedLines, currentLine, isTyping } = useTypewriterCycle(TEXT_SETS, startTyping)

  // Start typing when section is visible
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setStartTyping(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="tentang" className="py-16 sm:py-20 px-4 sm:px-6" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Label */}
            <div className="md:col-span-4">
              <span className="type-label text-electric-500">Tentang</span>
              <h2 className="type-heading text-ink-900 dark:text-ink-100 mt-2">
                Siapa saya
              </h2>
            </div>

            {/* Content with typewriter effect */}
            <div className="md:col-span-8 space-y-4">
              {/* Terminal-style typing area */}
              <div className="rounded-xl border border-line dark:border-ink-700/50 bg-surface dark:bg-ink-900/50 p-5 font-mono text-sm leading-relaxed min-h-[160px]">
                {displayedLines.map((line, i) => (
                  <p key={i} className="text-ink-700 dark:text-ink-300 mb-2">
                    <span className="text-electric-600 dark:text-electric-500 mr-2">❯</span>
                    {line}
                  </p>
                ))}
                {isTyping && (
                  <p className="text-ink-700 dark:text-ink-300">
                    <span className="text-electric-600 dark:text-electric-500 mr-2">❯</span>
                    {currentLine}
                    <span className="inline-block w-2 h-4 bg-electric-500 ml-0.5 animate-pulse" />
                  </p>
                )}
                {!isTyping && !startTyping && (
                  <p className="text-ink-400 dark:text-ink-500">
                    <span className="text-electric-600 dark:text-electric-500 mr-2">❯</span>
                    <span className="inline-block w-2 h-4 bg-ink-400 dark:bg-ink-500 ml-0.5 animate-pulse" />
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['React', 'TypeScript', 'Node.js', 'Python', 'Open Source'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 border border-line dark:border-ink-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
