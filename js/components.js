// components.js - Shared UI components

// Theme toggle functionality
const initThemeToggle = () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  if (toggleBtn) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
      themeIcon.textContent = '☀️';
    }
    
    toggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      themeIcon.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
};

// Show notification/toast
const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white z-50 ${
    type === 'error' ? 'bg-red-600' : 
    type === 'success' ? 'bg-green-600' : 'bg-blue-600'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

// Tool configurations
const TOOL_CONFIG = {
  'image-tools': { 
    title: '이미지 도구', 
    file: 'js/tools/image-resizer.js', 
    initFn: 'initImageResizer',
    contentId: 'image-resizer-content'
  },
  'pdf-tools': { 
    title: 'PDF 도구', 
    file: 'js/tools/pdf-tools.js', 
    initFn: 'initPdfTools',
    contentId: 'pdf-tools-content'
  },
  'text-tools': { 
    title: '텍스트 도구', 
    file: 'js/tools/text-tools.js', 
    initFn: 'initTextTools',
    contentId: 'text-tools-content'
  },
  'media-tools': { 
    title: '미디어 도구', 
    file: 'js/tools/media-tools.js', 
    initFn: 'initMediaTools',
    contentId: 'media-tools-content'
  },
  'qr-tools': { 
    title: 'QR/Barcode 도구', 
    file: 'js/tools/qr-tools.js', 
    initFn: 'initQrTools',
    contentId: 'qr-tools-content'
  },
  'dev-tools': { 
    title: '개발자 도구', 
    file: 'js/tools/dev-tools.js', 
    initFn: 'initDevTools',
    contentId: 'dev-tools-content'
  },
  'converter-tools': { 
    title: '단위 변환기', 
    file: 'js/tools/converter-tools.js', 
    initFn: 'initConverterTools',
    contentId: 'converter-tools-content'
  },
  'security-tools': { 
    title: '보안 도구', 
    file: 'js/tools/security-tools.js', 
    initFn: 'initSecurityTools',
    contentId: 'security-tools-content'
  },
  'tts-tools': { 
    title: '문자음성변환', 
    file: 'js/tools/tts-tools.js', 
    initFn: 'initTtsTools',
    contentId: 'tts-tools-content'
  },
  'calculator-tools': { 
    title: '계산기', 
    file: 'js/tools/calculator-tools.js', 
    initFn: 'initCalculatorTools',
    contentId: 'calculator-tools-content'
  },
  'timer-tools': { 
    title: '타이머/스톱워치', 
    file: 'js/tools/timer-tools.js', 
    initFn: 'initTimerTools', 
    contentId: 'timer-tools-content' 
  },
  'background-remover': {
    title: '배경 제거', 
    file: 'js/tools/background-remover.js', 
    initFn: 'initBackgroundRemover', 
    contentId: 'background-remover-content' 
  },
  'pdf-convert': {
    title: 'PDF ↔ 이미지 변환', 
    file: 'js/tools/pdf-convert.js', 
    initFn: 'initPdfConvert', 
    contentId: 'pdf-convert-content' 
  },
  'color-tools': {
    title: '컬러 도구', 
    file: 'js/tools/color-tools.js', 
    initFn: 'initColorTools', 
    contentId: 'color-tools-content' 
  },
  'text-advanced': {
    title: '텍스트 고급 도구', 
    file: 'js/tools/text-advanced.js', 
    initFn: 'initTextAdvanced', 
    contentId: 'text-advanced-content' 
  },
  'dev-tools-extended': {
    title: '개발자 도구 (확장)', 
    file: 'js/tools/dev-tools-extended.js', 
    initFn: 'initDevToolsExtended', 
    contentId: 'dev-tools-extended-content' 
  },
  'media-advanced': {
    title: '미디어 고급 도구',
    file: 'js/tools/media-advanced.js',
    initFn: 'initMediaAdvanced',
    contentId: 'media-advanced-content'
  },
  'emoji-char-tool': {
    title: '이모지/특수문자',
    files: ['landing/js/emoji-data.js', 'landing/js/emoji-char-tool.js'],
    initFn: 'initEmojiCharTool',
    contentId: 'emoji-char-content'
  }
};

// Show tool view
const showTool = (toolKey) => {
  const config = TOOL_CONFIG[toolKey];
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
    
    // Add to browser history so back button works
    if (history.pushState) {
      history.pushState({ tool: toolKey }, '', '#tool-' + toolKey);
    }
    
    // Load script(s) then call init function
    const scriptFiles = config.files || [config.file];
    loadScripts(scriptFiles, function() {
      const initFn = window[config.initFn];
      if (typeof initFn === 'function') {
        initFn();
      } else {
        console.warn('Init function not found: ' + config.initFn);
      }
    });
  }
};

// Helper to dynamically load scripts (single or array), callback when all loaded
const loadScripts = (src, callback) => {
  const files = Array.isArray(src) ? src : [src];
  let loaded = 0;
  
  const loadNext = (index) => {
    if (index >= files.length) {
      if (typeof callback === 'function') {
        callback();
      }
      return;
    }
    
    const script = document.createElement('script');
    script.src = files[index];
    script.onload = function() {
      loadNext(index + 1);
    };
    script.onerror = function() {
      console.error('Failed to load script: ' + files[index]);
      loadNext(index + 1); // Continue with next even if this one fails
    };
    document.head.appendChild(script);
  };
  
  loadNext(0);
};

// Go back to dashboard
const showDashboard = () => {
  const viewsContainer = document.getElementById('tool-views');
  const toolsSection = document.getElementById('tools-section');
  
  if (viewsContainer && toolsSection) {
    viewsContainer.innerHTML = '';
    toolsSection.classList.remove('hidden');
  }
  // Clear history state and hash
  if (history.replaceState) {
    history.replaceState({}, '', window.location.pathname);
  } else if (history.pushState) {
    window.location.hash = '';
  }
};

// Initialize components on page load
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  
  // Preserve theme across page loads
  const theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.textContent = '☀️';
  }
});

// Also initialize on script load (for dynamically loaded content)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
  initThemeToggle();
}
