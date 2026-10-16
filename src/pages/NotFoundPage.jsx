export default function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 pt-14">
      <div className="text-center max-w-md">
        <div className="font-display font-bold text-7xl sm:text-8xl text-electric-500 mb-4">
          404
        </div>
        <h1 className="type-heading text-ink-100 dark:text-ink-100 mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="type-body text-ink-400 dark:text-ink-400 mb-8">
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <a href="#/" className="btn-primary">
          Kembali ke Beranda
        </a>
      </div>
    </section>
  )
}
