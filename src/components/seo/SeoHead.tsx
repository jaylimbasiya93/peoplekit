import { Helmet } from 'react-helmet-async'
import { BRAND } from '@/config/brand'
import { injectJsonLd } from '@/lib/seo/schema'

export interface SeoHeadProps {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: object | object[]
  locale?: string
  inLanguage?: 'en' | 'en-IN'
}

export function SeoHead({
  title,
  description,
  path = '',
  image = `${BRAND.domain}/og-default.svg`,
  type = 'website',
  noindex = false,
  jsonLd,
  locale,
  inLanguage = 'en',
}: SeoHeadProps) {
  // Normalize path to ensure leading slash if not empty
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : ''
  const canonicalUrl = `${BRAND.domain}${cleanPath || '/'}`

  // Ensure title includes brand if not already present and under length limits
  const fullTitle = title.includes(BRAND.name)
    ? title
    : `${title} | ${BRAND.name}`

  // Default locale based on inLanguage unless explicitly overridden
  const ogLocale = locale || (inLanguage === 'en-IN' ? 'en_IN' : 'en_US')
  const robotsValue = noindex
    ? 'noindex,nofollow'
    : 'index,follow,max-image-preview:large,max-snippet:-1'

  return (
    <Helmet>
      <html lang={inLanguage} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsValue} />
      <meta name="author" content={BRAND.name} />
      <meta name="theme-color" content="#4f46e5" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={BRAND.name} />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={BRAND.social.twitter || '@PeopleKit'} />

      {/* JSON-LD Structured Data */}
      {jsonLd &&
        injectJsonLd(jsonLd).map((script) => (
          <script key={script.key} type={script.type}>
            {script.innerHTML}
          </script>
        ))}
    </Helmet>
  )
}
