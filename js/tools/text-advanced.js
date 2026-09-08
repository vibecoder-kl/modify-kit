// text-advanced.js - Advanced text processing tools
// (case converter, whitespace cleaner, encryption, regex tester, JSON <-> CSV)

const initTextAdvanced = () => {
  const content = document.getElementById('text-advanced-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <ul class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <li class="-mb-px mr-2">
          <button id="case-tab" class="tab-btn border-b-2 border-blue-600 pb-2 px-2 text-blue-600">대소문자 변환</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="whitespace-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">공백 정리</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="regex-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">정규식 테스트</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="jsoncsv-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">JSON ↔ CSV</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="similarity-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">텍스트 유사도</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="summary-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">텍스트 요약</button>
        </li>
      </ul>

      <!-- Case Converter -->
      <div id="case-tab-content" class="tab-content">
        <div class="space-y-4">
          <textarea id="case-input" rows="6" placeholder="텍스트를 입력하세요..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y"></textarea>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button id="case-upper" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">UPPER</button>
            <button id="case-lower" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">lower</button>
            <button id="case-title" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Title Case</button>
            <button id="case-sentence" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Sentence case</button>
            <button id="case-camel" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">camelCase</button>
            <button id="case-snake" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">snake_case</button>
            <button id="case-kebab" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">kebab-case</button>
            <button id="case-alternating" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">aLtErNaTiNg</button>
          </div>
          <textarea id="case-output" rows="6" readonly placeholder="결과가 여기에 표시됩니다" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
        </div>
      </div>

      <!-- Whitespace Cleaner -->
      <div id="whitespace-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <textarea id="whitespace-input" rows="6" placeholder="텍스트를 입력하세요..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <div class="flex flex-wrap gap-2">
            <button id="ws-trim" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">앞뒤 공백 제거</button>
            <button id="ws-extra-lines" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">빈 줄 제거</button>
            <button id="ws-multiple-spaces" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">연속 공백 정리</button>
            <button id="ws-all" class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">모두 정리</button>
          </div>
          <textarea id="whitespace-output" rows="6" readonly placeholder="결과가 여기에 표시됩니다" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
        </div>
      </div>

      <!-- Regex Tester -->
      <div id="regex-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">정규식 패턴</label>
            <input type="text" id="regex-pattern" placeholder="^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono" />
          </div>
          <div class="flex gap-2">
            <button id="regex-test-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">테스트</button>
            <label class="flex items-center gap-1 text-sm">
              <input type="checkbox" id="regex-global" /> 전역 (g)
            </label>
            <label class="flex items-center gap-1 text-sm">
              <input type="checkbox" id="regex-case" /> 대소문자 구분 없음 (i)
            </label>
            <label class="flex items-center gap-1 text-sm">
              <input type="checkbox" id="regex-multiline" /> 다중행 (m)
            </label>
          </div>
          <textarea id="regex-input" rows="4" placeholder="테스트할 텍스트를 입력하세요..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <div id="regex-output" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[60px]">
            <p class="text-sm text-gray-600 dark:text-gray-400">결과가 여기에 표시됩니다</p>
          </div>
        </div>
      </div>

      <!-- JSON <-> CSV -->
      <div id="jsoncsv-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <textarea id="jsoncsv-input" rows="6" placeholder='JSON 배열 또는 CSV 텍스트 입력' class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <div class="flex gap-2">
            <button id="json-to-csv-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">JSON → CSV</button>
            <button id="csv-to-json-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">CSV → JSON</button>
          </div>
          <textarea id="jsoncsv-output" rows="6" readonly placeholder="결과가 여기에 표시됩니다" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <button id="jsoncsv-copy" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">복사</button>
        </div>
      </div>

      <!-- Text Similarity -->
      <div id="similarity-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <textarea id="similarity-text1" rows="6" placeholder="첫 번째 텍스트를 입력하세요..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <textarea id="similarity-text2" rows="6" placeholder="두 번째 텍스트를 입력하세요..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <button id="similarity-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">유사도 계산</button>
          <div id="similarity-result" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">결과가 여기에 표시됩니다</p>
          </div>
        </div>
      </div>

      <!-- Text Summary -->
      <div id="summary-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <textarea id="summary-input" rows="8" placeholder="요약할 텍스트를 입력하세요..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
          <div class="flex items-center gap-4 mb-2">
            <label class="text-sm">요약 비율:</label>
            <input type="range" id="summary-ratio" min="10" max="50" value="30" class="flex-1" />
            <span id="summary-ratio-value" class="w-12 text-center">30%</span>
          </div>
          <button id="summary-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">텍스트 요약</button>
          <textarea id="summary-output" rows="6" readonly placeholder="요약 결과가 여기에 표시됩니다" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y font-mono"></textarea>
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
  setupTab('case-tab', 'case-tab-content');
  setupTab('whitespace-tab', 'whitespace-tab-content');
  setupTab('regex-tab', 'regex-tab-content');
  setupTab('jsoncsv-tab', 'jsoncsv-tab-content');
  setupTab('similarity-tab', 'similarity-tab-content');
  setupTab('summary-tab', 'summary-tab-content');

  // Case converter functions
  const toTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  const toSentenceCase = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const toCamelCase = (str) => str.replace(/^\w|[A-Z]|\b\w/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase());
  const toSnakeCase = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  const toKebabCase = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const toAlternatingCase = (str) => str.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');

  document.getElementById('case-upper').addEventListener('click', () => {
    const input = document.getElementById('case-input').value;
    document.getElementById('case-output').value = input.toUpperCase();
  });
  document.getElementById('case-lower').addEventListener('click', () => {
    const input = document.getElementById('case-input').value;
    document.getElementById('case-output').value = input.toLowerCase();
  });
  document.getElementById('case-title').addEventListener('click', () => {
    const input = document.getElementById('case-input').value;
    document.getElementById('case-output').value = toTitleCase(input);
  });
  document.getElementById('case-sentence').addEventListener('click', () => {
    const input = document.getElementById('case-input').value;
    document.getElementById('case-output').value = toSentenceCase(input);
  });
  document.getElementById('case-camel').addEventListener('click', () => {
    const input = document.getElementById('case-input').value;
    document.getElementById('case-output').value = toCamelCase(input);
  });
  document.getElementById('case-snake').addEventListener('click', () => {
    const input = document.getElementById('case-input').value;
    document.getElementById('case-output').value = toSnakeCase(input);
  });
  document.getElementById('case-kebab').addEventListener('click', () => {
    const input = document.getElementById('case-input').value;
    document.getElementById('case-output').value = toKebabCase(input);
  });
  document.getElementById('case-alternating').addEventListener('click', () => {
    const input = document.getElementById('case-input').value;
    document.getElementById('case-output').value = toAlternatingCase(input);
  });

  // Whitespace cleaner
  document.getElementById('ws-trim').addEventListener('click', () => {
    const input = document.getElementById('whitespace-input').value;
    document.getElementById('whitespace-output').value = input.trim();
  });
  document.getElementById('ws-extra-lines').addEventListener('click', () => {
    const input = document.getElementById('whitespace-input').value;
    document.getElementById('whitespace-output').value = input.split('\n').filter(line => line.trim() !== '').join('\n');
  });
  document.getElementById('ws-multiple-spaces').addEventListener('click', () => {
    const input = document.getElementById('whitespace-input').value;
    document.getElementById('whitespace-output').value = input.replace(/[ \t]+/g, ' ');
  });
  document.getElementById('ws-all').addEventListener('click', () => {
    const input = document.getElementById('whitespace-input').value;
    let result = input.trim();
    result = result.split('\n').filter(line => line.trim() !== '').join('\n');
    result = result.replace(/[ \t]+/g, ' ');
    result = result.replace(/^\s+|\s+$/gm, '');
    document.getElementById('whitespace-output').value = result;
  });

  // Regex tester
  document.getElementById('regex-test-btn').addEventListener('click', () => {
    const pattern = document.getElementById('regex-pattern').value;
    const input = document.getElementById('regex-input').value;
    const globalFlag = document.getElementById('regex-global').checked;
    const caseFlag = document.getElementById('regex-case').checked;
    const multilineFlag = document.getElementById('regex-multiline').checked;

    let flags = '';
    if (globalFlag) flags += 'g';
    if (caseFlag) flags += 'i';
    if (multilineFlag) flags += 'm';

    const output = document.getElementById('regex-output');

    try {
      const regex = new RegExp(pattern, flags);
      const matches = input.match(regex);
      if (matches) {
        if (globalFlag) {
          let highlighted = input;
          const allMatches = input.matchAll(regex);
          let html = input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          let offset = 0;
          for (const m of input.matchAll(new RegExp(pattern, 'g' + (caseFlag ? 'i' : '') + (multilineFlag ? 'm' : '')))) {
            html = html.substring(0, m.index + offset) +
              `<mark class="bg-yellow-300 dark:bg-yellow-900/50">${html.substring(m.index + offset, m.index + offset + m[0].length)}</mark>` +
              html.substring(m.index + offset + m[0].length);
            offset += 48; // length of mark tag
          }
          output.innerHTML = `<div class="mb-2"><strong>${matches.length}</strong>개 일치</div><pre class="whitespace-pre-wrap">${html}</pre>`;
        } else {
          output.innerHTML = `<div class="mb-2"><strong>일치함:</strong></div><pre class="whitespace-pre-wrap">${matches[0]}</pre>`;
        }
      } else {
        output.innerHTML = '<p class="text-gray-600 dark:text-gray-400">일치하는 결과가 없습니다.</p>';
      }
    } catch (e) {
      output.innerHTML = `<p class="text-red-500">정규식 오류: ${e.message}</p>`;
    }
  });

  // JSON <-> CSV converter
  document.getElementById('json-to-csv-btn').addEventListener('click', () => {
    const input = document.getElementById('jsoncsv-input').value;
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data)) {
        throw new Error('JSON 배열이어야 합니다');
      }
      const headers = Object.keys(data[0] || {});
      const csvRows = [headers.join(',')];
      for (const row of data) {
        csvRows.push(headers.map(h => csvEscape(String(row[h] || ''))).join(','));
      }
      document.getElementById('jsoncsv-output').value = csvRows.join('\n');
    } catch (e) {
      showToast('JSON 파싱 실패: ' + e.message, 'error');
    }
  });

  document.getElementById('csv-to-json-btn').addEventListener('click', () => {
    const input = document.getElementById('jsoncsv-input').value.trim();
    const lines = input.split('\n');
    if (lines.length < 2) {
      showToast('CSV 데이터가 올바르지 않습니다.', 'error');
      return;
    }
    const headers = parseCsvLine(lines[0]);
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCsvLine(lines[i]);
      const row = {};
      headers.forEach((h, j) => { row[h] = values[j] || ''; });
      result.push(row);
    }
    document.getElementById('jsoncsv-output').value = JSON.stringify(result, null, 2);
  });

  document.getElementById('jsoncsv-copy').addEventListener('click', async () => {
    const output = document.getElementById('jsoncsv-output').value;
    if (output) {
      try {
        await navigator.clipboard.writeText(output);
        showToast('복사되었습니다!', 'success');
      } catch {
        showToast('복사 실패', 'error');
      }
    }
  });

  // Text Similarity Calculator (Jaccard similarity)
  document.getElementById('similarity-btn').addEventListener('click', () => {
    const text1 = document.getElementById('similarity-text1').value.trim();
    const text2 = document.getElementById('similarity-text2').value.trim();

    if (!text1 || !text2) {
      showToast('두 텍스트를 모두 입력해주세요.', 'error');
      return;
    }

    const words1 = new Set(text1.toLowerCase().match(/\b\w+\b/g) || []);
    const words2 = new Set(text2.toLowerCase().match(/\b\w+\b/g) || []);

    let intersection = 0;
    for (const word of words1) {
      if (words2.has(word)) intersection++;
    }

    const union = words1.size + words2.size - intersection;
    const similarity = union === 0 ? 100 : Math.round((intersection / union) * 100);

    document.getElementById('similarity-result').innerHTML =
      `<div class="mb-2"><strong>${similarity}%</strong> 유사도</div>` +
      `<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">교집합 단어: ${intersection}개 | 합집합 단어: ${union}개</p>` +
      `<div class="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
        <div class="bg-blue-600 h-2 rounded-full" style="width: ${similarity}%"></div>
      </div>`;
  });

  // Text Summary (extractive summary using sentence scoring)
  document.getElementById('summary-ratio').addEventListener('input', () => {
    document.getElementById('summary-ratio-value').textContent = document.getElementById('summary-ratio').value + '%';
  });

  document.getElementById('summary-btn').addEventListener('click', () => {
    const input = document.getElementById('summary-input').value.trim();
    const ratio = parseInt(document.getElementById('summary-ratio').value) / 100;

    if (!input) {
      showToast('텍스트를 입력해주세요.', 'error');
      return;
    }

    const sentences = input.split(/[.!?。！？\n\n]+/).filter(s => s.trim().length > 0);

    if (sentences.length === 0) {
      showToast('유효한 텍스트가 없습니다.', 'error');
      return;
    }

    // Calculate word frequencies
    const wordFreq = {};
    const stopWords = new Set(['의','에','이','가','은','는','이','가','을','를','한','하','고','의','를','에','로','자','로','와','과','도','만','부터','까지','의','에','의']);

    sentences.forEach(sentence => {
      const words = sentence.toLowerCase().match(/\b\w+\b/g) || [];
      words.forEach(word => {
        if (!stopWords.has(word) && word.length > 1) {
          wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
      });
    });

    // Score sentences
    const sentenceScores = sentences.map((sentence, index) => {
      const words = sentence.toLowerCase().match(/\b\w+\b/g) || [];
      let score = 0;
      words.forEach(word => {
        score += wordFreq[word] || 0;
      });
      return { sentence, score, index };
    });

    // Sort by score and select top sentences
    sentenceScores.sort((a, b) => b.score - a.score);
    const summaryLength = Math.max(1, Math.round(sentences.length * ratio));
    const summarySentences = sentenceScores.slice(0, summaryLength)
      .sort((a, b) => a.index - b.index)
      .map(item => item.sentence.trim());

    document.getElementById('summary-output').value = summarySentences.join('. ') + '.';
  });

  function csvEscape(str) {
    return str.includes(',') || str.includes('"') || str.includes('\n') ? '"' + str.replace(/"/g, '""') + '"' : str;
  }

  function parseCsvLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }
};
