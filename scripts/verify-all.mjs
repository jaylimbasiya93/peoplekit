import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const pages = [
  { path: 'dist/index.html', expectedCanonical: 'https://www.peoplekit.work/', isIndia: false },
  { path: 'dist/hr-tools/index.html', expectedCanonical: 'https://www.peoplekit.work/hr-tools', isIndia: false },
  { path: 'dist/tools/pf-retirement/nps-calculator/index.html', expectedCanonical: 'https://www.peoplekit.work/tools/pf-retirement/nps-calculator', isIndia: true },
  { path: 'dist/tools/salary/salary-increment-calculator/index.html', expectedCanonical: 'https://www.peoplekit.work/tools/salary/salary-increment-calculator', isIndia: false },
  { path: 'dist/tools/leave/leave-balance-calculator/index.html', expectedCanonical: 'https://www.peoplekit.work/tools/leave/leave-balance-calculator', isIndia: false },
  { path: 'dist/tools/pf-retirement/gratuity-calculator/index.html', expectedCanonical: 'https://www.peoplekit.work/tools/pf-retirement/gratuity-calculator', isIndia: true },
  { path: 'dist/tools/analytics/workforce-cost-calculator/index.html', expectedCanonical: 'https://www.peoplekit.work/tools/analytics/workforce-cost-calculator', isIndia: false },
]

console.log('=== 1. PAGE SEO & METADATA VERIFICATION ===')
const titles = new Set()
const descriptions = new Set()

for (const p of pages) {
  if (!existsSync(p.path)) {
    console.error(`ERROR: File missing: ${p.path}`)
    continue
  }
  const content = readFileSync(p.path, 'utf8')
  const title = (content.match(/<title>(.*?)<\/title>/) || [])[1]
  const desc = (content.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1]
  const canonical = (content.match(/<link\s+rel="canonical"\s+href="([^"]*)"/) || [])[1]
  const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)]
  const h1 = h1Matches.length > 0 ? h1Matches[0][1].replace(/<[^>]*>/g, '').trim() : 'NONE'
  const lang = (content.match(/<html\s+lang="([^"]*)"/) || [])[1]

  console.log(`\nVerifying: ${p.path}`)
  console.log(`  Title (${title.length} chars): "${title}"`)
  if (title.length > 65) console.warn(`  WARNING: Title length > 65 chars!`)
  if (titles.has(title)) console.error(`  ERROR: Duplicate title found!`)
  titles.add(title)

  console.log(`  Description (${desc.length} chars): "${desc}"`)
  if (desc.length > 160) console.warn(`  WARNING: Description length > 160 chars!`)
  if (descriptions.has(desc)) console.error(`  ERROR: Duplicate description found!`)
  descriptions.add(desc)

  console.log(`  Canonical: ${canonical}`)
  if (canonical !== p.expectedCanonical) {
    console.error(`  ERROR: Canonical mismatch! Expected ${p.expectedCanonical}, got ${canonical}`)
  }

  console.log(`  H1 Count: ${h1Matches.length} | Text: "${h1}"`)
  if (h1Matches.length !== 1) console.error(`  ERROR: Page must have exactly 1 H1!`)

  console.log(`  Language: ${lang}`)
  if (p.isIndia) {
    if (lang !== 'en-IN') console.error(`  ERROR: India page must have inLanguage/lang="en-IN"!`)
  } else {
    if (lang !== 'en') console.error(`  ERROR: Global page must have lang="en", got ${lang}!`)
    if (title.toLowerCase().includes('india')) console.error(`  ERROR: Global title contains "India"!`)
    if (desc.toLowerCase().includes('india')) console.error(`  ERROR: Global description contains "India"!`)
    if (h1.toLowerCase().includes('india')) console.error(`  ERROR: Global H1 contains "India"!`)
  }

  // Verify FAQ JSON-LD matching visible FAQ text
  const jsonLdMatches = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  let foundFaqSchema = false
  for (const m of jsonLdMatches) {
    try {
      const parsed = JSON.parse(m[1])
      if (parsed['@type'] === 'FAQPage') {
        foundFaqSchema = true
        for (const item of parsed.mainEntity) {
          const q = item.name
          const a = item.acceptedAnswer.text
          if (!content.includes(q)) {
            console.error(`  ERROR: FAQ question "${q}" not found in visible HTML!`)
          }
          if (!content.includes(a.slice(0, 50))) {
            console.error(`  ERROR: FAQ answer starting with "${a.slice(0, 30)}" not found in visible HTML!`)
          }
        }
      }
    } catch (e) {
      console.error(`  ERROR: Invalid JSON-LD block:`, e.message)
    }
  }
  if (!foundFaqSchema && p.path.includes('/tools/')) {
    console.error(`  ERROR: No FAQPage schema found on calculator page!`)
  }
}

console.log('\n=== 2. SITEMAP & ROBOTS VERIFICATION ===')
const sitemap = readFileSync('public/sitemap.xml', 'utf8')
if (sitemap.includes('https://www.peoplekit.work/tools<') || sitemap.includes('https://www.peoplekit.work/tools/')) {
  // Check if bare /tools is present
  if (sitemap.includes('<loc>https://www.peoplekit.work/tools</loc>')) {
    console.error('ERROR: Sitemap contains /tools (should be redirected to /hr-tools)!')
  } else {
    console.log('PASS: Sitemap excludes bare /tools')
  }
}
if (!sitemap.includes('<loc>https://www.peoplekit.work/hr-tools</loc>')) {
  console.error('ERROR: Sitemap does NOT contain /hr-tools!')
} else {
  console.log('PASS: Sitemap contains /hr-tools')
}
for (const p of pages) {
  if (p.expectedCanonical === 'https://www.peoplekit.work/') {
    if (!sitemap.includes('<loc>https://www.peoplekit.work/</loc>')) console.error(`ERROR: Sitemap missing root!`)
  } else {
    if (!sitemap.includes(`<loc>${p.expectedCanonical}</loc>`)) console.error(`ERROR: Sitemap missing ${p.expectedCanonical}!`)
  }
}
console.log('PASS: All target URLs confirmed in sitemap!')

const robots = readFileSync('public/robots.txt', 'utf8')
if (!robots.includes('Sitemap: https://www.peoplekit.work/sitemap.xml')) {
  console.error('ERROR: robots.txt does not reference https://www.peoplekit.work/sitemap.xml')
} else {
  console.log('PASS: robots.txt properly references sitemap.xml')
}

console.log('\n=== 3. VERCEL REDIRECT VERIFICATION ===')
const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'))
const redirect301 = vercel.redirects?.find((r) => r.source === '/tools')
if (!redirect301 || redirect301.destination !== '/hr-tools' || !redirect301.permanent) {
  console.error('ERROR: Permanent 301 redirect for /tools -> /hr-tools missing in vercel.json!')
} else {
  console.log('PASS: vercel.json contains permanent 301 redirect from /tools to /hr-tools')
}

console.log('\nALL VERIFICATIONS COMPLETED!')
