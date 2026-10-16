import { createServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'

// Stub browser APIs
const store = new Map()
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
}
globalThis.window = {
  location: { hash: '#/', pathname: '/' },
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  addEventListener() {},
  removeEventListener() {},
  scrollTo() {},
}
globalThis.document = { documentElement: { setAttribute() {}, getAttribute: () => 'dark' } }

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { default: App } = await vite.ssrLoadModule('/src/App.jsx')

// Test home route
globalThis.window.location.hash = '#/'
const html = renderToStaticMarkup(React.createElement(App))

const checks = [
  ['h1 with IKY', html.includes('IKY')],
  ['role tagline', html.includes('Developer')],
  ['hero section', html.includes('Terbuka untuk proyek baru')],
  ['about section', html.includes('tentang')],
  ['projects section', html.includes('proyek')],
  ['skills section', html.includes('keahlian')],
  ['contact section', html.includes('kontak')],
  ['footer', html.includes('hak dilindungi')],
  ['no lorem ipsum', !html.includes('lorem')],
  ['no TODO', !html.includes('TODO')],
  ['no placeholder href', !html.includes('href="#"')],
]

let allPass = true
for (const [name, pass] of checks) {
  console.log(`${pass ? 'PASS' : 'FAIL'}: ${name}`)
  if (!pass) allPass = false
}

// Test 404 route — fresh render with new hash
globalThis.window.location.hash = '#/nonexistent'
const { default: App2 } = await vite.ssrLoadModule('/src/App.jsx')
const html404 = renderToStaticMarkup(React.createElement(App2))
const has404 = html404.includes('404') && html404.includes('Halaman Tidak Ditemukan')
console.log(`${has404 ? 'PASS' : 'FAIL'}: 404 page renders`)
if (!has404) allPass = false

await vite.close()
console.log(allPass ? '\nALL TESTS PASSED' : '\nSOME TESTS FAILED')
process.exit(allPass ? 0 : 1)
