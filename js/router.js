// router.js - Client-side view routing

// Check URL hash or state for direct tool access
const initRouter = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#tool-')) {
    const toolName = hash.substring(6); // Remove '#tool-' prefix
    if (toolName && typeof showTool === 'function') {
      showTool(toolName);
    }
  }
};

// Listen for back/forward navigation (triggered by pushState/replaceState)
window.addEventListener('popstate', (event) => {
  const state = event.state;
  if (state && state.tool && typeof showTool === 'function') {
    showTool(state.tool);
  } else {
    // Going back to dashboard (no tool state)
    const viewsContainer = document.getElementById('tool-views');
    const toolsSection = document.getElementById('tools-section');
    if (viewsContainer && toolsSection) {
      viewsContainer.innerHTML = '';
      toolsSection.classList.remove('hidden');
    }
  }
});

// Listen for hash change (fallback for older browsers)
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  if (hash.startsWith('#tool-')) {
    const toolName = hash.substring(6);
    if (toolName && typeof showTool === 'function') {
      showTool(toolName);
    }
  } else if (!hash && typeof showDashboard === 'function') {
    showDashboard();
  }
});

// Initialize router on page load
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
});
