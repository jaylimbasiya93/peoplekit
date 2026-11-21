import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')
const ssrEntryPath = join(rootDir, 'dist-ssr', 'entry-server.js')

async function prerender() {
  if (!existsSync(ssrEntryPath)) {
    console.error('SSR bundle not found at', ssrEntryPath)
    process.exit(1)
  }

  const { render } = await import(pathToFileURL(ssrEntryPath).href)
  const template = readFileSync(join(distDir, 'index.html'), 'utf-8')

  const routes = [
    '',
    '/hr-tools',
    '/categories',
    '/employee-tools',
    '/templates',
    '/resources',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/changelog',
    // Categories
    '/categories/salary',
    '/categories/tax',
    '/categories/pf-retirement',
    '/categories/hr',
    '/categories/leave',
    '/categories/recruitment',
    '/categories/career',
    '/categories/analytics',
    // Priority Target Calculators
    '/tools/pf-retirement/nps-calculator',
    '/tools/salary/salary-increment-calculator',
    '/tools/leave/leave-balance-calculator',
    '/tools/pf-retirement/gratuity-calculator',
    '/tools/analytics/workforce-cost-calculator',
    // Key high-volume calculators
    '/tools/salary/in-hand-salary-calculator',
    '/tools/salary/ctc-calculator',
    '/tools/salary/salary-hike-calculator',
    '/tools/tax/income-tax-calculator',
    '/tools/pf-retirement/epf-calculator',
    '/tools/pf-retirement/pf-calculator',
    '/tools/pf-retirement/ppf-calculator',
    '/tools/pf-retirement/pension-calculator',
    '/tools/hr/notice-period-calculator',
    '/tools/hr/experience-calculator',
    '/tools/hr/last-working-day-calculator',
    '/tools/leave/leave-encashment-calculator',
    '/tools/leave/working-days-calculator',
    '/tools/analytics/employee-cost-calculator',
  ]

  let count = 0
  for (const route of routes) {
    try {
      const { html, meta } = render(route || '/')

      // Build JSON-LD script tags
      const jsonLdScripts = (meta.jsonLd || [])
        .map(
          (schema) =>
            `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
        )
        .join('\n    ')

      let pageHtml = template
        // Replace html lang
        .replace(/<html lang="[^"]*"/, `<html lang="${meta.inLanguage || 'en'}"`)
        // Replace title
        .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
        // Replace description
        .replace(
          /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
          `<meta name="description" content="${meta.description}" />`
        )
        // Replace canonical link
        .replace(
          /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
          `<link rel="canonical" href="${meta.canonicalUrl}" />`
        )
        // Replace og:title
        .replace(
          /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:title" content="${meta.title}" />`
        )
        // Replace og:description
        .replace(
          /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:description" content="${meta.description}" />`
        )
        // Replace og:url
        .replace(
          /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:url" content="${meta.canonicalUrl}" />`
        )
        // Replace og:locale
        .replace(
          /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:locale" content="${meta.locale || 'en_US'}" />`
        )
        // Replace twitter:title
        .replace(
          /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
          `<meta name="twitter:title" content="${meta.title}" />`
        )
        // Replace twitter:description
        .replace(
          /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
          `<meta name="twitter:description" content="${meta.description}" />`
        )
        // Inject JSON-LD before </head>
        .replace(
          '</head>',
          `    ${jsonLdScripts}\n  </head>`
        )

      // Clean out any head elements accidentally rendered into body by SSR
      const cleanBodyHtml = html
        .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
        .replace(/<title>[\s\S]*?<\/title>/g, '')
        .replace(/<meta[^>]*>/g, '')
        .replace(/<link\s+rel="canonical"[^>]*>/g, '')

      pageHtml = pageHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${cleanBodyHtml}</div>`
      )

      // Determine output directory
      const outPath = route ? join(distDir, route.replace(/^\//, '')) : distDir
      if (!existsSync(outPath)) {
        mkdirSync(outPath, { recursive: true })
      }
      writeFileSync(join(outPath, 'index.html'), pageHtml, 'utf-8')
      count++
    } catch (err) {
      console.error(`Error prerendering route: ${route}`, err)
    }
  }

  // Cleanup temporary dist-ssr directory
  try {
    rmSync(join(rootDir, 'dist-ssr'), { recursive: true, force: true })
  } catch (e) {
    // Ignore cleanup errors
  }

  console.log(`Successfully statically pre-rendered ${count} pages into initial HTML!`)
}

prerender()
