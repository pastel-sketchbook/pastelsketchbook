import { RouterProvider } from '@tanstack/react-router'
import router from './routeTree'

export function App() {
  return <RouterProvider router={router} />
}
