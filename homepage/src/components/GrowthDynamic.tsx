import { lazy, Suspense } from 'react'

const GrowthComponent = lazy(() => import('./Growth').then(m => ({ default: m.Growth })))

/**
 * Dynamically imported Growth component
 * Recharts (~80KB) is only loaded when this component renders
 * Reduces initial bundle size
 */
export function GrowthDynamic() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] bg-pastel-bg rounded-lg flex items-center justify-center">
          <p className="text-pastel-medium font-serif">Loading growth visualization...</p>
        </div>
      }
    >
      <GrowthComponent />
    </Suspense>
  )
}
