import { Link } from 'react-router-dom'
import { SeoHead } from '@/components/seo/SeoHead'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <>
      <SeoHead title="Page not found" description="The page you requested does not exist." noindex />
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-6xl font-bold gradient-text">404</h1>
        <p className="mt-4 text-slate-600">This page could not be found.</p>
        <Link to="/" className="mt-8 inline-block">
          <Button>Back to home</Button>
        </Link>
      </div>
    </>
  )
}
