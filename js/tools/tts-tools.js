// tts-tools.js - Text-to-Speech conversion

window.initTtsTools = () => {
  const content = document.getElementById('tts-tools-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <p class="text-sm text-blue-800 dark:text-blue-200">
          🗣️ 브라우저 내장 음성 기능을 사용하여 텍스트를 음성으로 변환합니다.
        </p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">텍스트 입력</label>
        <textarea id="tts-text" rows="6" placeholder="여기에 텍스트를 입력하세요..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 resize-y"></textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">언어</label>
          <select id="tts-lang" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
            <option value="ko-KR">한국어</option>
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="ja-JP">日本語</option>
            <option value="zh-CN">中文</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">속도</label>
          <input type="range" id="tts-speed" min="0.5" max="2" step="0.1" value="1" class="w-full" />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>느림</span><span>보통</span><span>빠름</span>
          </div>
        </div>
      </div>

      <div class="flex gap-3">
        <button id="tts-play-btn" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          ▶️ 재생
        </button>
        <button id="tts-stop-btn" class="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
          ⏹️ 중지
        </button>
      </div>

      <div id="tts-status" class="text-sm text-gray-600 dark:text-gray-400 min-h-[1.5rem]">
        준비되었습니다.
      </div>
    </div>
  `;

  const textInput = document.getElementById('tts-text');
  const langSelect = document.getElementById('tts-lang');
  const speedSlider = document.getElementById('tts-speed');
  const playBtn = document.getElementById('tts-play-btn');
  const stopBtn = document.getElementById('tts-stop-btn');
  const statusDiv = document.getElementById('tts-status');

  // Check browser support
  if (!('speechSynthesis' in window)) {
    statusDiv.textContent = '❌ 브라우저가 음성 기능을 지원하지 않습니다.';
    playBtn.disabled = true;
    stopBtn.disabled = true;
    return;
  }

  playBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (!text) {
      showToast('텍스트를 입력해주세요.', 'error');
      return;
    }

    const lang = langSelect.value;
    const speed = parseFloat(speedSlider.value);

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = speed;

    utter.onstart = () => {
      statusDiv.textContent = '▶️ 재생 중...';
      playBtn.disabled = true;
    };

    utter.onend = () => {
      statusDiv.textContent = '✅ 재생 완료';
      playBtn.disabled = false;
    };

    utter.onerror = (e) => {
      statusDiv.textContent = '❌ 오류: ' + e.error;
      playBtn.disabled = false;
      showToast('음성 변환 실패', 'error');
    };

    speechSynthesis.speak(utter);
  });

  stopBtn.addEventListener('click', () => {
    speechSynthesis.cancel();
    statusDiv.textContent = '⏹️ 중지되었습니다.';
    playBtn.disabled = false;
  });
};
