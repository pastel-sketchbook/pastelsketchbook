import React, { Component, ErrorInfo, ReactNode } from 'react'
import { SketchBox } from './SketchBox'
import { logger, MetricsLogger } from '../../lib/logger'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  name?: string
}

interface State {
  hasError: boolean
}

/**
 * General error boundary for component runtime errors
 * Distinct from ChunkErrorBoundary which handles code splitting failures
 */
export class SketchErrorBoundary extends Component<Props, State> {
  private metricsLogger = new MetricsLogger()

  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const componentName = this.props.name || 'Component'
    
    this.metricsLogger.recordErrorBoundaryActivation(componentName, error)
    
    logger.error(`Error in ${componentName}`, error, {
      componentStack: errorInfo.componentStack,
      errorBoundaryName: componentName
    })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <SketchBox className="bg-red-50 p-12 text-center my-8">
          <span className="text-4xl mb-4 block">🍂</span>
          <h3 className="text-xl font-bold text-red-800 mb-2 font-serif">
            Something didn't quite grow right.
          </h3>
          <p className="text-red-600/70 font-serif italic">
            The {this.props.name || 'section'} is currently resting.
            Please refresh or try again later.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-6 text-xs font-bold uppercase tracking-widest text-red-800 hover:underline"
            aria-label={`Retry loading ${this.props.name || 'section'}`}
          >
            Try Again
          </button>
        </SketchBox>
      )
    }

    return this.props.children
  }
}

