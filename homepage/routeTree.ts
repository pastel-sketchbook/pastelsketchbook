import { createRouter, createHashHistory } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const hashHistory = createHashHistory()

const router = createRouter({
  routeTree,
  history: hashHistory,
})

export { routeTree }
export default router
