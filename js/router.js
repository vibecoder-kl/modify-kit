// router.js - Client-side view routing

// Check URL hash for direct tool access
const initRouter = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#')) {
    const toolName = hash.substring(1);
    if (toolName) {
      showTool(toolName);
    }
  }
};

// Update URL hash when showing tool
const updateHash = (toolName) => {
  if (history.pushState) {
    const newHash = toolName ? `#${toolName}` : '';
    window.location.hash = newHash;
  }
};

// Listen for hash change
window.addEventListener('hashchange', () => {
  const toolName = window.location.hash.substring(1);
  if (toolName) {
    showTool(toolName);
  }
});

// Initialize router on page load
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
});

// Override showTool to include hash update
const originalShowTool = showTool;
showTool = (toolName) => {
  updateHash(toolName);
  originalShowTool(toolName);
};
