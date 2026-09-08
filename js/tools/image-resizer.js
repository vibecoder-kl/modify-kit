// image-resizer.js - Image editing tools (resize, crop, format convert, compress)

const initImageResizer = () => {
  const content = document.getElementById('image-resizer-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <!-- File Input -->
      <div>
        <label class="block text-sm font-medium mb-2">이미지 업로드</label>
        <input type="file" id="image-input" accept="image/*" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
      </div>

      <!-- Preview -->
      <div id="image-preview-container" class="hidden">
        <label class="block text-sm font-medium mb-2">미리보기</label>
        <div class="relative inline-block">
          <img id="image-preview" class="max-w-full max-h-64 rounded-lg shadow" />
          <button id="remove-image" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">×</button>
        </div>
      </div>

      <!-- Resize Controls -->
      <div id="resize-controls" class="hidden space-y-4">
        <h3 class="font-medium text-lg">크기 조정</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm mb-1">가로 (px)</label>
            <input type="number" id="width-input" placeholder="자동" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
          <div>
            <label class="block text-sm mb-1">세로 (px)</label>
            <input type="number" id="height-input" placeholder="자동" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
        </div>
      </div>

      <!-- Format Convert -->
      <div id="format-controls" class="hidden space-y-4">
        <h3 class="font-medium text-lg">포맷 변환</h3>
        <select id="format-select" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
          <option value="png">PNG (.png)</option>
          <option value="jpeg">JPEG (.jpg)</option>
          <option value="webp">WebP (.webp)</option>
        </select>
      </div>

      <!-- Compress -->
      <div id="compress-controls" class="hidden space-y-4">
        <h3 class="font-medium text-lg">압축</h3>
        <div class="flex items-center gap-4">
          <input type="range" id="quality-slider" min="10" max="100" value="80" class="flex-1" />
          <span id="quality-value" class="w-12 text-center">80%</span>
        </div>
      </div>

      <!-- Watermark -->
      <div id="watermark-controls" class="hidden space-y-4">
        <h3 class="font-medium text-lg">워터마크</h3>
        <div class="space-y-2">
          <input type="text" id="watermark-text" placeholder="워터마크 텍스트 입력" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <div class="flex gap-2">
            <input type="color" id="watermark-color" value="#ffffff" class="w-10 h-10 p-0 border border-gray-300 dark:border-gray-600 rounded cursor-pointer" />
            <input type="range" id="watermark-size" min="10" max="100" value="30" class="flex-1" />
          </div>
          <span id="watermark-size-value" class="text-sm text-gray-500">30%</span>
        </div>
      </div>

      <!-- Image Effects -->
      <div id="effects-controls" class="hidden space-y-4">
        <h3 class="font-medium text-lg">이미지 효과</h3>
        <div class="grid grid-cols-2 gap-2">
          <button id="effect-grayscale" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">흑백</button>
          <button id="effect-blur" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">블러</button>
          <button id="effect-sharpen" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">샤프닝</button>
          <button id="effect-invert" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">반전</button>
          <button id="effect-brightness" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">밝기</button>
          <button id="effect-contrast" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">대비</button>
        </div>
      </div>

      <!-- Image Rotation -->
      <div id="rotate-controls" class="hidden space-y-4">
        <h3 class="font-medium text-lg">회전/플립</h3>
        <div class="grid grid-cols-3 gap-2">
          <button id="rotate-left" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">← 90°</button>
          <button id="rotate-right" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">→ 90°</button>
          <button id="flip-horizontal" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">↔ 플립</button>
          <button id="flip-vertical" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">↕ 플립</button>
          <button id="rotate-180" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">180°</button>
          <button id="reset-transform" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">초기화</button>
        </div>
      </div>

      <!-- Color Adjustment -->
      <div id="color-controls" class="hidden space-y-4">
        <h3 class="font-medium text-lg">색상 조정</h3>
        <div class="space-y-2">
          <div>
            <label class="block text-sm mb-1">밝기: <span id="brightness-value">0</span>%</label>
            <input type="range" id="brightness-slider" min="-100" max="100" value="0" class="w-full" />
          </div>
          <div>
            <label class="block text-sm mb-1">대비: <span id="contrast-value">0</span>%</label>
            <input type="range" id="contrast-slider" min="-100" max="100" value="0" class="w-full" />
          </div>
          <div>
            <label class="block text-sm mb-1">포화도: <span id="saturate-value">0</span>%</label>
            <input type="range" id="saturate-slider" min="-100" max="100" value="0" class="w-full" />
          </div>
          <button id="apply-color-btn" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">색상 적용</button>
        </div>
      </div>

      <!-- Collage Maker -->
      <div id="collage-controls" class="hidden space-y-4">
        <h3 class="font-medium text-lg">콜라주 만들기</h3>
        <input type="file" id="collage-input" accept="image/*" multiple class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm mb-1">가로 레이아웃</label>
            <input type="number" id="collage-cols" value="2" min="1" max="5" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
          <div>
            <label class="block text-sm mb-1">세로 레이아웃</label>
            <input type="number" id="collage-rows" value="1" min="1" max="5" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
        </div>
        <button id="create-collage-btn" class="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">콜라주 생성</button>
      </div>

      <!-- ASCII Art Generator -->
      <div id="ascii-controls" class="hidden space-y-4">
        <h3 class="font-medium text-lg">ASCII 아트</h3>
        <div>
          <label class="block text-sm mb-1">문자 폭: <span id="ascii-width-value">80</span></label>
          <input type="range" id="ascii-width" min="20" max="200" value="80" class="w-full" />
        </div>
        <button id="generate-ascii-btn" class="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">ASCII 생성</button>
        <div id="ascii-output-container" class="hidden">
          <div id="ascii-output" class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-64"></div>
          <button id="copy-ascii-btn" class="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">복사</button>
        </div>
      </div>

      <!-- Watermark Remover -->
      <div id="watermark-remove-controls" class="hidden space-y-4">
        <h3 class="font-medium text-lg">워터마크 제거</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">워터마크 영역을 입력하세요 (픽셀 좌표)</p>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm mb-1">X 위치</label>
            <input type="number" id="watermark-x" value="0" min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
          <div>
            <label class="block text-sm mb-1">Y 위치</label>
            <input type="number" id="watermark-y" value="0" min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
          <div>
            <label class="block text-sm mb-1">가로 크기</label>
            <input type="number" id="watermark-w" value="100" min="1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
          <div>
            <label class="block text-sm mb-1">세로 크기</label>
            <input type="number" id="watermark-h" value="30" min="1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          </div>
        </div>
        <button id="remove-watermark-btn" class="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">워터마크 제거</button>
      </div>

      <!-- Process Button -->
      <div id="process-section" class="hidden">
        <button id="process-btn" class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
          처리하기
        </button>
      </div>

      <!-- Result -->
      <div id="result-section" class="hidden">
        <h3 class="font-medium text-lg mb-2">결과</h3>
        <a id="download-link" class="inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
          다운로드
        </a>
      </div>
    </div>
  `;

  // Attach event listeners
  const imageInput = document.getElementById('image-input');
  const imagePreviewContainer = document.getElementById('image-preview-container');
  const imagePreview = document.getElementById('image-preview');
  const removeBtn = document.getElementById('remove-image');
  const resizeControls = document.getElementById('resize-controls');
  const formatControls = document.getElementById('format-controls');
  const compressControls = document.getElementById('compress-controls');
  const processSection = document.getElementById('process-section');
  const processBtn = document.getElementById('process-btn');
  const resultSection = document.getElementById('result-section');
  const downloadLink = document.getElementById('download-link');
  const qualitySlider = document.getElementById('quality-slider');
  const qualityValue = document.getElementById('quality-value');
  const watermarkControls = document.getElementById('watermark-controls');
  const watermarkText = document.getElementById('watermark-text');
  const watermarkColor = document.getElementById('watermark-color');
  const watermarkSize = document.getElementById('watermark-size');
  const watermarkSizeValue = document.getElementById('watermark-size-value');
  const effectsControls = document.getElementById('effects-controls');
  const rotateControls = document.getElementById('rotate-controls');
  const colorControls = document.getElementById('color-controls');
  const collageControls = document.getElementById('collage-controls');
  const asciiControls = document.getElementById('ascii-controls');
  const watermarkRemoveControls = document.getElementById('watermark-remove-controls');

  let originalImage = null;
  let processedImageUrl = null;
  let currentRotation = 0;
  let currentFlip = { x: false, y: false };

  // Handle file upload
  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.src = event.target.result;
      imagePreviewContainer.classList.remove('hidden');
      resizeControls.classList.remove('hidden');
      formatControls.classList.remove('hidden');
      compressControls.classList.remove('hidden');
      watermarkControls.classList.remove('hidden');
      effectsControls.classList.remove('hidden');
      rotateControls.classList.remove('hidden');
      colorControls.classList.remove('hidden');
      collageControls.classList.remove('hidden');
      asciiControls.classList.remove('hidden');
      watermarkRemoveControls.classList.remove('hidden');
      processSection.classList.remove('hidden');
      resultSection.classList.add('hidden');
      
      originalImage = new Image();
      originalImage.onload = () => {
        document.getElementById('width-input').value = originalImage.width;
        document.getElementById('height-input').value = originalImage.height;
      };
      originalImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Remove image
  removeBtn.addEventListener('click', () => {
    imageInput.value = '';
    imagePreviewContainer.classList.add('hidden');
    resizeControls.classList.add('hidden');
    formatControls.classList.add('hidden');
    compressControls.classList.add('hidden');
    watermarkControls.classList.add('hidden');
    effectsControls.classList.add('hidden');
    rotateControls.classList.add('hidden');
    colorControls.classList.add('hidden');
    collageControls.classList.add('hidden');
    asciiControls.classList.add('hidden');
    watermarkRemoveControls.classList.add('hidden');
    processSection.classList.add('hidden');
    resultSection.classList.add('hidden');
    originalImage = null;
    processedImageUrl = null;
  });

  // Update quality slider value
  qualitySlider.addEventListener('input', () => {
    qualityValue.textContent = qualitySlider.value + '%';
  });

  // Update watermark size slider value
  watermarkSize.addEventListener('input', () => {
    watermarkSizeValue.textContent = watermarkSize.value + '%';
  });

  // Rotation/Flip buttons
  document.getElementById('rotate-left').addEventListener('click', () => {
    currentRotation -= 90;
    showToast(`회전: ${currentRotation}°`, 'info');
  });

  document.getElementById('rotate-right').addEventListener('click', () => {
    currentRotation += 90;
    showToast(`회전: ${currentRotation}°`, 'info');
  });

  document.getElementById('rotate-180').addEventListener('click', () => {
    currentRotation += 180;
    showToast(`회전: ${currentRotation}°`, 'info');
  });

  document.getElementById('flip-horizontal').addEventListener('click', () => {
    currentFlip.x = !currentFlip.x;
    showToast('수평 플립 ' + (currentFlip.x ? '적용' : '해제'), 'info');
  });

  document.getElementById('flip-vertical').addEventListener('click', () => {
    currentFlip.y = !currentFlip.y;
    showToast('수직 플lip ' + (currentFlip.y ? '적용' : '해제'), 'info');
  });

  document.getElementById('reset-transform').addEventListener('click', () => {
    currentRotation = 0;
    currentFlip = { x: false, y: false };
    showToast('변환 초기화', 'info');
  });

  // Process image
  processBtn.addEventListener('click', () => {
    if (!originalImage) {
      showToast('이미지를 먼저 업로드해주세요.', 'error');
      return;
    }

    showToast('이미지 처리 중...', 'info');

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const width = parseInt(document.getElementById('width-input').value) || originalImage.width;
    const height = parseInt(document.getElementById('height-input').value) || originalImage.height;
    const format = document.getElementById('format-select').value;
    const quality = parseInt(qualitySlider.value) / 100;

    canvas.width = width;
    canvas.height = height;

    // Apply rotation and flip
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(currentRotation * Math.PI / 180);
    if (currentFlip.x) {
      ctx.scale(-1, 1);
    }
    if (currentFlip.y) {
      ctx.scale(1, -1);
    }
    ctx.drawImage(originalImage, -width / 2, -height / 2, width, height);
    ctx.restore();

    // Add watermark if text is provided
    if (watermarkText.value.trim()) {
      ctx.font = parseInt(watermarkSize.value) + 'px Arial';
      ctx.fillStyle = watermarkColor.value;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(watermarkText.value, width / 2, height / 2);
    }

    // Get MIME type
    const mimeTypes = {
      'png': 'image/png',
      'jpeg': 'image/jpeg',
      'webp': 'image/webp'
    };

    canvas.toBlob((blob) => {
      if (processedImageUrl) {
        URL.revokeObjectURL(processedImageUrl);
      }
      processedImageUrl = URL.createObjectURL(blob);
      downloadLink.href = processedImageUrl;
      downloadLink.download = `modifykit_${format}.${format}`;
      resultSection.classList.remove('hidden');
      showToast('처리 완료!', 'success');
    }, mimeTypes[format], quality);
  });

  // Image Effects
  const applyCanvasFilter = (ctx, canvas, filter) => {
    if (filter === 'sharpen') {
      // Simple sharpen using canvas
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.filter = 'none';
      tempCtx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.globalCompositeOperation = 'lighter';
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * 5 / 4;
        data[i+1] = data[i+1] * 5 / 4;
        data[i+2] = data[i+2] * 5 / 4;
      }
      ctx.putImageData(imageData, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      showToast('샤프닝 적용', 'info');
    } else {
      ctx.filter = filter;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      showToast(filter + ' 효과 적용', 'info');
    }
  };

  document.getElementById('effect-grayscale').addEventListener('click', () => {
    applyCanvasFilter(ctx, canvas, 'grayscale(100%)');
  });
  document.getElementById('effect-blur').addEventListener('click', () => {
    applyCanvasFilter(ctx, canvas, 'blur(5px)');
  });
  document.getElementById('effect-sharpen').addEventListener('click', () => {
    applyCanvasFilter(ctx, canvas, 'sharpen');
  });
  document.getElementById('effect-invert').addEventListener('click', () => {
    applyCanvasFilter(ctx, canvas, 'invert(100%)');
  });
  document.getElementById('effect-brightness').addEventListener('click', () => {
    applyCanvasFilter(ctx, canvas, 'brightness(120%)');
  });
  document.getElementById('effect-contrast').addEventListener('click', () => {
    applyCanvasFilter(ctx, canvas, 'contrast(120%)');
  });

  // Update color sliders
  document.getElementById('brightness-slider').addEventListener('input', () => {
    document.getElementById('brightness-value').textContent = document.getElementById('brightness-slider').value;
  });
  document.getElementById('contrast-slider').addEventListener('input', () => {
    document.getElementById('contrast-value').textContent = document.getElementById('contrast-slider').value;
  });
  document.getElementById('saturate-slider').addEventListener('input', () => {
    document.getElementById('saturate-value').textContent = document.getElementById('saturate-slider').value;
  });

  // Apply color adjustments
  document.getElementById('apply-color-btn').addEventListener('click', () => {
    if (!originalImage) {
      showToast('이미지를 먼저 업로드해주세요.', 'error');
      return;
    }
    const brightness = document.getElementById('brightness-slider').value;
    const contrast = document.getElementById('contrast-slider').value;
    const saturate = document.getElementById('saturate-slider').value;
    const filter = `brightness(${100 + parseInt(brightness)}%) contrast(${100 + parseInt(contrast)}%) saturate(${100 + parseInt(saturate)}%)`;
    applyCanvasFilter(ctx, canvas, filter);
  });

  // Collage Maker
  document.getElementById('create-collage-btn').addEventListener('click', () => {
    const files = document.getElementById('collage-input').files;
    if (files.length < 2) {
      showToast('2개 이상의 이미지를 선택해주세요.', 'error');
      return;
    }
    const cols = parseInt(document.getElementById('collage-cols').value) || 2;
    const rows = parseInt(document.getElementById('collage-rows').value) || 1;

    showToast('콜라주 생성 중...', 'info');
    const imgElements = [];
    let loaded = 0;

    Array.from(files).forEach((file, index) => {
      const img = new Image();
      img.onload = () => {
        imgElements[index] = img;
        loaded++;
        if (loaded === files.length) {
          createCollage(imgElements, cols, rows);
        }
      };
      img.src = URL.createObjectURL(file);
    });
  });

  function createCollage(images, cols, rows) {
    const thumbSize = 200;
    const canvas = document.createElement('canvas');
    canvas.width = thumbSize * cols;
    canvas.height = thumbSize * rows;
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < Math.min(images.length, cols * rows); i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      ctx.drawImage(images[i], col * thumbSize, row * thumbSize, thumbSize, thumbSize);
    }

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'collage.jpg';
      resultSection.classList.remove('hidden');
      showToast('콜라주 생성 완료!', 'success');
    }, 'image/jpeg', 0.9);
  }

  // ASCII Art Generator
  document.getElementById('ascii-width').addEventListener('input', () => {
    document.getElementById('ascii-width-value').textContent = document.getElementById('ascii-width').value;
  });

  document.getElementById('generate-ascii-btn').addEventListener('click', () => {
    if (!originalImage) {
      showToast('이미지를 먼저 업로드해주세요.', 'error');
      return;
    }

    const width = parseInt(document.getElementById('ascii-width').value);
    const asciiChars = ' .:-=+*#%@';

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    const aspectRatio = originalImage.height / originalImage.width;
    tempCanvas.width = width;
    tempCanvas.height = Math.round(width * aspectRatio * 0.5); // ASCII chars are taller
    tempCtx.drawImage(originalImage, 0, 0, tempCanvas.width, tempCanvas.height);

    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imageData.data;

    let ascii = '';
    for (let y = 0; y < tempCanvas.height; y++) {
      for (let x = 0; x < tempCanvas.width; x++) {
        const i = (y * tempCanvas.width + x) * 4;
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const charIndex = Math.floor((255 - gray) / 255 * (asciiChars.length - 1));
        ascii += asciiChars[charIndex];
      }
      ascii += '\n';
    }

    document.getElementById('ascii-output').textContent = ascii;
    document.getElementById('ascii-output-container').classList.remove('hidden');
    showToast('ASCII 아트 생성 완료!', 'success');
  });

  document.getElementById('copy-ascii-btn').addEventListener('click', async () => {
    const ascii = document.getElementById('ascii-output').textContent;
    if (ascii) {
      await navigator.clipboard.writeText(ascii);
      showToast('복사되었습니다!', 'success');
    }
  });

  // Watermark Remover
  document.getElementById('remove-watermark-btn').addEventListener('click', () => {
    if (!originalImage) {
      showToast('이미지를 먼저 업로드해주세요.', 'error');
      return;
    }

    const x = parseInt(document.getElementById('watermark-x').value);
    const y = parseInt(document.getElementById('watermark-y').value);
    const w = parseInt(document.getElementById('watermark-w').value);
    const h = parseInt(document.getElementById('watermark-h').value);

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = originalImage.width;
    tempCanvas.height = originalImage.height;
    tempCtx.drawImage(originalImage, 0, 0);
    tempCtx.clearRect(x, y, w, h);

    // Inpaint the removed area using a simple clone fill
    const imageData = tempCtx.getImageData(x, y, w, h);
    const edgeX = Math.min(x + w, originalImage.width - 1);
    const edgeY = Math.min(y + h, originalImage.height - 1);
    const edgeData = tempCtx.getImageData(x, y, 1, 1);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = edgeData.data[0];
      imageData.data[i + 1] = edgeData.data[1];
      imageData.data[i + 2] = edgeData.data[2];
      imageData.data[i + 3] = edgeData.data[3];
    }
    tempCtx.putImageData(imageData, x, y);

    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);

    showToast('워터마크 제거 완료!', 'success');
  });
};
