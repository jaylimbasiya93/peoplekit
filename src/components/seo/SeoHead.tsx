import { Helmet } from 'react-helmet-async'
import { BRAND } from '@/config/brand'
import { injectJsonLd } from '@/lib/seo/schema'

interface SeoHeadProps {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: object | object[]
}

export function SeoHead({
  title,
  description,
  path = '',
  image = `${BRAND.domain}/og-default.svg`,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoHeadProps) {
  const url = `${BRAND.domain}${path}`
  const fullTitle = title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`
  const robotsValue = noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large, max-snippet:-1'
  const keywordValue = 'HR tools, salary calculator, tax calculator, PF calculator, leave tracker, offer letter generator, employee payroll, Indian HR software, workforce planning'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordValue} />
      <meta name="robots" content={robotsValue} />
      <meta name="author" content={BRAND.name} />
      <meta name="theme-color" content="#4f46e5" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={BRAND.name} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={BRAND.social.twitter || '@PeopleKit'} />

      {jsonLd &&
        injectJsonLd(jsonLd).map((script) => (
          <script key={script.key} type={script.type}>
            {script.innerHTML}
          </script>
        ))}
    </Helmet>
  )
}
