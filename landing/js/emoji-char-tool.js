// Emoji & Special Characters Tool
// Browser-only, no server processing needed

window.initEmojiCharTool = () => {
  const content = document.getElementById('emoji-char-content');
  if (!content) {
    console.error('Emoji char tool container not found');
    return;
  }

  // Inject HTML structure
  content.innerHTML = `
    <div class="space-y-4">
      <!-- Search Box -->
      <div>
        <input type="text" id="char-search" placeholder="검색..." class="w-full px-4 py-2 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500" autocomplete="off">
      </div>
      
      <!-- Category Tabs (Level 1) -->
      <div class="flex flex-wrap gap-2" id="category-tabs">
        <button onclick="switchCategory('all')" id="tab-all" class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">전체</button>
        <button onclick="switchCategory('emoji')" id="tab-emoji" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600">이모지</button>
        <button onclick="switchCategory('symbols')" id="tab-symbols" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600">특수문자</button>
        <button onclick="switchCategory('arrows')" id="tab-arrows" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600">화살표</button>
        <button onclick="switchCategory('math')" id="tab-math" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600">수학기호</button>
        <button onclick="switchCategory('currency')" id="tab-currency" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600">통화기호</button>
        <button onclick="switchCategory('fractions')" id="tab-fractions" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600">분수</button>
        <button onclick="switchCategory('greek')" id="tab-greek" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600">그리스문자</button>
      </div>
      
      <!-- Emoji Subcategory Tabs (Level 2 - shown when emoji category selected) -->
      <div class="flex flex-wrap gap-2 hidden" id="emoji-subcategory-tabs">
        <!-- Subcategory tabs will be populated dynamically -->
      </div>
      
      <!-- Character Grid -->
      <div id="char-grid" class="char-grid tab-content">
        <!-- Characters will be populated by JavaScript -->
      </div>
      
      <!-- Favorites section -->
      <div id="favorites-section" class="mt-8 hidden">
        <h3 class="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">즐겨찾기</h3>
        <div id="favorites-list" class="char-grid"></div>
      </div>
    </div>
  `;

  // Load character data
  const characterData = window.CHARACTER_DATA || {};

  // Current state
  let currentCategory = 'all';
  let currentSubcategory = null;
  let favorites = JSON.parse(localStorage.getItem('char-favorites') || '[]');

  // Emoji subcategories for hierarchical display (Level 2 keys)
  const emojiSubcategories = window.EMOJI_SUBCATEGORIES || ['smileys/emotion', 'peoples/body', 'animals/nature', 'food/drink', 'travel/places', 'activities', 'objects', 'symbols', 'flags'];
  const emojiSubcategoryLabels = {
    'smileys/emotion': '얼굴/감정',
    'peoples/body': '사람/신체',
    'animals/nature': '동물/자연',
    'food/drink': '음식/음료',
    'travel/places': '여행/장소',
    'activities': '활동',
    'objects': '사물',
    'symbols': '기타',
    'flags': '깃발'
  };

  // Recursively flatten any nested structure into a flat array of char strings/objects
  const flattenChars = (data) => {
    let result = [];
    if (Array.isArray(data)) {
      return data;
    }
    if (data && typeof data === 'object') {
      Object.values(data).forEach(sub => {
        result = result.concat(flattenChars(sub));
      });
    }
    return result;
  };

  // Check if current category has subcategories (data is an object, not array)
  const hasSubcategories = (cat) => {
    const data = characterData[cat];
    return data && typeof data === 'object' && !Array.isArray(data);
  };

  // Initialize - default to emoji category for better UX
  currentCategory = 'emoji';
  currentSubcategory = emojiSubcategories[0]; // 'smileys/emotion'
  renderCharacters();
  updateCategoryTabs();
  updateSubcategoryTabs();

  // Search functionality
  document.getElementById('char-search').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 0) {
      const filtered = filterCharacters(query);
      renderCharacterList(filtered);
    } else {
      renderCharacters();
    }
  });

  // Category switch function
  window.switchCategory = function(cat) {
    currentCategory = cat;
    currentSubcategory = null;
    // Reset subcategory when switching main category
    if (!hasSubcategories(cat)) {
      currentSubcategory = null;
    } else if (cat === 'emoji') {
      currentSubcategory = emojiSubcategories[0];
    } else {
      // For non-emoji categories with subcategories, pick first
      const data = characterData[cat];
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        currentSubcategory = Object.keys(data)[0];
      }
    }
    updateCategoryTabs();
    updateSubcategoryTabs();
    renderCharacters();
  };

  // Subcategory switch function (Level 2)
  window.switchSubcategory = function(subcat) {
    currentSubcategory = subcat;
    updateSubcategoryTabs();
    renderCharacters();
  };

  // Update subcategory tabs visibility and styles (Level 2)
  function updateSubcategoryTabs() {
    const subTabs = document.getElementById('emoji-subcategory-tabs');
    if (!subTabs) return;

    if (hasSubcategories(currentCategory)) {
      subTabs.classList.remove('hidden');

      let subcats;
      if (currentCategory === 'emoji') {
        subcats = emojiSubcategories;
      } else {
        const data = characterData[currentCategory];
        subcats = data && typeof data === 'object' && !Array.isArray(data) ? Object.keys(data) : [];
      }

      subTabs.innerHTML = subcats.map(sub => {
        const label = (currentCategory === 'emoji' ? (emojiSubcategoryLabels[sub] || sub) : sub);
        const isActive = currentSubcategory === sub;
        return `<button onclick="switchSubcategory('${sub}')" id="subtab-${sub}" class="px-3 py-1 text-sm rounded-lg font-medium ${
          isActive
            ? (currentCategory === 'emoji' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white')
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
        }">${label}</button>`;
      }).join('');
    } else {
      subTabs.classList.add('hidden');
    }
  }

  // Update category tab styles (Level 1)
  function updateCategoryTabs() {
    const tabs = ['all', 'emoji', 'symbols', 'arrows', 'math', 'currency', 'fractions', 'greek'];
    tabs.forEach(function(tab) {
      const btn = document.getElementById('tab-' + tab);
      if (btn) {
        if (tab === currentCategory) {
          btn.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
          btn.classList.add('bg-blue-600', 'text-white');
        } else {
          btn.classList.remove('bg-blue-600', 'text-white');
          btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
        }
      }
    });
  }

  // Copy character function
  window.copyChar = function(char) {
    navigator.clipboard.writeText(char).then(function() {
      // Show visual feedback
      const btn = event.target.closest('button');
      const originalText = btn.textContent;
      btn.textContent = '✓';
      btn.classList.add('copied');
      setTimeout(function() {
        btn.textContent = originalText;
        btn.classList.remove('copied');
      }, 1000);

      // Auto-add to favorites for first use
      if (!favorites.includes(char)) {
        addToFavorites(char);
      }
    }).catch(function(err) {
      console.error('Clipboard copy failed:', err);
      alert('복사 실패: ' + char);
    });
  };

  // Gather characters from current state, handling variable nesting depth
  // For emoji: 3-level nesting (emoji -> subcategory -> sub-subcategory -> array)
  //   -> automatically flattens sub-subcategories into one array
  // For symbols/arrows/etc: 1-level or 2-level nesting
  function gatherChars() {
    let chars = [];

    if (currentCategory === 'all') {
      // Combine all top-level categories, flattening any nesting
      Object.keys(characterData).forEach(cat => {
        if (cat !== 'all') {
          chars = chars.concat(flattenChars(characterData[cat]));
        }
      });
    } else {
      const data = characterData[currentCategory];
      if (!data) {
        return chars;
      }

      if (Array.isArray(data)) {
        // Level 1: category directly contains array (e.g., 'symbols', 'arrows')
        chars = data;
      } else if (typeof data === 'object' && currentSubcategory) {
        const subData = data[currentSubcategory];
        if (!subData) {
          return chars;
        }
        // Flatten recursively - handles both 2-level (array) and 3-level (object of arrays)
        chars = flattenChars(subData);
      } else if (typeof data === 'object') {
        // Category has subcategories but none selected, flatten all
        chars = flattenChars(data);
      }
    }

    return chars;
  }

  // Render characters based on current category and subcategory
  function renderCharacters() {
    const chars = gatherChars();
    renderCharacterList(chars);
  }

  // Render character list into grid
  function renderCharacterList(chars) {
    const grid = document.getElementById('char-grid');

    if (!Array.isArray(chars) || chars.length === 0) {
      grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">표시할 문자가 없습니다.</div>';
      return;
    }

    grid.innerHTML = chars.map(function(item) {
      const char = typeof item === 'string' ? item : item.char;
      const code = typeof item === 'string' ? '' : item.code;
      const name = typeof item === 'string' ? '' : item.name;

      return '<button onclick="copyChar(\'' + char + '\')" class="char-btn" title="' + (name || char) + '">' +
        '<span class="char-display">' + char + '</span>' +
        '<span class="char-code">' + code + '</span>' +
      '</button>';
    }).join('');
  }

  // Filter characters based on search query
  function filterCharacters(query) {
    let chars = gatherChars();

    // Also search across all data if in 'all' or if no results found
    if (currentCategory === 'all' || chars.length === 0) {
      chars = [];
      Object.keys(characterData).forEach(cat => {
        if (cat !== 'all') {
          chars = chars.concat(flattenChars(characterData[cat]));
        }
      });
    }

    return chars.filter(function(item) {
      const char = typeof item === 'string' ? item : item.char;
      const name = typeof item === 'string' ? '' : (item.name || '');
      const code = typeof item === 'string' ? '' : (item.code || '');
      return char.toLowerCase().includes(query) ||
             name.toLowerCase().includes(query) ||
             code.toLowerCase().includes(query);
    });
  }

  // Favorites management
  function addToFavorites(char) {
    if (favorites.length < 50) {
      favorites.unshift(char);
      localStorage.setItem('char-favorites', JSON.stringify(favorites));
      updateFavoritesDisplay();
    }
  }

  window.toggleFavorite = function(char) {
    const index = favorites.indexOf(char);
    if (index > -1) {
      favorites.splice(index, 1);
    } else if (favorites.length < 50) {
      favorites.push(char);
    }
    localStorage.setItem('char-favorites', JSON.stringify(favorites));
    updateFavoritesDisplay();
  };

  function updateFavoritesDisplay() {
    const section = document.getElementById('favorites-section');
    const list = document.getElementById('favorites-list');

    if (favorites.length === 0) {
      section.classList.add('hidden');
    } else {
      section.classList.remove('hidden');
      list.innerHTML = favorites.map(function(char) {
        return '<button onclick="copyChar(\'' + char + '\')" class="char-btn" title="' + char + '">' +
          '<span class="char-display">' + char + '</span>' +
          '<button onclick="toggleFavorite(\'' + char + '\')" class="ml-1 text-xs text-red-500">×</button>' +
        '</button>';
      }).join('');
    }
  }

  // Load favorites count display
  if (favorites.length > 0) {
    updateFavoritesDisplay();
  }
};

// Auto-init if DOM already loaded
if (typeof window.initEmojiCharTool === 'function' && document.getElementById('emoji-char-content')) {
  window.initEmojiCharTool();
}
