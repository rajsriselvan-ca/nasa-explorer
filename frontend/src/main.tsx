import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './error-handling/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ErrorBoundary>
     <App />
     </ErrorBoundary>
  </StrictMode>,
)
