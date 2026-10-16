import { Reveal } from '../pages/HomePage.jsx'
import { profile } from '../data/portfolio.js'

export default function AboutSection() {
  return (
    <section id="tentang" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Label */}
            <div className="md:col-span-4">
              <span className="type-label text-electric-500">Tentang</span>
              <h2 className="type-heading text-ink-100 dark:text-ink-100 mt-2">
                Siapa saya
              </h2>
            </div>

            {/* Content */}
            <div className="md:col-span-8 space-y-6">
              <p className="type-body text-ink-300 dark:text-ink-300 leading-relaxed">
                {profile.bio}
              </p>

              <p className="type-body text-ink-400 dark:text-ink-400 leading-relaxed">
                Saya fokus pada membangun produk digital yang cepat, dapat diandalkan,
                dan memberikan nilai nyata bagi pengguna. Setiap proyek yang saya kerjakan
                dimulai dari pemahaman masalah, bukan dari tren teknologi.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['React', 'TypeScript', 'Node.js', 'Python', 'Open Source'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-ink-800 dark:bg-ink-800 text-ink-300 dark:text-ink-300 border border-ink-700/50 dark:border-ink-700/50"
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
