// calculator-tools.js - Simple calculator

window.initCalculatorTools = () => {
  const content = document.getElementById('calculator-tools-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <div id="calculator" class="max-w-xs mx-auto">
        <!-- Display -->
        <div class="bg-gray-800 text-white text-right p-4 rounded-t-lg">
          <div id="calc-history" class="text-sm text-gray-400 h-5 overflow-hidden"></div>
          <div id="calc-display" class="text-2xl font-mono text-right overflow-hidden text-ellipsis whitespace-nowrap"></div>
        </div>
        
        <!-- Buttons -->
        <div class="grid grid-cols-4 gap-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-b-lg">
          <button onclick="calcClear()" class="py-3 text-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition">C</button>
          <button onclick="calcBackspace()" class="py-3 text-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition">⌫</button>
          <button onclick="calcPercent()" class="py-3 text-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition">%</button>
          <button onclick="calcOperator('/')" class="py-3 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded transition">÷</button>
          
          <button onclick="calcNumber('7')" class="py-3 text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition shadow">7</button>
          <button onclick="calcNumber('8')" class="py-3 text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition shadow">8</button>
          <button onclick="calcNumber('9')" class="py-3 text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition shadow">9</button>
          <button onclick="calcOperator('*')" class="py-3 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded transition">×</button>
          
          <button onclick="calcNumber('4')" class="py-3 text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition shadow">4</button>
          <button onclick="calcNumber('5')" class="py-3 text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition shadow">5</button>
          <button onclick="calcNumber('6')" class="py-3 text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition shadow">6</button>
          <button onclick="calcOperator('-')" class="py-3 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded transition">−</button>
          
          <button onclick="calcNumber('1')" class="py-3 text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition shadow">1</button>
          <button onclick="calcNumber('2')" class="py-3 text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition shadow">2</button>
          <button onclick="calcNumber('3')" class="py-3 text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition shadow">3</button>
          <button onclick="calcOperator('+')" class="py-3 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded transition">+</button>
          
          <button onclick="calcNumber('0')" class="py-3 text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition shadow col-span-2">0</button>
          <button onclick="calcNumber('.')" class="py-3 text-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition shadow">.</button>
          <button onclick="calcEquals()" class="py-3 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded transition">=</button>
        </div>
      </div>
    </div>
  `;

  // Calculator state
  let currentValue = '0';
  let previousValue = '';
  let operation = '';
  let shouldReset = false;

  // Update display
  const updateDisplay = () => {
    document.getElementById('calc-display').textContent = currentValue;
  };

  // Number input
  window.calcNumber = (num) => {
    if (currentValue === '0' || shouldReset) {
      currentValue = num;
      shouldReset = false;
    } else {
      currentValue += num;
    }
    updateDisplay();
  };

  // Operator
  window.calcOperator = (op) => {
    previousValue = currentValue;
    operation = op;
    shouldReset = true;
    document.getElementById('calc-history').textContent = `${previousValue} ${op === '*' ? '×' : op === '/' ? '÷' : op} `;
  };

  // Equals
  window.calcEquals = () => {
    if (operation === '') return;
    
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    let result = 0;

    switch (operation) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '*': result = prev * curr; break;
      case '/': result = prev / curr; break;
    }

    currentValue = result.toString();
    operation = '';
    shouldReset = true;
    document.getElementById('calc-history').textContent = '';
    updateDisplay();
  };

  // Clear
  window.calcClear = () => {
    currentValue = '0';
    previousValue = '';
    operation = '';
    shouldReset = false;
    document.getElementById('calc-history').textContent = '';
    updateDisplay();
  };

  // Backspace
  window.calcBackspace = () => {
    if (currentValue.length > 1) {
      currentValue = currentValue.slice(0, -1);
    } else {
      currentValue = '0';
    }
    updateDisplay();
  };

  // Percent
  window.calcPercent = () => {
    currentValue = (parseFloat(currentValue) / 100).toString();
    updateDisplay();
  };

  // Initialize
  updateDisplay();
};
