import { useState, useEffect, useRef } from 'react'

const TERMINAL_LINES = [
  { text: '$ whoami', delay: 400 },
  { text: 'iky — developer, founder, builder', delay: 600 },
  { text: '$ cat ./mission.txt', delay: 400 },
  { text: 'membangun produk digital yang berguna', delay: 500 },
  { text: '$ npm run portfolio', delay: 400 },
  { text: 'loading projects... 50 found', delay: 600 },
  { text: '$ deploy --target production', delay: 400 },
  { text: 'siap. selamat datang di portofolio saya.', delay: 500 },
]

export default function SplashScreen({ onComplete }) {
  const [lines, setLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const containerRef = useRef(null)

  // Start after a brief pause
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Typing effect
  useEffect(() => {
    if (!started || lineIndex >= TERMINAL_LINES.length) return

    const current = TERMINAL_LINES[lineIndex]

    if (charIndex === 0 && current.delay > 0) {
      // Wait before starting this line
      const timer = setTimeout(() => {
        setCharIndex(1)
        setCurrentLine(current.text[0])
      }, current.delay)
      return () => clearTimeout(timer)
    }

    if (charIndex < current.text.length) {
      const timer = setTimeout(() => {
        setCurrentLine(current.text.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 28)
      return () => clearTimeout(timer)
    }

    // Line complete — move to next
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, current.text])
      setCurrentLine('')
      setCharIndex(0)
      setLineIndex(lineIndex + 1)
    }, 200)
    return () => clearTimeout(timer)
  }, [started, lineIndex, charIndex])

  // Complete after all lines done
  useEffect(() => {
    if (lineIndex >= TERMINAL_LINES.length && started) {
      const timer = setTimeout(() => onComplete?.(), 600)
      return () => clearTimeout(timer)
    }
  }, [lineIndex, started, onComplete])

  // Skip on click
  const handleSkip = () => onComplete?.()

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950 dark:bg-ink-950 cursor-pointer"
      onClick={handleSkip}
      role="button"
      aria-label="Skip splash screen"
    >
      <div className="w-full max-w-lg mx-4">
        {/* Terminal window */}
        <div className="rounded-xl overflow-hidden border border-ink-700/50 shadow-2xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-ink-900 dark:bg-ink-900 border-b border-ink-700/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs text-ink-500 dark:text-ink-500 font-mono ml-2">
              iky@dev: ~
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-4 sm:p-5 font-mono text-sm sm:text-[13px] leading-relaxed min-h-[240px] bg-ink-950 dark:bg-ink-950">
            {lines.map((line, i) => (
              <div key={i} className="mb-1">
                {line.startsWith('$') ? (
                  <span className="text-electric-400">{line}</span>
                ) : (
                  <span className="text-ink-300 dark:text-ink-300">{line}</span>
                )}
              </div>
            ))}
            {lineIndex < TERMINAL_LINES.length && (
              <div>
                {currentLine.startsWith('$') ? (
                  <span className="text-electric-400">{currentLine}</span>
                ) : (
                  <span className="text-ink-300 dark:text-ink-300">{currentLine}</span>
                )}
                <span className="inline-block w-2 h-4 bg-electric-400 ml-0.5 animate-pulse" />
              </div>
            )}
            {lineIndex >= TERMINAL_LINES.length && (
              <div className="mt-2 text-ink-500 dark:text-ink-500">
                $ <span className="inline-block w-2 h-4 bg-ink-500 ml-0.5 animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* Skip hint */}
        <p className="text-center text-xs text-ink-600 dark:text-ink-600 mt-4">
          klik untuk melewati
        </p>
      </div>
    </div>
  )
}
