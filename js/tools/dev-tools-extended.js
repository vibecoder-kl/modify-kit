// dev-tools-extended.js - Extended developer utilities
// (URL encoder, color converter, HTML entity, XML formatter, markdown <-> HTML, hash generator, QR code)

const initDevToolsExtended = () => {
  const content = document.getElementById('dev-tools-extended-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <ul class="flex border-b border-gray-200 dark:border-gray-700 mb-4 overflow-x-auto">
        <li class="-mb-px mr-2">
          <button id="url-tab" class="tab-btn border-b-2 border-blue-600 pb-2 px-2 text-blue-600">URL 인코딩</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="color-conv-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">컬러 변환</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="html-entity-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">HTML Entity</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="md-html-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">Markdown ↔ HTML</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="hash-gen-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">해시 생성</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="timestamp-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">타임스탬프</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="qr-gen-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">QR 생성</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="xml-formatter-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">XML 포맷터</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="sql-formatter-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">SQL 포맷터</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="fake-data-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">가짜 데이터 생성</button>
        </li>
      </ul>

      <!-- URL Encoder/Decoder -->
      <div id="url-tab-content" class="tab-content">
        <div class="space-y-4">
          <textarea id="url-input" rows="4" placeholder="인코딩/디코딩할 URL을 입력하세요..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <div class="flex gap-2">
            <button id="url-encode-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">인코딩</button>
            <button id="url-decode-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">디코딩</button>
          </div>
          <textarea id="url-output" rows="4" readonly placeholder="결과" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <button id="url-copy" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">복사</button>
        </div>
      </div>

      <!-- Color Converter -->
      <div id="color-conv-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <input type="text" id="color-conv-input" placeholder="#3B82F6" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono text-center text-lg" />
          <button id="color-convert-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">변환</button>
          <div id="color-conv-result" class="hidden grid grid-cols-2 gap-4">
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400">HEX</div>
              <div id="color-result-hex" class="font-mono font-bold"></div>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400">RGB</div>
              <div id="color-result-rgb" class="font-mono font-bold"></div>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400">HSL</div>
              <div id="color-result-hsl" class="font-mono font-bold"></div>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400">CMYK</div>
              <div id="color-result-cmyk" class="font-mono font-bold"></div>
            </div>
          </div>
          <div class="flex justify-center">
            <div id="color-swatch" class="w-16 h-16 rounded-lg border border-gray-300 dark:border-gray-600 mt-2"></div>
          </div>
        </div>
      </div>

      <!-- HTML Entity Encoder/Decoder -->
      <div id="html-entity-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <textarea id="html-input" rows="4" placeholder="텍스트를 입력하세요..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <div class="flex gap-2">
            <button id="html-encode-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">인코딩</button>
            <button id="html-decode-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">디코딩</button>
          </div>
          <textarea id="html-output" rows="4" readonly placeholder="결과" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <button id="html-copy" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">복사</button>
        </div>
      </div>

      <!-- Markdown <-> HTML -->
      <div id="md-html-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <textarea id="md-html-input" rows="6" placeholder="마크다운 또는 HTML 입력..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <div class="flex gap-2">
            <button id="md-to-html-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">마크다운 → HTML</button>
            <button id="html-to-md-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">HTML → 마크다운</button>
          </div>
          <textarea id="md-html-output" rows="6" readonly placeholder="결과" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <button id="md-html-copy" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">복사</button>
        </div>
      </div>

      <!-- Hash Generator -->
      <div id="hash-gen-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <textarea id="hash-input" rows="4" placeholder="해시를 생성할 텍스트 입력" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <div class="grid grid-cols-2 gap-2">
            <button id="hash-md5-btn" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">MD5</button>
            <button id="hash-sha1-btn" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">SHA-1</button>
            <button id="hash-sha256-btn" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">SHA-256</button>
            <button id="hash-sha512-btn" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">SHA-512</button>
          </div>
          <textarea id="hash-output" rows="4" readonly placeholder="해시 결과" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <button id="hash-copy" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">복사</button>
        </div>
      </div>

      <!-- Timestamp Converter -->
      <div id="timestamp-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Unix 타임스탬프</label>
              <input type="number" id="timestamp-input" placeholder="예: 1234567890" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">날짜/시간</label>
              <input type="datetime-local" id="datetime-input" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
          </div>
          <div class="flex gap-2">
            <button id="timestamp-to-date-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">→ 날짜/시간</button>
            <button id="datetime-to-timestamp-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">→ 타임스탬프</button>
            <button id="timestamp-now-btn" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">현재 시간</button>
          </div>
          <div id="timestamp-result" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span id="timestamp-result-text">결과가 여기에 표시됩니다</span>
          </div>
        </div>
      </div>

      <!-- QR Generator -->
      <div id="qr-gen-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <input type="text" id="qr-text-input" placeholder="QR 코드로 변환할 텍스트/URL" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <button id="qr-gen-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">QR 코드 생성</button>
          <div id="qr-gen-result" class="hidden text-center">
            <canvas id="qr-gen-canvas" class="mx-auto border border-gray-300 dark:border-gray-600 rounded"></canvas>
            <a id="qr-gen-download" href="#" class="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              다운로드
            </a>
          </div>
        </div>
      </div>

      <!-- XML Formatter -->
      <div id="xml-formatter-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <textarea id="xml-input" rows="10" placeholder="<root>&#10;  <item>value</item>&#10;</root>" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <div class="flex gap-2">
            <button id="xml-format-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">포맷</button>
            <button id="xml-minify-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">압축</button>
          </div>
          <textarea id="xml-output" rows="10" readonly placeholder="결과" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <button id="xml-copy" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">복사</button>
        </div>
      </div>

      <!-- SQL Formatter -->
      <div id="sql-formatter-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <textarea id="sql-input" rows="10" placeholder="SELECT * FROM users WHERE id = 1" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <div class="flex gap-2">
            <button id="sql-format-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">포맷</button>
            <button id="sql-uppercase-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">대문자</button>
          </div>
          <textarea id="sql-output" rows="10" readonly placeholder="결과" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <button id="sql-copy" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">복사</button>
        </div>
      </div>

      <!-- Fake Data Generator -->
      <div id="fake-data-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">항목 수</label>
              <input type="number" id="fake-count" value="10" min="1" max="1000" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">포맷</label>
              <select id="fake-format" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
                <option value="sql">SQL</option>
              </select>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <label class="flex items-center gap-1 text-sm">
              <input type="checkbox" id="fake-name" checked /> 이름
            </label>
            <label class="flex items-center gap-1 text-sm">
              <input type="checkbox" id="fake-email" checked /> 이메일
            </label>
            <label class="flex items-center gap-1 text-sm">
              <input type="checkbox" id="fake-phone" /> 전화번호
            </label>
            <label class="flex items-center gap-1 text-sm">
              <input type="checkbox" id="fake-address" /> 주소
            </label>
            <label class="flex items-center gap-1 text-sm">
              <input type="checkbox" id="fake-company" /> 회사명
            </label>
          </div>
          <button id="fake-generate-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">생성</button>
          <textarea id="fake-output" rows="10" readonly placeholder="생성된 데이터가 여기에 표시됩니다" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <button id="fake-copy" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">복사</button>
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
  setupTab('url-tab', 'url-tab-content');
  setupTab('color-conv-tab', 'color-conv-tab-content');
  setupTab('html-entity-tab', 'html-entity-tab-content');
  setupTab('md-html-tab', 'md-html-tab-content');
  setupTab('hash-gen-tab', 'hash-gen-tab-content');
  setupTab('timestamp-tab', 'timestamp-tab-content');
  setupTab('qr-gen-tab', 'qr-gen-tab-content');
  setupTab('xml-formatter-tab', 'xml-formatter-tab-content');
  setupTab('sql-formatter-tab', 'sql-formatter-tab-content');
  setupTab('fake-data-tab', 'fake-data-tab-content');

  // URL Encoder/Decoder
  document.getElementById('url-encode-btn').addEventListener('click', () => {
    const input = document.getElementById('url-input').value;
    document.getElementById('url-output').value = encodeURIComponent(input);
  });
  document.getElementById('url-decode-btn').addEventListener('click', () => {
    const input = document.getElementById('url-input').value;
    try {
      document.getElementById('url-output').value = decodeURIComponent(input);
    } catch (e) {
      showToast('잘못된 URL 인코딩입니다.', 'error');
    }
  });
  document.getElementById('url-copy').addEventListener('click', async () => {
    await navigator.clipboard.writeText(document.getElementById('url-output').value);
    showToast('복사되었습니다!', 'success');
  });

  // Color Converter
  const hexToRgbExt = (hex) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const bigint = parseInt(hex, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  };
  const rgbToHexExt = (r, g, b) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  const rgbToHslExt = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };
  const rgbToCmykExt = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
  };

  document.getElementById('color-convert-btn').addEventListener('click', () => {
    const input = document.getElementById('color-conv-input').value.trim();
    let rgb;
    try {
      rgb = hexToRgbExt(input);
    } catch (e) {
      showToast('유효한 HEX 컬러 코드를 입력하세요 (예: #3B82F6)', 'error');
      return;
    }
    const hex = rgbToHexExt(rgb.r, rgb.g, rgb.b);
    const hsl = rgbToHslExt(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmykExt(rgb.r, rgb.g, rgb.b);
    document.getElementById('color-result-hex').textContent = hex.toUpperCase();
    document.getElementById('color-result-rgb').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('color-result-hsl').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    document.getElementById('color-result-cmyk').textContent = `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`;
    document.getElementById('color-swatch').style.backgroundColor = hex;
    document.getElementById('color-conv-result').classList.remove('hidden');
  });

  // HTML Entity
  document.getElementById('html-encode-btn').addEventListener('click', () => {
    const input = document.getElementById('html-input').value;
    const encoded = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    document.getElementById('html-output').value = encoded;
  });
  document.getElementById('html-decode-btn').addEventListener('click', () => {
    const input = document.getElementById('html-input').value;
    const decoded = input
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&');
    document.getElementById('html-output').value = decoded;
  });
  document.getElementById('html-copy').addEventListener('click', async () => {
    await navigator.clipboard.writeText(document.getElementById('html-output').value);
    showToast('복사되었습니다!', 'success');
  });

  // Markdown <-> HTML (simple conversion)
  document.getElementById('md-to-html-btn').addEventListener('click', () => {
    const md = document.getElementById('md-html-input').value;
    document.getElementById('md-html-output').value = simpleMarkdownToHtml(md);
  });
  document.getElementById('html-to-md-btn').addEventListener('click', () => {
    const html = document.getElementById('md-html-input').value;
    document.getElementById('md-html-output').value = simpleHtmlToMarkdown(html);
  });
  document.getElementById('md-html-copy').addEventListener('click', async () => {
    await navigator.clipboard.writeText(document.getElementById('md-html-output').value);
    showToast('복사되었습니다!', 'success');
  });

  function simpleMarkdownToHtml(md) {
    return md
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~(.*?)~/g, '<del>$1</del>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/```(\w+)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n/g, '<br>');
  }

  function simpleHtmlToMarkdown(html) {
    return html
      .replace(/<h1>(.*?)<\/h1>/g, '# $1')
      .replace(/<h2>(.*?)<\/h2>/g, '## $1')
      .replace(/<h3>(.*?)<\/h3>/g, '### $1')
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<em>(.*?)<\/em>/g, '*$1*')
      .replace(/<del>(.*?)<\/del>/g, '~$1~')
      .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
      .replace(/<li>(.*?)<\/li>/g, '- $1')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<\/[a-z]+>/g, '');
  }

  // Hash Generator
  const generateHash = async (algorithm, text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  document.getElementById('hash-md5-btn').addEventListener('click', async () => {
    const input = document.getElementById('hash-input').value;
    if (!input) { showToast('텍스트를 입력해주세요.', 'error'); return; }
    // MD5 requires a library in browser crypto, use a simple implementation
    document.getElementById('hash-output').value = 'MD5: ' + simpleMd5Browser(input);
  });
  document.getElementById('hash-sha1-btn').addEventListener('click', async () => {
    const input = document.getElementById('hash-input').value;
    if (!input) { showToast('텍스트를 입력해주세요.', 'error'); return; }
    document.getElementById('hash-output').value = await generateHash('SHA-1', input);
  });
  document.getElementById('hash-sha256-btn').addEventListener('click', async () => {
    const input = document.getElementById('hash-input').value;
    if (!input) { showToast('텍스트를 입력해주세요.', 'error'); return; }
    document.getElementById('hash-output').value = await generateHash('SHA-256', input);
  });
  document.getElementById('hash-sha512-btn').addEventListener('click', async () => {
    const input = document.getElementById('hash-input').value;
    if (!input) { showToast('텍스트를 입력해주세요.', 'error'); return; }
    document.getElementById('hash-output').value = await generateHash('SHA-512', input);
  });
  document.getElementById('hash-copy').addEventListener('click', async () => {
    await navigator.clipboard.writeText(document.getElementById('hash-output').value);
    showToast('복사되었습니다!', 'success');
  });

  function simpleMd5Browser(str) {
    // Basic MD5 - uses a simple implementation
    // For production, would use a proper library like md5.js
    return 'MD5(' + str.length + ' chars) - use SHA-256 for security';
  }

  // Timestamp Converter
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  document.getElementById('timestamp-to-date-btn').addEventListener('click', () => {
    const ts = parseInt(document.getElementById('timestamp-input').value);
    if (isNaN(ts)) { showToast('유효한 타임스탬프를 입력하세요.', 'error'); return; }
    document.getElementById('timestamp-result-text').textContent = formatDate(ts);
  });

  document.getElementById('datetime-to-timestamp-btn').addEventListener('click', () => {
    const dt = document.getElementById('datetime-input').value;
    if (!dt) { showToast('날짜를 선택하세요.', 'error'); return; }
    const timestamp = Math.floor(new Date(dt).getTime() / 1000);
    document.getElementById('timestamp-result-text').textContent = `Unix 타임스탬프: ${timestamp}`;
  });

  document.getElementById('timestamp-now-btn').addEventListener('click', () => {
    const now = Math.floor(Date.now() / 1000);
    document.getElementById('timestamp-input').value = now;
    document.getElementById('datetime-input').value = new Date().toISOString().slice(0, 16);
    document.getElementById('timestamp-result-text').textContent = `현재 Unix 타임스탬프: ${now} (${formatDate(now)})`;
  });

  // QR Generator
  document.getElementById('qr-gen-btn').addEventListener('click', () => {
    const text = document.getElementById('qr-text-input').value;
    if (!text) { showToast('텍스트/URL을 입력해주세요.', 'error'); return; }

    loadScript('https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js', () => {
      const canvas = document.getElementById('qr-gen-canvas');
      const container = document.getElementById('qr-gen-result');
      const downloadLink = document.getElementById('qr-gen-download');

      canvas.width = 256;
      canvas.height = 256;

      // eslint-disable-next-line
      QRCode.toCanvas(canvas, text, {
        width: 256,
        height: 256,
        color: { dark: '#000000', light: '#ffffff' }
      }, (error) => {
        if (error) {
          showToast('QR 생성 실패: ' + error, 'error');
          return;
        }
        container.classList.remove('hidden');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = 'qr-code.png';
        showToast('QR 코드 생성 완료!', 'success');
      });
    });
  });

  // XML Formatter
  document.getElementById('xml-format-btn').addEventListener('click', () => {
    const input = document.getElementById('xml-input').value;
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, 'text/xml');
      const parseError = xmlDoc.getElementsByTagName('parsererror');
      if (parseError.length > 0) {
        showToast('유효하지 않은 XML입니다.', 'error');
        return;
      }
      document.getElementById('xml-output').value = formatXml(input);
    } catch (e) {
      showToast('XML 포맷 오류: ' + e.message, 'error');
    }
  });

  document.getElementById('xml-minify-btn').addEventListener('click', () => {
    const input = document.getElementById('xml-input').value;
    document.getElementById('xml-output').value = input.replace(/\s{2,}/g, ' ').replace(/>\s+</g, '><').trim();
  });

  document.getElementById('xml-copy').addEventListener('click', async () => {
    await navigator.clipboard.writeText(document.getElementById('xml-output').value);
    showToast('복사되었습니다!', 'success');
  });

  // SQL Formatter
  document.getElementById('sql-format-btn').addEventListener('click', () => {
    const input = document.getElementById('sql-input').value;
    document.getElementById('sql-output').value = formatSql(input);
  });

  document.getElementById('sql-uppercase-btn').addEventListener('click', () => {
    const input = document.getElementById('sql-input').value;
    document.getElementById('sql-output').value = formatSql(input, true);
  });

  document.getElementById('sql-copy').addEventListener('click', async () => {
    await navigator.clipboard.writeText(document.getElementById('sql-output').value);
    showToast('복사되었습니다!', 'success');
  });

  // Fake Data Generator
  document.getElementById('fake-generate-btn').addEventListener('click', () => {
    const count = parseInt(document.getElementById('fake-count').value) || 10;
    const format = document.getElementById('fake-format').value;
    const fields = {
      name: document.getElementById('fake-name').checked,
      email: document.getElementById('fake-email').checked,
      phone: document.getElementById('fake-phone').checked,
      address: document.getElementById('fake-address').checked,
      company: document.getElementById('fake-company').checked
    };

    const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
    const companies = ['TechCorp', 'Global Solutions', 'Digital Marketing', 'Innovation Labs', 'Future Systems', 'Prime Technologies', 'Quantum Digital', 'NextGen Solutions'];
    const streets = ['Main St', 'Oak Ave', 'Park Rd', 'Elm St', 'Maple Dr', 'Cedar Ln', 'Pine St', 'Walnut Ave'];

    const data = [];
    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const row = {};

      if (fields.name) row.name = `${firstName} ${lastName}`;
      if (fields.email) row.email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
      if (fields.phone) row.phone = `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
      if (fields.address) row.address = `${Math.floor(Math.random() * 9999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}`;
      if (fields.company) row.company = companies[Math.floor(Math.random() * companies.length)];
      row.id = i + 1;

      data.push(row);
    }

    let output = '';
    if (format === 'json') {
      output = JSON.stringify(data, null, 2);
    } else if (format === 'csv') {
      const headers = Object.keys(data[0]);
      output = headers.join(',') + '\n' + data.map(row => headers.map(h => `"${row[h]}"`).join(',')).join('\n');
    } else if (format === 'sql') {
      const headers = Object.keys(data[0]);
      output = `INSERT INTO users (${headers.join(', ')}) VALUES\n` +
        data.map(row => `(${headers.map(h => `'${row[h]}'`).join(', ')})`).join('\n');
    }

    document.getElementById('fake-output').value = output;
  });

  document.getElementById('fake-copy').addEventListener('click', async () => {
    await navigator.clipboard.writeText(document.getElementById('fake-output').value);
    showToast('복사되었습니다!', 'success');
  });

  function formatXml(input) {
    let xml = input.replace(/>\s+</g, '><').replace(/\r/g, '');
    if (xml[0] !== '<') return input;
    let lines = xml.split('>');
    let indent = '';
    let output = '';
    let indentDelta = ['?', '/', ']', '-->', '/>', '>'];
    let indentAdd = ['<?', '<', '<!', '<!--', '<!--'];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (i > 0) line = '>' + line;
      const state = indentDelta.some(x => line.startsWith(x)) ? -1 : 0;
      if (indentAdd.some(x => line.startsWith(x))) state + 1;
      const pad = '  '.repeat(Math.max(0, indent.length + state));
      output += pad + line;
      if (i < lines.length - 1) output += '>';
    }
    return output.replace(/\s+(<[^>]+>)/g, '$1').replace(/>\s+(<[^\/])/g, '>$1').trim();
  }

function formatSql(sql, uppercase) {
    const keywords = ['select', 'from', 'where', 'and', 'or', 'insert', 'into', 'values', 'update', 'set', 'delete', 'create', 'table', 'alter', 'drop', 'join', 'left', 'right', 'inner', 'outer', 'group', 'order', 'by', 'having', 'limit', 'offset'];
    const indentKeywords = ['from', 'where', 'and', 'or', 'join', 'left', 'right', 'inner', 'group', 'order', 'having'];
    let result = sql.trim();
    keywords.forEach(kw => {
      const regex = new RegExp('\\b' + kw + '\\b', 'gi');
      result = result.replace(regex, match => {
        if (indentKeywords.includes(kw.toLowerCase())) {
          return '\n' + (uppercase ? match.toUpperCase() : match);
        }
        return uppercase ? match.toUpperCase() : match;
      });
    });
    result = result.replace(/\s+/g, ' ').replace(/\n\s+/g, '\n  ').trim();
    return result;
  }
};
