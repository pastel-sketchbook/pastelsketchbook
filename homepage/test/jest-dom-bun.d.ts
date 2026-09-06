// Type support for @testing-library/jest-dom matchers (registered at
// runtime via expect.extend in test/setup.ts).
declare module 'bun:test' {
  interface Matchers<T = unknown> {
    toBeInTheDocument(): void
    toHaveClass(...classNames: string[]): void
    toHaveAttribute(attr: string, value?: string): void
    toBeDisabled(): void
    toHaveValue(value?: string | string[] | number): void
    toBeEmptyDOMElement(): void
  }
}
