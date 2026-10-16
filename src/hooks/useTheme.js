import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'iky-theme'

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')

    // Update theme-color meta
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', dark ? '#0a0a0f' : '#f8f7f4')
    }
  }, [dark])

  const toggle = useCallback(() => setDark((d) => !d), [])

  return { dark, toggle }
}
