import { createRoot } from 'react-dom/client'
import { App } from './App'

const checkEnv = () => {
  const required: (keyof ImportMetaEnv)[] = ['VITE_API_KEY', 'VITE_API_MODEL']
  const missing: string[] = []

  required.forEach((key) => {
    if (!import.meta.env[key]) {
      missing.push(key)
    }
  })

  if (missing.length > 0) {
    console.warn(
      `Warning: Missing environment variables: ${missing.join(', ')}. ` +
        'Some features may not work correctly. ' +
        'Copy .env.example to .env.local and add your values.'
    )
  }
}

checkEnv()

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Could not find root element to mount to')
}

createRoot(rootElement).render(<App />)
