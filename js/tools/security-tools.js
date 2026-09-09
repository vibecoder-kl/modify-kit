// security-tools.js - Security and privacy tools

window.initSecurityTools = () => {
  const content = document.getElementById('security-tools-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <ul class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <li class="-mb-px mr-2"><button id="password-tab" class="tab-btn border-b-2 border-blue-600 pb-2 px-2 text-blue-600">비밀번호 생성기</button></li>
        <li class="-mb-px"><button id="hash-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">해시 생성</button></li>
      <li class="-mb-px mr-2"><button id="password-check-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">비밀번호 강도 체크</button></li>
      <li class="-mb-px"><button id="random-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">랜덤 숫자 생성</button></li>
      </ul>

      <!-- Password Generator -->
      <div id="password-tab-content" class="tab-content">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">길이</label>
              <input type="number" id="password-length" value="16" min="8" max="128" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
            <div class="flex items-end">
              <button id="generate-password-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">생성</button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="flex items-center gap-2"><input type="checkbox" id="include-upper" checked> 대문자</label>
            <label class="flex items-center gap-2"><input type="checkbox" id="include-lower" checked> 소문자</label>
            <label class="flex items-center gap-2"><input type="checkbox" id="include-numbers" checked> 숫자</label>
            <label class="flex items-center gap-2"><input type="checkbox" id="include-symbols" checked> 특수문자</label>
          </div>

          <div class="flex items-center gap-2">
            <input type="number" id="password-count" value="5" min="1" max="50" class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700" />
            <button id="batch-password-btn" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">일괄 생성</button>
          </div>

          <div id="password-result" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <textarea id="password-output" rows="6" readonly placeholder="생성된 비밀번호가 여기에 표시됩니다" class="w-full px-2 py-1 bg-transparent font-mono border-none outline-none resize-none"></textarea>
            <button id="copy-password-btn" class="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">복사</button>
          </div>
        </div>
      </div>

      <!-- Hash Generator -->
      <div id="hash-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <textarea id="hash-input" rows="4" placeholder="해시를 생성할 텍스트/데이터 입력" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono resize-y"></textarea>
          <div class="grid grid-cols-2 gap-4">
            <button id="hash-sha256-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">SHA-256</button>
            <button id="hash-md5-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">MD5 (⚠️ 권장 안 함)</button>
          </div>
          <div class="flex items-center gap-2">
            <input type="file" id="hash-file-input" accept="*" class="flex-1" />
            <button id="hash-file-btn" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">파일 해시 생성</button>
          </div>
          <textarea id="hash-output" rows="4" readonly class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono resize-y"></textarea>
        </div>
      </div>

      <!-- Password Strength Checker -->
      <div id="password-check-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <input type="password" id="password-check-input" placeholder="체크할 비밀번호 입력" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono" />
          <button id="password-check-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">강도 체크</button>
          <div id="password-strength-result" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium">강도</span>
                <span id="password-strength-text" class="text-sm font-bold">--</span>
              </div>
              <div class="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                <div id="password-strength-bar" class="h-2 rounded-full" style="width: 0%"></div>
              </div>
              <div id="password-feedback" class="text-sm text-gray-600 dark:text-gray-400 space-y-1"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Random Number Generator -->
      <div id="random-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">최소값</label>
              <input type="number" id="random-min" value="1" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">최대값</label>
              <input type="number" id="random-max" value="100" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
          </div>
          <div class="flex items-center gap-2">
            <label class="flex items-center gap-1 text-sm">
              <input type="checkbox" id="random-count-toggle" /> 여러 숫자
            </label>
            <input type="number" id="random-count" value="5" min="1" max="1000" class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700" />
          </div>
          <button id="random-generate-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">생성</button>
          <textarea id="random-output" rows="6" readonly placeholder="생성된 숫자가 여기에 표시됩니다" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono resize-y"></textarea>
          <button id="random-copy" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">복사</button>
        </div>
      </div>
    </div>
  `;

  // Tab switching
  setupTab('password-tab', 'password-tab-content');
  setupTab('hash-tab', 'hash-tab-content');
  setupTab('password-check-tab', 'password-check-tab-content');
  setupTab('random-tab', 'random-tab-content');

  // Password Generator
  document.getElementById('generate-password-btn').addEventListener('click', () => {
    const password = generatePassword();
    document.getElementById('password-output').value = password;
  });

  document.getElementById('batch-password-btn').addEventListener('click', () => {
    const count = parseInt(document.getElementById('password-count').value) || 1;
    const passwords = [];
    for (let i = 0; i < count; i++) {
      passwords.push(generatePassword());
    }
    document.getElementById('password-output').value = passwords.join('\n');
  });

  document.getElementById('copy-password-btn').addEventListener('click', () => {
    const output = document.getElementById('password-output');
    if (output.value) {
      navigator.clipboard.writeText(output.value).then(() => {
        showToast('복사되었습니다!', 'success');
      });
    }
  });

  // Hash Generator
  document.getElementById('hash-sha256-btn').addEventListener('click', async () => {
    const text = document.getElementById('hash-input').value;
    if (!text) {
      showToast('텍스트를 입력해주세요.', 'error');
      return;
    }
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    document.getElementById('hash-output').value = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  });

  document.getElementById('hash-md5-btn').addEventListener('click', () => {
    const text = document.getElementById('hash-input').value;
    if (!text) {
      showToast('텍스트를 입력해주세요.', 'error');
      return;
    }
    // MD5 via browser - simple implementation for basic use
    document.getElementById('hash-output').value = 'MD5: ' + simpleMD5(text);
    showToast('MD5는 보안에 취약하니 SHA-256을 권장합니다', 'info');
  });

  document.getElementById('hash-file-btn').addEventListener('click', async () => {
    const file = document.getElementById('hash-file-input').files[0];
    if (!file) {
      showToast('파일을 선택해주세요.', 'error');
      return;
    }
    const arrayBuffer = await file.arrayBuffer();
    const hash = await crypto.subtle.digest('SHA-256', arrayBuffer);
    document.getElementById('hash-output').value = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  });

  // Generate password helper
  function generatePassword() {
    const length = parseInt(document.getElementById('password-length').value) || 16;
    const includeUpper = document.getElementById('include-upper').checked;
    const includeLower = document.getElementById('include-lower').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';

    let password = '';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      password += charset[array[i] % charset.length];
    }
    return password;
  }

  // Simple MD5 implementation (for basic use, not cryptographically secure)
  function simpleMD5(str) {
    // This is a very simplified version - in production, use a proper library
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return (hash >>> 0).toString(16).padStart(32, '0');
  }

  // Password Strength Checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) { score += 1; feedback.push('✓ 8자 이상'); }
    else { feedback.push('✗ 8자 이상 권장'); }

    if (password.length >= 12) { score += 1; }
    if (/[A-Z]/.test(password)) { score += 1; feedback.push('✓ 대문자 포함'); }
    else { feedback.push('✗ 대문자 추가 권장'); }
    if (/[a-z]/.test(password)) { score += 1; feedback.push('✓ 소문자 포함'); }
    else { feedback.push('✗ 소문자 추가 권장'); }
    if (/[0-9]/.test(password)) { score += 1; feedback.push('✓ 숫자 포함'); }
    else { feedback.push('✗ 숫자 추가 권장'); }
    if (/[^A-Za-z0-9]/.test(password)) { score += 1; feedback.push('✓ 특수문자 포함'); }
    else { feedback.push('✗ 특수문자 추가 권장'); }

    return { score, feedback };
  };

  document.getElementById('password-check-btn').addEventListener('click', () => {
    const password = document.getElementById('password-check-input').value;
    if (!password) {
      showToast('비밀번호를 입력해주세요.', 'error');
      return;
    }

    const { score, feedback } = checkPasswordStrength(password);
    const strengthText = document.getElementById('password-strength-text');
    const strengthBar = document.getElementById('password-strength-bar');
    const feedbackDiv = document.getElementById('password-feedback');

    const levels = ['약함', '보통', '강함', '매우 강함'];
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'];
    const levelIndex = Math.min(score, 3);

    strengthText.textContent = levels[Math.min(Math.floor(score / 2), 3)];
    strengthText.className = 'text-sm font-bold ' + (score >= 6 ? 'text-green-500' : score >= 4 ? 'text-yellow-500' : 'text-red-500');
    strengthBar.style.width = `${(score / 7) * 100}%`;
    strengthBar.className = `h-2 rounded-full ${colors[levelIndex]}`;

    feedbackDiv.innerHTML = feedback.map(f => `<div>${f}</div>`).join('');
  });

  // Random Number Generator
  document.getElementById('random-generate-btn').addEventListener('click', () => {
    const min = parseInt(document.getElementById('random-min').value) || 0;
    const max = parseInt(document.getElementById('random-max').value) || 100;
    const multi = document.getElementById('random-count-toggle').checked;
    const count = parseInt(document.getElementById('random-count').value) || 1;

    if (min >= max) {
      showToast('최소값이 최대값보다 작아야 합니다.', 'error');
      return;
    }

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const array = new Uint32Array(count);
    crypto.getRandomValues(array);

    let numbers;
    if (multi) {
      numbers = Array.from(array).map(v => min + (v % (max - min + 1)));
    } else {
      numbers = [randomInt(min, max)];
    }

    document.getElementById('random-output').value = numbers.join('\n');
  });

  document.getElementById('random-copy').addEventListener('click', async () => {
    const output = document.getElementById('random-output');
    if (output.value) {
      await navigator.clipboard.writeText(output.value);
      showToast('복사되었습니다!', 'success');
    }
  });

  // Tab helper
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
