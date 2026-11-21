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

export function websiteSchema(inLanguage = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: BRAND.domain,
    inLanguage,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BRAND.domain}/hr-tools?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
  inLanguage = 'en'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    inLanguage,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function webApplicationSchema(options: {
  name: string
  description: string
  url: string
  inLanguage?: 'en-IN' | 'en'
  category?: string
}) {
  const {
    name,
    description,
    url,
    inLanguage = 'en',
    category = 'FinanceApplication',
  } = options

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    applicationCategory: category,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: inLanguage === 'en-IN' ? 'INR' : 'USD',
    },
    description,
    url,
    inLanguage,
  }
}

export function calculatorSchema(
  calc: CalculatorDefinition,
  url: string,
  inLanguage: 'en-IN' | 'en' = 'en'
) {
  return webApplicationSchema({
    name: calc.name,
    description: calc.longDescription || calc.shortDescription,
    url,
    inLanguage,
    category: 'FinanceApplication',
  })
}

export function faqSchema(
  faqs: { question: string; answer: string }[],
  inLanguage: 'en-IN' | 'en' = 'en'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

export function collectionPageSchema(options: {
  name: string
  description: string
  url: string
  inLanguage?: 'en-IN' | 'en'
  items: { name: string; url: string; description?: string }[]
}) {
  const { name, description, url, inLanguage = 'en', items } = options
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    inLanguage,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
        description: item.description,
      })),
    },
  }
}

export function articleSchema(post: BlogPostMeta, url: string, inLanguage = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    inLanguage,
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
