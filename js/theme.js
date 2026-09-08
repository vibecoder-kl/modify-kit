// theme.js - Theme toggle functionality shared across all pages
(function() {
  // Configure Tailwind to use class-based dark mode
  if (window.tailwind && !window.tailwind.config) {
    window.tailwind.config = {
      darkMode: 'class',
      theme: {}
    };
  }
  
  // Also set via meta config for CDN version
  const tailwindScript = document.querySelector('script[src*="tailwindcss.com"]');
  if (tailwindScript) {
    // Tailwind CDN initializes immediately, set config before it loads
    window.tailwind = window.tailwind || {};
    window.tailwind.config = {
      darkMode: 'class',
      theme: {}
    };
  }
  
  function applyTheme() {
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      if (themeIcon) themeIcon.textContent = '☀️';
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      if (themeIcon) themeIcon.textContent = '🌙';
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        if (themeIcon) themeIcon.textContent = '☀️';
      }
    }
  }
  
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
  // Apply saved theme on load
  applyTheme();
  
  // Add click listener
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
})();
