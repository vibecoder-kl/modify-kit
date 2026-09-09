// Calculator - Advanced Scientific Calculator
// Browser-only, no server processing needed

document.addEventListener('DOMContentLoaded', function() {
  const content = document.getElementById('calculator-content');
  if (!content) {
    console.error('Calculator container not found');
    return;
  }

  // Build HTML structure
  content.innerHTML = 
    '<div class="max-w-sm mx-auto">' +
    '<!-- Display -->' +
    '<div class="bg-gray-900 dark:bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700">' +
      '<!-- History -->' +
      '<div id="history" class="px-4 py-2 text-right text-xs text-gray-400 font-mono bg-gray-800 dark:bg-gray-900 min-h-[24px]"></div>' +
      
      '<!-- Display -->' +
      '<div class="px-4 py-3">' +
        '<input type="text" id="display" class="w-full text-right text-3xl font-mono text-white bg-transparent focus:outline-none" readonly>' +
      '</div>' +
      
      '<!-- Buttons Grid -->' +
      '<div class="grid grid-cols-5 gap-1 p-3">' +
        '<!-- Scientific Functions Row 1 -->' +
        '<button onclick="appendToDisplay(\'Math.sin(\')" class="p-3 bg-gray-800 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 transition">sin</button>' +
        '<button onclick="appendToDisplay(\'Math.cos(\')" class="p-3 bg-gray-800 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 transition">cos</button>' +
        '<button onclick="appendToDisplay(\'Math.tan(\')" class="p-3 bg-gray-800 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 transition">tan</button>' +
        '<button onclick="appendToDisplay(\'Math.log(\')" class="p-3 bg-gray-800 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 transition">log</button>' +
        '<button onclick="appendToDisplay(\'Math.sqrt(\')" class="p-3 bg-gray-800 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 transition">√</button>' +
        
        '<!-- Scientific Functions Row 2 -->' +
        '<button onclick="appendToDisplay(\'Math.pow(\')" class="p-3 bg-gray-800 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 transition">xʸ</button>' +
        '<button onclick="appendToDisplay(\'Math.exp(\')" class="p-3 bg-gray-800 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 transition">eˣ</button>' +
        '<button onclick="appendToDisplay(\'Math.PI\')" class="p-3 bg-gray-800 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 transition">π</button>' +
        '<button onclick="appendToDisplay(\'Math.E\')" class="p-3 bg-gray-800 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 transition">e</button>' +
        '<button onclick="appendToDisplay(\'Math.abs(\')" class="p-3 bg-gray-800 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 transition">±</button>' +
        
        '<!-- Clear/Backspace/Delete -->' +
        '<button onclick="clearDisplay()" class="p-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition">C</button>' +
        '<button onclick="backspace()" class="p-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition">⌫</button>' +
        '<button onclick="appendToDisplay(\'()\')" class="p-3 bg-gray-800 dark:bg-gray-700 rounded-lg text-lg font-mono text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 transition">()</button>' +
        '<button onclick="appendToDisplay(\'%\')" class="p-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">%</button>' +
        '<button onclick="appendToDisplay(\'**\')" class="p-3 bg-orange-500 text-white rounded-lg text-lg font-mono hover:bg-orange-600 transition">x²</button>' +
        
        '<!-- Numbers and operators Row 1 -->' +
        '<button onclick="appendToDisplay(\'7\')" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-mono text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">7</button>' +
        '<button onclick="appendToDisplay(\'8\')" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-mono text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">8</button>' +
        '<button onclick="appendToDisplay(\'9\')" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-mono text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">9</button>' +
        '<button onclick="appendToDisplay(\'/\')" class="p-3 bg-orange-500 text-white rounded-lg text-xl font-mono hover:bg-orange-600 transition">÷</button>' +
        '<button onclick="appendToDisplay(\'**\')" class="p-3 bg-orange-500 text-white rounded-lg text-lg font-mono hover:bg-orange-600 transition">x²</button>' +
        
        '<!-- Numbers and operators Row 2 -->' +
        '<button onclick="appendToDisplay(\'4\')" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-mono text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">4</button>' +
        '<button onclick="appendToDisplay(\'5\')" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-mono text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">5</button>' +
        '<button onclick="appendToDisplay(\'6\')" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-mono text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">6</button>' +
        '<button onclick="appendToDisplay(\'*\')" class="p-3 bg-orange-500 text-white rounded-lg text-xl font-mono hover:bg-orange-600 transition">×</button>' +
        '<button onclick="appendToDisplay(\'/\')" class="p-3 bg-orange-500 text-white rounded-lg text-xl font-mono hover:bg-orange-600 transition">÷</button>' +
        
        '<!-- Numbers and operators Row 3 -->' +
        '<button onclick="appendToDisplay(\'1\')" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-mono text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">1</button>' +
        '<button onclick="appendToDisplay(\'2\')" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-mono text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">2</button>' +
        '<button onclick="appendToDisplay(\'3\')" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-mono text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">3</button>' +
        '<button onclick="appendToDisplay(\'-\')" class="p-3 bg-orange-500 text-white rounded-lg text-xl font-mono hover:bg-orange-600 transition">−</button>' +
        '<button onclick="appendToDisplay(\'Math.sqrt(\')" class="p-3 bg-orange-500 text-white rounded-lg text-lg font-mono hover:bg-orange-600 transition">√</button>' +
        
        '<!-- Numbers and operators Row 4 -->' +
        '<button onclick="appendToDisplay(\'0\')" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-mono text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition col-span-2">0</button>' +
        '<button onclick="appendToDisplay(\'.\')" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-mono text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">.</button>' +
        '<button onclick="appendToDisplay(\'+\')" class="p-3 bg-orange-500 text-white rounded-lg text-xl font-mono hover:bg-orange-600 transition">+</button>' +
        '<button onclick="calculate()" class="p-3 bg-blue-500 text-white rounded-lg text-xl font-mono hover:bg-blue-600 transition col-span-1">=</button>' +
      '</div>' +
    '</div>' +
    
    '<!-- Calculator History Panel -->' +
    '<div id="calc-history" class="mt-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">' +
      '<h4 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">계산 기록</h4>' +
      '<div id="history-list" class="text-xs font-mono text-gray-700 dark:text-gray-300 max-h-32 overflow-y-auto">' +
        '<div class="opacity-50 text-center py-2">계산 기록이 여기에 표시됩니다.</div>' +
      '</div>' +
    '</div>' +
    '</div>';

  // Initialize
  const display = document.getElementById('display');
  display.value = '0';
  display.focus();
  
  updateHistory();
});

// Calculator functions
window.appendToDisplay = function(value) {
  const display = document.getElementById('display');
  if (display.value === '0' && !['.', '('].includes(value) && !value.startsWith('Math.')) {
    display.value = value;
  } else {
    display.value += value;
  }
  display.focus();
};

window.calculate = function() {
  try {
    const display = document.getElementById('display');
    const expression = display.value;
    const result = eval(expression);
    
    if (result.toString().length > 15) {
      display.value = result.toExponential(10);
    } else {
      display.value = result;
    }
    
    addToHistory(expression + ' = ' + display.value);
  } catch (e) {
    document.getElementById('display').value = 'Error';
  }
};

window.clearDisplay = function() {
  document.getElementById('display').value = '0';
  document.getElementById('display').focus();
};

window.backspace = function() {
  const display = document.getElementById('display');
  if (display.value.length > 1) {
    display.value = display.value.slice(0, -1);
  } else {
    display.value = '0';
  }
  display.focus();
};

// History management
let calcHistory = [];

function addToHistory(entry) {
  calcHistory.unshift(entry);
  if (calcHistory.length > 10) calcHistory.pop();
  updateHistory();
}

function updateHistory() {
  const historyDiv = document.getElementById('history-list');
  if (historyDiv) {
    if (calcHistory.length === 0) {
      historyDiv.innerHTML = '<div class="opacity-50 text-center py-2">계산 기록이 여기에 표시됩니다.</div>';
    } else {
      historyDiv.innerHTML = calcHistory.map(function(item) {
        return '<div class="py-1 border-b border-gray-200 dark:border-gray-700">' + item + '</div>';
      }).join('');
    }
  }
}

// Keyboard support
document.addEventListener('keydown', function(e) {
  const display = document.getElementById('display');
  if (!display) return;
  
  const key = e.key;
  if (/[0-9]/.test(key)) {
    appendToDisplay(key);
  } else if (key === '.') {
    appendToDisplay('.');
  } else if (['+', '-'].includes(key)) {
    appendToDisplay(key);
  } else if (key === '*') {
    appendToDisplay('*');
  } else if (key === '/') {
    e.preventDefault();
    appendToDisplay('/');
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
  } else if (key === 'Escape') {
    clearDisplay();
  } else if (key === 'Backspace') {
    backspace();
  }
});
