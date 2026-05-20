import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

console.log('ByteLife: Starting...');

try {
  const { default: App } = await import('./App');
  console.log('ByteLife: App loaded');
  
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Root element not found');
  }
  
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('ByteLife: Rendered');
} catch (error) {
  console.error('ByteLife: Fatal error', error);
  document.getElementById('root').innerHTML = `
    <div style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#080a0f;color:#e6edf3;padding:20px;text-align:center;font-family:sans-serif">
      <h1 style="color:#f85149">Failed to load ByteLife</h1>
      <p style="color:#7d8590;margin:20px 0">${error.message}</p>
      <pre style="background:#161b22;padding:20px;border-radius:8px;max-width:100%;overflow:auto;font-size:12px;color:#f85149">${error.stack}</pre>
    </div>
  `;
}
