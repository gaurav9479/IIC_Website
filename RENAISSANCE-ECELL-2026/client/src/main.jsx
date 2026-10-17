import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getTeamPhotos } from './lib/server1-api.js'

// Warm the public team-photo request before the lazy Teams route is downloaded.
if (!/^\/(?:admin|volunteer)(?:\/|$)/.test(window.location.pathname)) {
  getTeamPhotos().catch(() => { })
}

const staleChunkReloadKey = 'renaissance-stale-chunk-reload-at';
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  const now = Date.now();
  const previousReload = Number(sessionStorage.getItem(staleChunkReloadKey) || 0);
  if (now - previousReload < 30_000) return;
  sessionStorage.setItem(staleChunkReloadKey, String(now));
  window.location.reload();
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
