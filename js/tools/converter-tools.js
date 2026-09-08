// converter-tools.js - Unit and currency converter tools

const initConverterTools = () => {
  const content = document.getElementById('converter-tools-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <ul class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <li class="-mb-px mr-2"><button id="length-tab" class="tab-btn border-b-2 border-blue-600 pb-2 px-2 text-blue-600">길이</button></li>
        <li class="-mb-px mr-2"><button id="weight-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">무게</button></li>
        <li class="-mb-px mr-2"><button id="temp-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">온도</button></li>
        <li class="-mb-px"><button id="currency-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">환율</button></li>
      </ul>

      <!-- Length Converter -->
      <div id="length-tab-content" class="tab-content">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <input type="number" id="length-input" value="1" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
            <div>
              <select id="length-from" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                <option value="meter">미터 (m)</option>
                <option value="km">킬로미터 (km)</option>
                <option value="cm">센티미터 (cm)</option>
                <option value="mm">밀리미터 (mm)</option>
                <option value="inch">인치 (in)</option>
                <option value="foot">피트 (ft)</option>
                <option value="yard">야드 (yd)</option>
                <option value="mile">마일 (mile)</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <select id="length-to" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                <option value="meter">미터 (m)</option>
                <option value="km">킬로미터 (km)</option>
                <option value="cm">센티미터 (cm)</option>
                <option value="mm">밀리미터 (mm)</option>
                <option value="inch">인치 (in)</option>
                <option value="foot">피트 (ft)</option>
                <option value="yard">야드 (yd)</option>
                <option value="mile">마일 (mile)</option>
              </select>
            </div>
            <div class="flex items-end">
              <button id="length-convert-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">변환</button>
            </div>
          </div>
          <div id="length-result" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
            <span id="length-result-text">결과: -</span>
          </div>
        </div>
      </div>

      <!-- Weight Converter -->
      <div id="weight-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <input type="number" id="weight-input" value="1" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            <select id="weight-from" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <option value="kg">킬로그램 (kg)</option>
              <option value="g">그람 (g)</option>
              <option value="lb">파운드 (lb)</option>
              <option value="oz">온스 (oz)</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <select id="weight-to" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <option value="kg">킬로그램 (kg)</option>
              <option value="g">그람 (g)</option>
              <option value="lb">파운드 (lb)</option>
              <option value="oz">온스 (oz)</option>
            </select>
            <button id="weight-convert-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">변환</button>
          </div>
          <div id="weight-result" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
            <span>결과: -</span>
          </div>
        </div>
      </div>

      <!-- Temperature Converter -->
      <div id="temp-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <input type="number" id="temp-input" value="0" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            <select id="temp-from" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <option value="celsius">섭씨 (°C)</option>
              <option value="fahrenheit">화씨 (°F)</option>
              <option value="kelvin">켈빈 (K)</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <select id="temp-to" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <option value="celsius">섭씨 (°C)</option>
              <option value="fahrenheit">화씨 (°F)</option>
              <option value="kelvin">켈빈 (K)</option>
            </select>
            <button id="temp-convert-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">변환</button>
          </div>
          <div id="temp-result" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
            <span>결과: -</span>
          </div>
        </div>
      </div>

      <!-- Currency Converter -->
      <div id="currency-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">실시간 환율로 변환합니다. (Open Exchange Rates API)</p>
          <div class="grid grid-cols-2 gap-4">
            <input type="number" id="currency-input" value="1" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            <select id="currency-from" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <option value="USD">미국 달러 (USD)</option>
              <option value="KRW">대한민국 원 (KRW)</option>
              <option value="JPY">일본 엔 (JPY)</option>
              <option value="EUR">유로 (EUR)</option>
              <option value="GBP">영국 파운드 (GBP)</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <select id="currency-to" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <option value="USD">미국 달러 (USD)</option>
              <option value="KRW">대한민국 원 (KRW)</option>
              <option value="JPY">일본 엔 (JPY)</option>
              <option value="EUR">유로 (EUR)</option>
              <option value="GBP">영국 파운드 (GBP)</option>
            </select>
            <button id="currency-convert-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">변환</button>
          </div>
          <div id="currency-result" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
            <span>결과: -</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Tab switching
  setupTab('length-tab', 'length-tab-content');
  setupTab('weight-tab', 'weight-tab-content');
  setupTab('temp-tab', 'temp-tab-content');
  setupTab('currency-tab', 'currency-tab-content');

  // Length converter logic
  document.getElementById('length-convert-btn').addEventListener('click', () => {
    const val = parseFloat(document.getElementById('length-input').value);
    const from = document.getElementById('length-from').value;
    const to = document.getElementById('length-to').value;
    const result = convertLength(val, from, to);
    document.getElementById('length-result').querySelector('span').textContent = `결과: ${result}`;
  });

  // Weight converter
  document.getElementById('weight-convert-btn').addEventListener('click', () => {
    const val = parseFloat(document.getElementById('weight-input').value);
    const from = document.getElementById('weight-from').value;
    const to = document.getElementById('weight-to').value;
    const result = convertWeight(val, from, to);
    document.getElementById('weight-result').querySelector('span').textContent = `결과: ${result}`;
  });

  // Temperature converter
  document.getElementById('temp-convert-btn').addEventListener('click', () => {
    const val = parseFloat(document.getElementById('temp-input').value);
    const from = document.getElementById('temp-from').value;
    const to = document.getElementById('temp-to').value;
    const result = convertTemp(val, from, to);
    document.getElementById('temp-result').querySelector('span').textContent = `결과: ${result}`;
  });

  // Currency converter (using exchangerate-api)
  document.getElementById('currency-convert-btn').addEventListener('click', async () => {
    const val = parseFloat(document.getElementById('currency-input').value);
    const from = document.getElementById('currency-from').value;
    const to = document.getElementById('currency-to').value;
    
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await response.json();
      const rate = data.rates[to];
      const result = (val * rate).toFixed(2);
      document.getElementById('currency-result').querySelector('span').textContent = `결과: ${result} ${to}`;
    } catch (e) {
      showToast('환율 정보를 가져오지 못했습니다. (무료 API 제한)', 'error');
      document.getElementById('currency-result').querySelector('span').textContent = '결과: API 오류';
    }
  });

  // Converter functions
  function convertLength(value, from, to) {
    const units = { meter: 1, km: 1000, cm: 0.01, mm: 0.001, inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.344 };
    const meters = value * units[from];
    return (meters / units[to]).toFixed(4);
  }

  function convertWeight(value, from, to) {
    const units = { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 };
    const kgs = value * units[from];
    return (kgs / units[to]).toFixed(4);
  }

  function convertTemp(value, from, to) {
    let celsius;
    if (from === 'celsius') celsius = value;
    else if (from === 'fahrenheit') celsius = (value - 32) * 5/9;
    else if (from === 'kelvin') celsius = value - 273.15;

    if (to === 'celsius') return celsius.toFixed(2) + ' °C';
    else if (to === 'fahrenheit') return (celsius * 9/5 + 32).toFixed(2) + ' °F';
    else if (to === 'kelvin') return (celsius + 273.15).toFixed(2) + ' K';
  }

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
