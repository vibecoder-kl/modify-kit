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

// Wrap showTool to include hash update (without redeclaring the const)
if (typeof showTool === 'function') {
  const _originalShowTool = showTool;
  window.showTool = (toolName) => {
    updateHash(toolName);
    _originalShowTool(toolName);
  };
} else {
  // Fallback: define showTool if it doesn't exist yet
  window.showTool = (toolName) => {
    updateHash(toolName);
    const config = TOOL_CONFIG?.[toolName];
    if (!config) return;
    const viewsContainer = document.getElementById('tool-views');
    const toolsSection = document.getElementById('tools-section');
    if (viewsContainer && toolsSection) {
      toolsSection.classList.add('hidden');
      viewsContainer.innerHTML = `
        <div class="tool-container">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <button onclick="showDashboard()" class="mb-4 text-sm text-blue-600 hover:underline">← 돌아가기</button>
            <h2 class="text-2xl font-bold mb-4">${config.title}</h2>
            <div id="${config.contentId}">로드 중...</div>
          </div>
        </div>
      `;
      if (typeof loadScript === 'function') {
        loadScript(config.file, window[config.initFn]);
      }
    }
  };
}
