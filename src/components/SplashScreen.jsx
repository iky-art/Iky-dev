import { useState, useEffect, useRef } from 'react'

const INSTALL_STEPS = [
  { text: 'Resolving dependencies...', duration: 800 },
  { text: 'Fetching packages...', duration: 1200 },
  { text: 'react@18.3.1', duration: 400, indent: true },
  { text: 'react-dom@18.3.1', duration: 350, indent: true },
  { text: 'vite@6.0.7', duration: 350, indent: true },
  { text: 'tailwindcss@3.4.17', duration: 350, indent: true },
  { text: 'typescript@5.7.0', duration: 350, indent: true },
  { text: 'postcss@8.5.1', duration: 300, indent: true },
  { text: 'autoprefixer@10.4.20', duration: 300, indent: true },
  { text: 'Building modules...', duration: 1000 },
  { text: 'transforming 39 modules...', duration: 800, indent: true },
  { text: 'rendering chunks...', duration: 600, indent: true },
  { text: 'computing gzip size...', duration: 500, indent: true },
  { text: 'dist/index.html                   2.56 kB │ gzip:  0.94 kB', duration: 300, indent: true, dim: true },
  { text: 'dist/assets/index.css            24.26 kB │ gzip:  4.93 kB', duration: 300, indent: true, dim: true },
  { text: 'dist/assets/index.js            179.88 kB │ gzip: 55.29 kB', duration: 300, indent: true, dim: true },
  { text: '✓ built in 9.35s', duration: 600, success: true },
  { text: 'Starting dev server...', duration: 800 },
  { text: 'Local:   http://localhost:5173/', duration: 500, highlight: true },
  { text: 'Network: http://192.168.1.x:5173/', duration: 400, highlight: true },
  { text: 'ready in 1.2s — selamat datang.', duration: 500, success: true },
]

export default function SplashScreen({ onComplete }) {
  const [lines, setLines] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [started, setStarted] = useState(false)
  const containerRef = useRef(null)

  // Start after a brief pause
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 400)
    return () => clearTimeout(timer)
  }, [])

  // Installation simulation
  useEffect(() => {
    if (!started || currentStep >= INSTALL_STEPS.length) return

    const step = INSTALL_STEPS[currentStep]

    const timer = setTimeout(() => {
      setLines((prev) => [...prev, step])
      setCurrentStep(currentStep + 1)
      setProgress(Math.round(((currentStep + 1) / INSTALL_STEPS.length) * 100))
    }, step.duration)

    return () => clearTimeout(timer)
  }, [started, currentStep])

  // Complete after all steps done
  useEffect(() => {
    if (currentStep >= INSTALL_STEPS.length && started) {
      const timer = setTimeout(() => onComplete?.(), 800)
      return () => clearTimeout(timer)
    }
  }, [currentStep, started, onComplete])

  // Skip on click
  const handleSkip = () => onComplete?.()

  const getLineClass = (step) => {
    if (step.success) return 'text-emerald-400'
    if (step.highlight) return 'text-electric-400'
    if (step.dim) return 'text-ink-500'
    if (step.indent) return 'text-ink-400'
    return 'text-ink-300'
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950 dark:bg-ink-950 cursor-pointer"
      onClick={handleSkip}
      role="button"
      aria-label="Skip splash screen"
    >
      <div className="w-full max-w-2xl mx-4">
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
              npm install — iky-dev
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-4 sm:p-5 font-mono text-[13px] leading-relaxed min-h-[320px] bg-ink-950 dark:bg-ink-950">
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-[11px] text-ink-500 mb-1.5">
                <span>Installing dependencies</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-ink-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-electric-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Output lines */}
            <div className="space-y-0.5">
              {lines.map((step, i) => (
                <div key={i} className={getLineClass(step)}>
                  {step.indent && <span className="text-ink-600 mr-2">│</span>}
                  {step.text}
                </div>
              ))}
              {currentStep < INSTALL_STEPS.length && (
                <div className="text-ink-500">
                  <span className="inline-block w-2 h-4 bg-electric-400 ml-0.5 animate-pulse" />
                </div>
              )}
            </div>
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
