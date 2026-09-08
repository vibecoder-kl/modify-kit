// color-tools.js - Color picker, converter, and palette extraction

const initColorTools = () => {
  const content = document.getElementById('color-tools-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <ul class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <li class="-mb-px mr-2">
          <button id="picker-tab" class="tab-btn border-b-2 border-blue-600 pb-2 px-2 text-blue-600">컬러 피커</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="convert-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">컬러 변환</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="palette-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">팔레트 추출</button>
        </li>
      </ul>

      <!-- Color Picker -->
      <div id="picker-tab-content" class="tab-content">
        <div class="space-y-4">
          <div class="flex gap-4 items-center">
            <input type="color" id="color-picker" value="#3b82f6" class="w-12 h-12 p-1 border border-gray-300 dark:border-gray-600 rounded cursor-pointer" />
            <div class="flex-1">
              <input type="text" id="color-hex" value="#3B82F6" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono text-center text-lg" />
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <div class="text-sm text-gray-600 dark:text-gray-400">HEX</div>
              <div id="hex-result" class="font-mono text-lg font-bold">#3B82F6</div>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <div class="text-sm text-gray-600 dark:text-gray-400">RGB</div>
              <div id="rgb-result" class="font-mono text-lg font-bold">rgb(59, 130, 246)</div>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <div class="text-sm text-gray-600 dark:text-gray-400">HSL</div>
              <div id="hsl-result" class="font-mono text-lg font-bold">hsl(217, 91%, 60%)</div>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <div class="text-sm text-gray-600 dark:text-gray-400">CMYK</div>
              <div id="cmyk-result" class="font-mono text-lg font-bold">0, 48, 0, 4</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Color Converter -->
      <div id="convert-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">색상 값 입력 (HEX / RGB / HSL)</label>
            <input type="text" id="color-input" placeholder="#3B82F6 또는 rgb(59,130,246) 또는 hsl(217,91%,60%)" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono" />
          </div>
          <button id="convert-color-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">변환</button>
          <div id="color-convert-result" class="hidden p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div class="grid grid-cols-2 gap-2 text-center">
              <div><span class="text-sm text-gray-600 dark:text-gray-400">HEX:</span> <span id="conv-hex" class="font-mono font-bold"></span></div>
              <div><span class="text-sm text-gray-600 dark:text-gray-400">RGB:</span> <span id="conv-rgb" class="font-mono font-bold"></span></div>
              <div><span class="text-sm text-gray-600 dark:text-gray-400">HSL:</span> <span id="conv-hsl" class="font-mono font-bold"></span></div>
              <div><span class="text-sm text-gray-600 dark:text-gray-400">CMYK:</span> <span id="conv-cmyk" class="font-mono font-bold"></span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Palette Extractor -->
      <div id="palette-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <label class="block text-sm font-medium mb-2">이미지에서 컬러 추출</label>
          <input type="file" id="palette-input" accept="image/*" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <button id="palette-extract-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">추출하기</button>
          <div id="palette-result" class="hidden">
            <div class="flex flex-wrap gap-2">
              <!-- Palette swatches will be inserted here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Tab switching
  const setupTab = (btnId, contentId) => {
    const btn = document.getElementById(btnId);
    const tabContent = document.getElementById(contentId);
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('border-blue-600', 'text-blue-600');
        b.classList.add('border-transparent');
      });
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
      btn.classList.add('border-blue-600', 'text-blue-600');
      tabContent.classList.remove('hidden');
    });
  };
  setupTab('picker-tab', 'picker-tab-content');
  setupTab('convert-tab', 'convert-tab-content');
  setupTab('palette-tab', 'palette-tab-content');

  // Color conversion utilities
  const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  };

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToCmyk = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const updateColorDisplay = (hex) => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    document.getElementById('hex-result').textContent = hex.toUpperCase();
    document.getElementById('rgb-result').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('hsl-result').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    document.getElementById('cmyk-result').textContent = `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`;
  };

  // Color picker
  const colorPicker = document.getElementById('color-picker');
  const colorHex = document.getElementById('color-hex');

  colorPicker.addEventListener('input', (e) => {
    const hex = e.target.value.toUpperCase();
    colorHex.value = hex;
    updateColorDisplay(hex);
  });

  colorHex.addEventListener('input', (e) => {
    const hex = e.target.value.toUpperCase();
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      colorPicker.value = hex;
      updateColorDisplay(hex);
    }
  });

  updateColorDisplay('#3B82F6');

  // Color converter
  document.getElementById('convert-color-btn').addEventListener('click', () => {
    const input = document.getElementById('color-input').value.trim();
    let hex;

    if (input.startsWith('#')) {
      hex = input;
    } else if (input.startsWith('rgb(') || input.startsWith('rgba(')) {
      const match = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        hex = rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
      }
    } else if (input.startsWith('hsl(')) {
      const match = input.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
      if (match) {
        const h = parseInt(match[1]);
        const s = parseInt(match[2]) / 100;
        const l = parseInt(match[3]) / 100;
        hex = hslToHex(h, s, l);
      }
    }

    if (hex && /^#[0-9A-F]{6}$/i.test(hex)) {
      const rgb = hexToRgb(hex);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
      document.getElementById('conv-hex').textContent = hex.toUpperCase();
      document.getElementById('conv-rgb').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      document.getElementById('conv-hsl').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      document.getElementById('conv-cmyk').textContent = `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`;
      document.getElementById('color-convert-result').classList.remove('hidden');
    } else {
      showToast('유효한 색상 값(예: #3B82F6, rgb(59,130,246), hsl(217,91%,60%))을 입력해주세요.', 'error');
    }
  });

  // Palette extraction from image
  document.getElementById('palette-extract-btn').addEventListener('click', () => {
    const file = document.getElementById('palette-input').files[0];
    if (!file) {
      showToast('이미지를 선택해주세요.', 'error');
      return;
    }

    showToast('컬러 추출 중...', 'info');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Simple color quantization - sample pixels
        const colorMap = new Map();
        const sampleStep = Math.max(1, Math.floor(data.length / 4 / 5000)); // Sample ~5000 pixels

        for (let i = 0; i < data.length; i += sampleStep * 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Quantize to reduce unique colors
          const key = `${Math.floor(r/16)*16},${Math.floor(g/16)*16},${Math.floor(b/16)*16}`;
          if (!colorMap.has(key)) {
            colorMap.set(key, { r, g, b, count: 1 });
          } else {
            colorMap.get(key).count++;
          }
        }

        // Get top 8 colors
        const sorted = Array.from(colorMap.values()).sort((a, b) => b.count - a.count).slice(0, 8);
        const paletteContainer = document.getElementById('palette-result');
        const paletteSwatches = paletteContainer.querySelector('div');
        paletteSwatches.innerHTML = '';

        sorted.forEach(c => {
          const hex = rgbToHex(c.r, c.g, c.b);
          const swatch = document.createElement('div');
          swatch.className = 'flex items-center gap-2';
          swatch.innerHTML = `
            <div class="w-10 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer" style="background-color: ${hex}"></div>
            <span class="font-mono text-sm">${hex.toUpperCase()}</span>
          `;
          swatch.addEventListener('click', () => {
            colorPicker.value = hex;
            colorHex.value = hex;
            updateColorDisplay(hex);
          });
          paletteSwatches.appendChild(swatch);
        });

        paletteContainer.classList.remove('hidden');
        showToast(`${sorted.length}개 컬러 추출 완료!`, 'success');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  // HSL to HEX helper
  function hslToHex(h, s, l) {
    l *= 100;
    const a = s * Math.min(l, 100 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color / 100).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }
};
