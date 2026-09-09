// dev-tools.js - Developer utilities

window.initDevTools = () => {
  const content = document.getElementById('dev-tools-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <ul class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <li class="-mb-px mr-2"><button id="json-tab" class="tab-btn border-b-2 border-blue-600 pb-2 px-2 text-blue-600">JSON 포맷터</button></li>
        <li class="-mb-px mr-2"><button id="base64-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">Base64 변환</button></li>
        <li class="-mb-px"><button id="uuid-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">UUID 생성기</button></li>
      </ul>

      <!-- JSON Formatter -->
      <div id="json-tab-content" class="tab-content">
        <div class="space-y-4">
          <textarea id="json-input" rows="6" placeholder='{"name":"test","value":123}' class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono resize-y"></textarea>
          <div class="flex gap-2">
            <button id="json-format-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">포맷</button>
            <button id="json-minify-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">축소</button>
          </div>
          <textarea id="json-output" rows="6" readonly placeholder="결과가 여기에 표시됩니다" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono resize-y"></textarea>
        </div>
      </div>

      <!-- Base64 -->
      <div id="base64-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <textarea id="base64-input" rows="4" placeholder="텍스트 또는 Base64 입력" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono resize-y"></textarea>
          <div class="flex gap-2">
            <button id="base64-encode-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">인코딩</button>
            <button id="base64-decode-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">디코딩</button>
          </div>
          <textarea id="base64-output" rows="4" readonly class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono resize-y"></textarea>
        </div>
      </div>

      <!-- UUID Generator -->
      <div id="uuid-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <div class="flex gap-2">
            <button id="uuid-v4-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">UUID v4 생성</button>
            <button id="uuid-v7-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">UUID v7 생성</button>
          </div>
          <div class="flex gap-2">
            <input type="number" id="uuid-count" min="1" max="100" value="5" class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700" />
            <button id="uuid-batch-btn" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">일괄 생성</button>
          </div>
          <textarea id="uuid-output" rows="6" readonly class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono resize-y"></textarea>
        </div>
      </div>
    </div>
  `;

  // Tab switching
  setupTab('json-tab', 'json-tab-content');
  setupTab('base64-tab', 'base64-tab-content');
  setupTab('uuid-tab', 'uuid-tab-content');

  // JSON Formatter
  document.getElementById('json-format-btn').addEventListener('click', () => {
    try {
      const input = document.getElementById('json-input').value;
      const obj = JSON.parse(input);
      document.getElementById('json-output').value = JSON.stringify(obj, null, 2);
    } catch (e) {
      showToast('유효한 JSON이 아닙니다: ' + e.message, 'error');
    }
  });

  document.getElementById('json-minify-btn').addEventListener('click', () => {
    try {
      const input = document.getElementById('json-input').value;
      const obj = JSON.parse(input);
      document.getElementById('json-output').value = JSON.stringify(obj);
    } catch (e) {
      showToast('유효한 JSON이 아닙니다: ' + e.message, 'error');
    }
  });

  // Base64 Encode/Decode
  document.getElementById('base64-encode-btn').addEventListener('click', () => {
    const input = document.getElementById('base64-input').value;
    try {
      const encoded = btoa(input);
      document.getElementById('base64-output').value = encoded;
    } catch (e) {
      showToast('인코딩 실패: ' + e.message, 'error');
    }
  });

  document.getElementById('base64-decode-btn').addEventListener('click', () => {
    const input = document.getElementById('base64-input').value;
    try {
      const decoded = atob(input);
      document.getElementById('base64-output').value = decoded;
    } catch (e) {
      showToast('디코딩 실패: 유효한 Base64가 아닙니다', 'error');
    }
  });

  // UUID Generation
  document.getElementById('uuid-v4-btn').addEventListener('click', () => {
    const uuid = self.crypto.randomUUID();
    document.getElementById('uuid-output').value = uuid;
  });

  document.getElementById('uuid-batch-btn').addEventListener('click', () => {
    const count = parseInt(document.getElementById('uuid-count').value);
    const type = document.querySelector('.tab-btn.border-blue-600').id === 'uuid-v7-tab' ? 'v7' : 'v4';
    const results = [];
    
    for (let i = 0; i < count; i++) {
      // @ts-ignore
      results.push(self.crypto.randomUUID());
    }
    
    document.getElementById('uuid-output').value = results.join('\n');
  });

  // Helper for tab switching within this tool
  function setupTab(btnId, contentId) {
    const btn = document.getElementById(btnId);
    const content = document.getElementById(contentId);
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('border-blue-600', 'text-blue-600');
        b.classList.add('border-transparent');
      });
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
      
      btn.classList.add('border-blue-600', 'text-blue-600');
      content.classList.remove('hidden');
    });
  }
};
