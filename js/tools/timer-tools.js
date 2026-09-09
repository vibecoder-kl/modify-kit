// timer-tools.js - Timer and stopwatch

window.initTimerTools = () => {
  const content = document.getElementById('timer-tools-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-8">
      <!-- Stopwatch -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold mb-4">⏱️ 스톱워치</h3>
        <div id="stopwatch-display" class="text-4xl font-mono text-center mb-4">00:00:00.00</div>
        <div class="flex justify-center gap-3">
          <button id="sw-start-btn" onclick="swStart()" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">시작</button>
          <button id="sw-stop-btn" onclick="swStop()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">중지</button>
          <button id="sw-reset-btn" onclick="swReset()" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">리셋</button>
        </div>
        <div id="sw-laps" class="mt-4 max-h-40 overflow-y-auto"></div>
      </div>

      <!-- Timer -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold mb-4">⏲️ 타이머</h3>
        <div class="grid grid-cols-3 gap-2 mb-4">
          <input type="number" id="timer-hours" min="0" max="99" value="0" class="text-center text-2xl font-mono px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700" />
          <span class="text-center self-end pb-1">:</span>
          <input type="number" id="timer-minutes" min="0" max="59" value="5" class="text-center text-2xl font-mono px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700" />
          <span class="text-center self-end pb-1">:</span>
          <input type="number" id="timer-seconds" min="0" max="59" value="0" class="text-center text-2xl font-mono px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700" />
        </div>
        <div id="timer-display" class="text-4xl font-mono text-center mb-4 text-red-600">00:00:00</div>
        <div class="flex justify-center gap-3">
          <button onclick="timerStart()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">시작</button>
          <button onclick="timerPause()" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">일시정지</button>
          <button onclick="timerReset()" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">리셋</button>
        </div>
      </div>
    </div>
  `;

  // Stopwatch state
  let swStartTime = null;
  let swElapsed = 0;
  let swInterval = null;
  let swLaps = [];

  // Format time
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  };

  const formatTimerTime = (ms) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Stopwatch functions
  window.swStart = () => {
    swStartTime = Date.now() - swElapsed;
    swInterval = setInterval(() => {
      swElapsed = Date.now() - swStartTime;
      document.getElementById('stopwatch-display').textContent = formatTime(swElapsed);
    }, 10);
  };

  window.swStop = () => {
    clearInterval(swInterval);
    swLaps.unshift(swElapsed);
    if (swLaps.length > 10) swLaps.pop();
    
    // Add lap
    const lapsDiv = document.getElementById('sw-laps');
    const lapElement = document.createElement('div');
    lapElement.className = 'text-center py-1 border-b border-gray-200 dark:border-gray-700';
    lapElement.textContent = `랩 ${swLaps.length}: ${formatTime(swLaps[0])}`;
    lapsDiv.prepend(lapElement);
  };

  window.swReset = () => {
    clearInterval(swInterval);
    swElapsed = 0;
    swLaps = [];
    swStartTime = null;
    document.getElementById('stopwatch-display').textContent = '00:00:00.00';
    document.getElementById('sw-laps').innerHTML = '';
  };

  // Timer state
  let timerInterval = null;
  let timerRemaining = 0;

  // Timer functions
  window.timerStart = () => {
    const hours = parseInt(document.getElementById('timer-hours').value) || 0;
    const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
    
    timerRemaining = (hours * 3600 + minutes * 60 + seconds) * 1000;
    
    if (timerRemaining <= 0) {
      showToast('시간을 설정해주세요.', 'error');
      return;
    }

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timerRemaining -= 100;
      document.getElementById('timer-display').textContent = formatTimerTime(timerRemaining);
      
      if (timerRemaining <= 0) {
        clearInterval(timerInterval);
        document.getElementById('timer-display').textContent = '00:00:00';
        document.getElementById('timer-display').classList.add('text-red-600');
        
        // Beep sound
        const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAAAAAAAAAAKAAEAIlYAQESsAAACABAAZGF0YT9vT18=');
        audio.play().catch(() => {});
        showToast('⏰ 타이머 완료!', 'success');
      }
    }, 100);
  };

  window.timerPause = () => {
    clearInterval(timerInterval);
    timerInterval = null;
  };

  window.timerReset = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRemaining = 0;
    document.getElementById('timer-display').textContent = '00:00:00';
    document.getElementById('timer-display').classList.remove('text-red-600');
  };
};
