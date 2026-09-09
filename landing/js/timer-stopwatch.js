// Timer & Stopwatch - Advanced version with lap recording and timer presets
// Browser-only, no server processing needed

document.addEventListener('DOMContentLoaded', function() {
  const content = document.getElementById('timer-stopwatch-content');
  if (!content) {
    console.error('Timer/Stopwatch container not found');
    return;
  }

  // Build HTML structure with enhanced UI
  const html = `
<div class="max-w-2xl mx-auto">
  <!-- Tab Navigation -->
  <div class="flex justify-center mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-2">
    <button id="tab-timer" onclick="switchTab('timer')" 
      class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-300">
      타이머
    </button>
    <button id="tab-stopwatch" onclick="switchTab('stopwatch')" 
      class="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-300">
      스톱워치
    </button>
  </div>

  <!-- Timer View -->
  <div id="timer-view" class="hidden">
    <!-- Preset Buttons -->
    <div class="grid grid-cols-5 gap-2 mb-6">
      <button onclick="setPresetTimer(5)" class="py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">5분</button>
      <button onclick="setPresetTimer(10)" class="py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">10분</button>
      <button onclick="setPresetTimer(15)" class="py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">15분</button>
      <button onclick="setPresetTimer(25)" class="py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">포모도로</button>
      <button onclick="setPresetTimer(60)" class="py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">1시간</button>
    </div>

    <!-- Timer Input -->
    <div class="flex justify-center items-center gap-4 mb-8">
      <div class="relative">
        <input type="number" id="timer-minutes" min="0" max="99" value="0"
          class="w-20 h-16 text-center text-3xl font-mono bg-gray-100 dark:bg-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 transition-colors">
        <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">분</div>
      </div>
      <span class="text-3xl font-mono text-gray-400 dark:text-gray-500 mt-4">:</span>
      <div class="relative">
        <input type="number" id="timer-seconds" min="0" max="59" value="0"
          class="w-20 h-16 text-center text-3xl font-mono bg-gray-100 dark:bg-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 transition-colors">
        <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">초</div>
      </div>
    </div>

    <!-- Timer Display (Segment Style) -->
    <div id="timer-display" 
      class="text-center text-5xl font-mono mb-8 text-gray-900 dark:text-white tracking-wider segment-display">
      00:00
    </div>

    <!-- Timer Controls -->
    <div class="flex justify-center gap-4 mb-6">
      <button onclick="startTimer()" 
        class="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
        시작
      </button>
      <button onclick="pauseTimer()" 
        class="w-16 h-16 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
        일시정지
      </button>
      <button onclick="resetTimer()" 
        class="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
        초기화
      </button>
    </div>

    <!-- Auto-repeat Settings -->
    <div class="flex items-center justify-center gap-3 mb-4">
      <label class="text-sm text-gray-600 dark:text-gray-400">반복:</label>
      <input type="number" id="repeat-count" min="0" max="99" value="0"
        class="w-14 h-8 text-center text-sm font-mono bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500">
      <span class="text-sm text-gray-600 dark:text-gray-400">회 (0은 무반복)</span>
    </div>

    <!-- Timer Queue -->
    <div id="timer-queue" class="space-y-2 mb-4 hidden">
      <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">예약된 타이머</h4>
      <div id="queue-list" class="space-y-1"></div>
    </div>

    <!-- Add to Queue Button -->
    <div class="flex justify-center">
      <button onclick="addToQueue()" 
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition">
        + 큐에 추가
      </button>
    </div>
  </div>

  <!-- Stopwatch View -->
  <div id="stopwatch-view">
    <!-- Stopwatch Display (Segment Style) -->
    <div id="stopwatch-display" 
      class="text-center text-6xl font-mono mb-8 text-gray-900 dark:text-white tracking-wider segment-display">
      00:00:00.000
    </div>

    <!-- Stopwatch Controls -->
    <div class="flex justify-center gap-4 mb-8">
      <button onclick="startStopwatch()" 
        class="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
        시작
      </button>
      <button onclick="pauseStopwatch()" 
        class="w-16 h-16 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
        일시정지
      </button>
      <button onclick="resetStopwatch()" 
        class="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
        초기화
      </button>
    </div>

    <!-- Lap Recording -->
    <div class="flex justify-center mb-6">
      <button onclick="recordLap()" 
        class="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200 text-lg">
        🏁 랩/순위 기록
      </button>
    </div>

    <!-- Lap Records -->
    <div id="lap-container" class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
      <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 flex justify-between items-center">
        <span>순위 기록</span>
        <button onclick="clearLaps()" class="text-xs text-red-500 hover:text-red-600">전체 삭제</button>
      </h4>
      <div id="lap-list" class="space-y-1 max-h-48 overflow-y-auto">
        <div class="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
          아직 기록이 없습니다. 스톱워치를 시작하고 랩을 기록해 보세요.
        </div>
      </div>
    </div>
  </div>
</div>
  `;

  content.innerHTML = html;

  // Initialize
  switchTab('timer');
});

// Global state
let timerInterval;
let stopwatchInterval;
let stopwatchStartTime;
let stopwatchPausedTime = 0;
let lapCounter = 0;
let timerQueue = [];
let timerRepeat = 0;
let currentRepeat = 0;

// Tab switching
window.switchTab = function(tab) {
  const isTimer = tab === 'timer';
  const timerBtn = document.getElementById('tab-timer');
  const stopwatchBtn = document.getElementById('tab-stopwatch');

  // 타이머 탭 스타일
  if (isTimer) {
    timerBtn.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
    timerBtn.classList.add('bg-blue-600', 'text-white');
  } else {
    timerBtn.classList.remove('bg-blue-600', 'text-white');
    timerBtn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
  }

  // 스톱워치 탭 스타일
  if (!isTimer) {
    stopwatchBtn.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
    stopwatchBtn.classList.add('bg-blue-600', 'text-white');
  } else {
    stopwatchBtn.classList.remove('bg-blue-600', 'text-white');
    stopwatchBtn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
  }

  document.getElementById('timer-view').classList.toggle('hidden', !isTimer);
  document.getElementById('stopwatch-view').classList.toggle('hidden', isTimer);
};

// Utility function
function pad(num, size) {
  return num.toString().padStart(size, '0');
}

// === TIMER FUNCTIONS ===

// Set preset timer values
window.setPresetTimer = function(minutes) {
  document.getElementById('timer-minutes').value = minutes;
  document.getElementById('timer-seconds').value = 0;
  updateTimerDisplay(minutes * 60);
};

// Calculate remaining time
let timerSecondsLeft = 0;
let timerTotal = 0;

window.startTimer = function() {
  clearInterval(timerInterval);
  timerTotal = (parseInt(document.getElementById('timer-minutes').value) || 0) * 60 + 
               (parseInt(document.getElementById('timer-seconds').value) || 0);
  timerSecondsLeft = timerTotal;
  currentRepeat = parseInt(document.getElementById('repeat-count').value) || 0;
  updateTimerDisplay(timerSecondsLeft);
  
  timerInterval = setInterval(function() {
    if (timerSecondsLeft > 0) {
      timerSecondsLeft--;
      updateTimerDisplay(timerSecondsLeft);
    } else {
      clearInterval(timerInterval);
      alert('타이머 종료!');
      
      // Handle auto-repeat
      if (currentRepeat > 0) {
        currentRepeat--;
        document.getElementById('repeat-count').value = currentRepeat;
        if (currentRepeat > 0) {
          timerSecondsLeft = timerTotal;
          updateTimerDisplay(timerSecondsLeft);
          startTimerFromState();
        } else {
          document.getElementById('repeat-count').value = 0;
        }
      }
      
      // Start next timer in queue
      processTimerQueue();
    }
  }, 1000);
};

function startTimerFromState() {
  timerInterval = setInterval(function() {
    if (timerSecondsLeft > 0) {
      timerSecondsLeft--;
      updateTimerDisplay(timerSecondsLeft);
    } else {
      clearInterval(timerInterval);
      alert('타이머 종료!');
      
      if (currentRepeat > 0) {
        currentRepeat--;
        document.getElementById('repeat-count').value = currentRepeat;
        if (currentRepeat > 0) {
          timerSecondsLeft = timerTotal;
          updateTimerDisplay(timerSecondsLeft);
          startTimerFromState();
        } else {
          document.getElementById('repeat-count').value = 0;
        }
      }
      
      processTimerQueue();
    }
  }, 1000);
}

window.pauseTimer = function() {
  clearInterval(timerInterval);
};

window.resetTimer = function() {
  clearInterval(timerInterval);
  setPresetTimer(0);
  document.getElementById('repeat-count').value = 0;
  currentRepeat = 0;
  timerQueue = [];
  updateQueueDisplay();
};

function updateTimerDisplay(totalSeconds) {
  const mins = pad(Math.floor(totalSeconds / 60), 2);
  const secs = pad(totalSeconds % 60, 2);
  document.getElementById('timer-display').textContent = mins + ':' + secs;
}

// Timer Queue functions
window.addToQueue = function() {
  const mins = parseInt(document.getElementById('timer-minutes').value) || 0;
  const secs = parseInt(document.getElementById('timer-seconds').value) || 0;
  const name = prompt('타이머 이름 (선택사항):', '') || `타이머 ${mins}분 ${secs}초`;
  
  if (mins === 0 && secs === 0) {
    alert('시간을 설정해주세요.');
    return;
  }
  
  timerQueue.push({
    name: name,
    minutes: mins,
    seconds: secs
  });
  
  updateQueueDisplay();
};

function updateQueueDisplay() {
  const queueDiv = document.getElementById('timer-queue');
  const queueList = document.getElementById('queue-list');
  
  if (timerQueue.length === 0) {
    queueDiv.classList.add('hidden');
    return;
  }
  
  queueDiv.classList.remove('hidden');
  
  queueList.innerHTML = timerQueue.map((item, index) => 
    `<div class="flex justify-between items-center p-2 bg-white dark:bg-gray-900 rounded-lg">
      <span class="text-sm text-gray-700 dark:text-gray-300">${item.name}</span>
      <span class="text-xs text-gray-500 dark:text-gray-400">${pad(item.minutes, 2)}:${pad(item.seconds, 2)}</span>
      <button onclick="removeFromQueue(${index})" class="ml-2 text-red-500 hover:text-red-600 text-xs">×</button>
    </div>`
  ).join('');
}

window.removeFromQueue = function(index) {
  timerQueue.splice(index, 1);
  updateQueueDisplay();
};

function processTimerQueue() {
  if (timerQueue.length > 0) {
    const next = timerQueue.shift();
    document.getElementById('timer-minutes').value = next.minutes;
    document.getElementById('timer-seconds').value = next.seconds;
    document.getElementById('repeat-count').value = 0;
    currentRepeat = 0;
    updateQueueDisplay();
    
    // Auto-start next timer
    setTimeout(function() {
      startTimer();
    }, 1000);
  }
};

// === STOPWATCH FUNCTIONS ===

window.startStopwatch = function() {
  clearInterval(stopwatchInterval);
  stopwatchStartTime = Date.now() - stopwatchPausedTime;
  stopwatchInterval = setInterval(function() {
    const elapsed = Date.now() - stopwatchStartTime;
    updateStopwatchDisplay(elapsed);
  }, 10);
};

window.pauseStopwatch = function() {
  clearInterval(stopwatchInterval);
  stopwatchPausedTime = Date.now() - stopwatchStartTime;
};

window.resetStopwatch = function() {
  clearInterval(stopwatchInterval);
  stopwatchStartTime = 0;
  stopwatchPausedTime = 0;
  updateStopwatchDisplay(0);
  lapCounter = 0;
  clearLaps();
};

window.recordLap = function() {
  const display = document.getElementById('stopwatch-display').textContent;
  lapCounter++;
  
  const lapList = document.getElementById('lap-list');
  const rankIcons = ['🥇 1위', '🥈 2위', '🥉 3위'];
  const rankLabel = rankIcons[lapCounter - 1] || `${lapCounter}위`;
  
  const lapItem = document.createElement('div');
  lapItem.className = 'flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-lg shadow';
  lapItem.innerHTML = `
    <span class="font-medium text-purple-600 dark:text-purple-400">${rankLabel}</span>
    <span class="font-mono text-lg text-gray-900 dark:text-white">${display}</span>
  `;
  
  // Insert at the beginning for newest first
  if (lapList.firstChild && lapList.firstChild.textContent.includes('아직 기록')) {
    lapList.innerHTML = '';
  }
  lapList.insertBefore(lapItem, lapList.firstChild);
};

window.clearLaps = function() {
  const lapList = document.getElementById('lap-list');
  lapList.innerHTML = '<div class="text-center text-sm text-gray-500 dark:text-gray-400 py-4">아직 기록이 없습니다. 스톱워치를 시작하고 랩을 기록해 보세요.</div>';
  lapCounter = 0;
};

function updateStopwatchDisplay(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const mins = pad(Math.floor(totalSeconds / 60), 2);
  const secs = pad(totalSeconds % 60, 2);
  const millis = pad(ms % 1000, 3);
  document.getElementById('stopwatch-display').textContent = mins + ':' + secs + ':' + millis;
}
