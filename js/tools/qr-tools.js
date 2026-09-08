// qr-tools.js - QR Code and Barcode generation/scanning

const initQrTools = () => {
  const content = document.getElementById('qr-tools-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <ul class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <li class="-mb-px mr-2">
          <button id="qr-tab" class="tab-btn border-b-2 border-blue-600 pb-2 px-2 text-blue-600">QR 생성</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="barcode-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">Barcode</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="scan-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">QR 스캔</button>
        </li>
        <li class="-mb-px">
          <button id="barcode-scan-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">Barcode 스캔</button>
        </li>
      </ul>

      <!-- QR Generator -->
      <div id="qr-generator-tab" class="tab-content">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">텍스트 또는 URL</label>
            <input type="text" id="qr-text" placeholder="https://example.com" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
          <div class="flex gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">크기</label>
              <select id="qr-size" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                <option value="128">128px</option>
                <option value="256" selected>256px</option>
                <option value="512">512px</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">색상</label>
              <input type="color" id="qr-color" value="#000000" class="w-10 h-10 p-1 border border-gray-300 dark:border-gray-600 rounded" />
            </div>
          </div>
          <button id="qr-generate-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            QR 코드 생성
          </button>
          <div id="qr-code-container" class="hidden mt-4">
            <canvas id="qr-canvas"></canvas>
            <div class="mt-2">
              <a id="qr-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                다운로드
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Barcode Generator -->
      <div id="barcode-generator-tab" class="hidden tab-content">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">숫자 텍스트 (EAN-13, UPC-A)</label>
            <input type="text" id="barcode-text" placeholder="123456789012" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
          <button id="barcode-generate-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Barcode 생성
          </button>
          <div id="barcode-container" class="hidden mt-4">
            <svg id="barcode-svg"></svg>
            <div class="mt-2">
              <a id="barcode-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                다운로드
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- QR Scanner -->
      <div id="qr-scan-tab" class="hidden tab-content">
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">이미지 파일에서 QR 코드를 스캔합니다.</p>
          <div>
            <label class="block text-sm font-medium mb-2">QR 이미지 업로드</label>
            <input type="file" id="qr-image-input" accept="image/*" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
          <div id="qr-scan-result" class="hidden p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p class="font-medium mb-2">스캔 결과:</p>
            <p id="qr-scanned-text" class="break-all"></p>
          </div>
        </div>
      </div>

      <!-- Barcode Scanner -->
      <div id="barcode-scan-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">이미지 파일에서 바코드를 스캔합니다. (EAN, UPC, Code 128, Code 39 지원)</p>
          <div>
            <label class="block text-sm font-medium mb-2">바코드 이미지 업로드</label>
            <input type="file" id="barcode-image-input" accept="image/*" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
          <div id="barcode-scan-result" class="hidden p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p class="font-medium mb-2">스캔 결과:</p>
            <p id="barcode-scanned-text" class="break-all"></p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">형식: <span id="barcode-format"></span></p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Tab switching
  const setupTab = (tabBtn, tabContent) => {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabBtn.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('border-blue-600', 'text-blue-600'));
      tabBtn.classList.add('border-blue-600', 'text-blue-600');
      contents.forEach(c => c.classList.add('hidden'));
      tabContent.classList.remove('hidden');
    });
  };

  setupTab(document.getElementById('qr-tab'), document.getElementById('qr-generator-tab'));
  setupTab(document.getElementById('barcode-tab'), document.getElementById('barcode-generator-tab'));
  setupTab(document.getElementById('scan-tab'), document.getElementById('qr-scan-tab'));
  setupTab(document.getElementById('barcode-scan-tab'), document.getElementById('barcode-scan-tab-content'));

  // QR Code Generation
  document.getElementById('qr-generate-btn').addEventListener('click', () => {
    const text = document.getElementById('qr-text').value;
    const size = parseInt(document.getElementById('qr-size').value);
    const color = document.getElementById('qr-color').value;

    if (!text) {
      showToast('텍스트 또는 URL을 입력해주세요.', 'error');
      return;
    }

    // Use QRCode.js library
    loadScript('https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js', () => {
      const canvas = document.getElementById('qr-canvas');
      const container = document.getElementById('qr-code-container');
      
      // Clear previous
      canvas.width = size;
      canvas.height = size;
      
      // @ts-ignore
      QRCode.toCanvas(canvas, text, {
        width: size,
        height: size,
        color: {
          dark: color,
          light: '#ffffff'
        }
      }, (error) => {
        if (error) {
          console.error('QR generation error:', error);
          showToast('QR 생성 실패', 'error');
          return;
        }
        
        container.classList.remove('hidden');
        const downloadLink = document.getElementById('qr-download');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = 'qr-code.png';
        showToast('QR 코드 생성 완료!', 'success');
      });
    });
  });

  // Barcode Generation
  document.getElementById('barcode-generate-btn').addEventListener('click', () => {
    const text = document.getElementById('barcode-text').value;
    
    if (!text || !/^\d+$/.test(text)) {
      showToast('숫자만 입력해주세요.', 'error');
      return;
    }

    loadScript('https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js', () => {
      const svg = document.getElementById('barcode-svg');
      const container = document.getElementById('barcode-container');
      
      svg.innerHTML = '';
      const barcode = document.createElement('img');
      svg.appendChild(barcode);
      
      // @ts-ignore
      JsBarcode(barcode, text, {
        format: 'EAN13',
        width: 2,
        height: 100,
        displayValue: true
      });

      container.classList.remove('hidden');
      showToast('Barcode 생성 완료!', 'success');
    });
  });

  // QR Scanner
  document.getElementById('qr-image-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    loadScript('https://cdn.jsdelivr.net/npm/qr-scanner@1.4.2/build/qr-scanner.min.js', () => {
      // @ts-ignore
      const html5Qrcode = new Html5Qrcode("qr-scanner");
      
      html5Qrcode.scanFile(file).then(decoded => {
        document.getElementById('qr-scanned-text').textContent = decoded;
        document.getElementById('qr-scan-result').classList.remove('hidden');
        showToast('스캔 완료!', 'success');
      }).catch(err => {
        console.error('QR scan error:', err);
        showToast('QR 스캔 실패. 선명한 이미지를 사용해주세요.', 'error');
      });
    });
  });

  // Barcode Scanner
  document.getElementById('barcode-image-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    loadScript('https://cdn.jsdelivr.net/npm/qr-scanner@1.4.2/build/qr-scanner.min.js', () => {
      // @ts-ignore
      const html5QrCodeInstance = new Html5Qrcode("barcode-scanner");
      
      // @ts-ignore
      html5QrCodeInstance.scanFile(file).then(decoded => {
        document.getElementById('barcode-scanned-text').textContent = decoded.barcodes?.[0]?.getDisplayValue() || decoded;
        document.getElementById('barcode-format').textContent = decoded.barcodes?.[0]?.format || 'Unknown';
        document.getElementById('barcode-scan-result').classList.remove('hidden');
        showToast('바코드 스캔 완료!', 'success');
      }).catch(err => {
        console.error('Barcode scan error:', err);
        showToast('바코드 스캔 실패. 선명한 이미지를 사용해주세요.', 'error');
      });
    });
  });
};
