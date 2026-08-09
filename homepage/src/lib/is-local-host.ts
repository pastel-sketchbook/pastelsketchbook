const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]'])

/** Code page and other local-only UI: dev server or app opened on this machine. */
export function isLocalAppHost(): boolean {
  if (import.meta.env.DEV) return true
  if (typeof window === 'undefined') return false
  return LOCAL_HOSTNAMES.has(window.location.hostname)
}
