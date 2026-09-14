// Apply the theme before first paint. Storage is optional.
(() => {
  let saved;
  try { saved = localStorage.getItem('polaris-site-theme'); } catch { /* Private browsing can deny storage. */ }
  document.documentElement.dataset.theme = ['light', 'dark'].includes(saved) ? saved : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
})();
