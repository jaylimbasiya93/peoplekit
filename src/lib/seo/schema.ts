import { BRAND } from '@/config/brand'
import type { CalculatorDefinition } from '@/types/calculator'
import type { BlogPostMeta } from '@/data/blog/generate-posts'

export function organizationSchema() {
  const sameAs = [BRAND.social.twitter, BRAND.social.linkedin].filter(Boolean)

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    url: BRAND.domain,
    logo: `${BRAND.domain}/logo.svg`,
    description: BRAND.description,
    sameAs: sameAs.length ? sameAs : undefined,
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: BRAND.domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BRAND.domain}/tools?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function calculatorSchema(calc: CalculatorDefinition, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calc.name,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    description: calc.longDescription,
    url,
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function articleSchema(post: BlogPostMeta, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      logo: { '@type': 'ImageObject', url: `${BRAND.domain}/logo.svg` },
    },
    mainEntityOfPage: url,
  }
}

export function injectJsonLd(data: object | object[]) {
  const graphs = Array.isArray(data) ? data : [data]
  return graphs.map((g, i) => ({
    key: `ld-${i}`,
    type: 'application/ld+json' as const,
    innerHTML: JSON.stringify(g),
  }))
}
