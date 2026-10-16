import { useEffect, useRef, useState } from 'react'
import HeroSection from '../components/HeroSection.jsx'
import AboutSection from '../components/AboutSection.jsx'
import ProjectsSection from '../components/ProjectsSection.jsx'
import SkillsSection from '../components/SkillsSection.jsx'
import ContactSection from '../components/ContactSection.jsx'

// Simple reveal-on-scroll hook
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, visible }
}

function Reveal({ children, className = '', delay = 0 }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function HomePage({ initialSection }) {
  // Scroll to section if initialSection provided
  useEffect(() => {
    if (initialSection) {
      const el = document.getElementById(initialSection)
      if (el) {
        // Small delay to ensure page rendered
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [initialSection])

  return (
    <>
      <HeroSection />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <ProjectsSection />
      <div className="section-divider" />
      <SkillsSection />
      <div className="section-divider" />
      <ContactSection />
    </>
  )
}

export { Reveal }
