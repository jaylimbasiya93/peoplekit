import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { CalculatorSkeleton } from '@/components/ui/Skeleton'

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))
const HrToolsPage = lazy(() => import('@/pages/HrToolsPage').then((m) => ({ default: m.HrToolsPage })))
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage').then((m) => ({ default: m.CategoriesPage })))
const CategoryDetailPage = lazy(() => import('@/pages/CategoryDetailPage').then((m) => ({ default: m.CategoryDetailPage })))
const ToolPage = lazy(() => import('@/features/calculators/ToolPage').then((m) => ({ default: m.ToolPage })))
const BlogPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })))
const EmployeeToolsPage = lazy(() => import('@/pages/DiscoveryPages').then((m) => ({ default: m.EmployeeToolsPage })))
const TemplatesPage = lazy(() => import('@/pages/DiscoveryPages').then((m) => ({ default: m.TemplatesPage })))
const ResourcesPage = lazy(() => import('@/pages/DiscoveryPages').then((m) => ({ default: m.ResourcesPage })))
const AboutPage = lazy(() => import('@/pages/StaticPages').then((m) => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('@/pages/StaticPages').then((m) => ({ default: m.ContactPage })))
const PrivacyPage = lazy(() => import('@/pages/StaticPages').then((m) => ({ default: m.PrivacyPage })))
const TermsPage = lazy(() => import('@/pages/StaticPages').then((m) => ({ default: m.TermsPage })))
const DisclaimerPage = lazy(() => import('@/pages/StaticPages').then((m) => ({ default: m.DisclaimerPage })))
const ChangelogPage = lazy(() => import('@/pages/StaticPages').then((m) => ({ default: m.ChangelogPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function Lazy({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-16">
          <CalculatorSkeleton />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Lazy><HomePage /></Lazy> },
      // Permanent client-side redirect from /tools to /hr-tools (paired with vercel.json 301)
      { path: 'tools', element: <Navigate to="/hr-tools" replace /> },
      { path: 'tools/:category/:slug', element: <Lazy><ToolPage /></Lazy> },
      { path: 'hr-tools', element: <Lazy><HrToolsPage /></Lazy> },
      { path: 'employee-tools', element: <Lazy><EmployeeToolsPage /></Lazy> },
      { path: 'templates', element: <Lazy><TemplatesPage /></Lazy> },
      { path: 'resources', element: <Lazy><ResourcesPage /></Lazy> },
      { path: 'categories', element: <Lazy><CategoriesPage /></Lazy> },
      { path: 'categories/:slug', element: <Lazy><CategoryDetailPage /></Lazy> },
      { path: 'blog', element: <Lazy><BlogPage /></Lazy> },
      { path: 'blog/:slug', element: <Lazy><BlogPostPage /></Lazy> },
      { path: 'about', element: <Lazy><AboutPage /></Lazy> },
      { path: 'contact', element: <Lazy><ContactPage /></Lazy> },
      { path: 'privacy', element: <Lazy><PrivacyPage /></Lazy> },
      { path: 'terms', element: <Lazy><TermsPage /></Lazy> },
      { path: 'disclaimer', element: <Lazy><DisclaimerPage /></Lazy> },
      { path: 'changelog', element: <Lazy><ChangelogPage /></Lazy> },
      { path: '*', element: <Lazy><NotFoundPage /></Lazy> },
    ],
  },
])
