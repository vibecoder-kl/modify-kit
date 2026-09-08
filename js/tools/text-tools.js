// text-tools.js - Text processing tools (count, format, convert)

const initTextTools = () => {
  const content = document.getElementById('text-tools-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <!-- Text Input -->
      <div>
        <label class="block text-sm font-medium mb-2">텍스트 입력</label>
        <textarea id="text-input" rows="8" placeholder="여기에 텍스트를 입력하세요..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y"></textarea>
      </div>

      <!-- Text Analysis -->
      <div id="text-analysis" class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-2xl font-bold" id="char-count">0</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">문자</div>
        </div>
        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-2xl font-bold" id="word-count">0</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">단어</div>
        </div>
        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-2xl font-bold" id="line-count">0</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">줄</div>
        </div>
        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-2xl font-bold" id="space-count">0</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">공백</div>
        </div>
      </div>

      <!-- Text Operations -->
      <div class="space-y-4">
        <h3 class="font-medium text-lg">텍스트 변환</h3>
        <div class="grid grid-cols-2 gap-4">
          <button id="upper-case-btn" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">대문자</button>
          <button id="lower-case-btn" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">소문자</button>
        </div>
      </div>

      <!-- Output -->
      <div id="text-output-section" class="hidden">
        <label class="block text-sm font-medium mb-2">결과</label>
        <textarea id="text-output" rows="8" readonly class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y"></textarea>
        <button id="copy-btn" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">복사</button>
      </div>
    </div>
  `;

  // Get elements
  const textInput = document.getElementById('text-input');
  const charCount = document.getElementById('char-count');
  const wordCount = document.getElementById('word-count');
  const lineCount = document.getElementById('line-count');
  const spaceCount = document.getElementById('space-count');
  const upperCaseBtn = document.getElementById('upper-case-btn');
  const lowerCaseBtn = document.getElementById('lower-case-btn');
  const textOutputSection = document.getElementById('text-output-section');
  const textOutput = document.getElementById('text-output');
  const copyBtn = document.getElementById('copy-btn');

  // Update counts
  const updateCounts = () => {
    const text = textInput.value;
    charCount.textContent = text.length;
    wordCount.textContent = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    lineCount.textContent = text.split('\n').length;
    spaceCount.textContent = (text.match(/ /g) || []).length;
  };

  // Event listeners
  textInput.addEventListener('input', updateCounts);

  upperCaseBtn.addEventListener('click', () => {
    const text = textInput.value;
    if (!text) {
      showToast('텍스트를 입력해주세요.', 'error');
      return;
    }
    textOutput.value = text.toUpperCase();
    textOutputSection.classList.remove('hidden');
  });

  lowerCaseBtn.addEventListener('click', () => {
    const text = textInput.value;
    if (!text) {
      showToast('텍스트를 입력해주세요.', 'error');
      return;
    }
    textOutput.value = text.toLowerCase();
    textOutputSection.classList.remove('hidden');
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textOutput.value);
      showToast('복사되었습니다!', 'success');
    } catch (err) {
      showToast('복사 실패. 직접 선택 후 복사해 주세요.', 'error');
    }
  });
};
