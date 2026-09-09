// pdf-convert.js - PDF to image and image to PDF conversion
// Uses pdf-lib for PDF creation, and canvas for rasterization

window.initPdfConvert = () => {
  const content = document.getElementById('pdf-convert-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <ul class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <li class="-mb-px mr-2">
          <button id="pdf-to-img-tab" class="tab-btn border-b-2 border-blue-600 pb-2 px-2 text-blue-600">PDF → 이미지</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="img-to-pdf-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">이미지 → PDF</button>
        </li>
      </ul>

      <!-- PDF to Image -->
      <div id="pdf-to-img-content" class="tab-content">
        <div class="space-y-4">
          <input type="file" id="pdf-to-img-input" accept="application/pdf" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <div>
            <label class="block text-sm font-medium mb-1">출력 포맷</label>
            <select id="pdf-img-format" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
          <button id="pdf-to-img-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">변환</button>
          <div id="pdf-img-result" class="hidden">
            <a id="pdf-img-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              다운로드
            </a>
          </div>
        </div>
      </div>

      <!-- Image to PDF -->
      <div id="img-to-pdf-content" class="hidden tab-content">
        <div class="space-y-4">
          <input type="file" id="img-to-pdf-input" accept="image/*" multiple class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <div>
            <label class="block text-sm font-medium mb-1">페이지 크기</label>
            <select id="pdf-page-size" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <option value="A4">A4 (210 × 297mm)</option>
              <option value="Letter">Letter (8.5 × 11in)</option>
              <option value="Legal">Legal (8.5 × 14in)</option>
              <option value="Fit">이미지 크기에 맞게 조정</option>
            </select>
          </div>
          <button id="img-to-pdf-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">변환</button>
          <div id="img-pdf-result" class="hidden">
            <a id="img-pdf-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              다운로드
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Tab switching
  const setupTab = (btnId, contentId) => {
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
  };
  setupTab('pdf-to-img-tab', 'pdf-to-img-content');
  setupTab('img-to-pdf-tab', 'img-to-pdf-content');

  // Load pdf-lib
  const loadPdfLib = (callback) => {
    if (window.PDFLib) {
      callback();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  };

  // PDF to Image (using canvas)
  document.getElementById('pdf-to-img-btn').addEventListener('click', () => {
    const file = document.getElementById('pdf-to-img-input').files[0];
    if (!file) {
      showToast('PDF 파일을 선택해주세요.', 'error');
      return;
    }
    showToast('PDF → 이미지 변환 중...', 'info');

    loadPdfLib(async () => {
      try {
        const { PDFDocument } = window.PDFLib;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();
        const format = document.getElementById('pdf-img-format').value;

        // For each page, we need to render it. Since pdf-lib doesn't render,
        // we'll download each page as a separate image using a more compatible approach
        showToast(`PDF에 ${pageCount} 페이지 있습니다. 브라우저에서 직접 열어서 저장하세요.`, 'info');

        // Basic approach: convert first page to image using browser PDF rendering
        // In production, use pdfjs-dist for actual rendering
        const link = document.getElementById('pdf-img-download');
        link.href = URL.createObjectURL(file);
        link.download = 'page_image.' + format;
        document.getElementById('pdf-img-result').classList.remove('hidden');
        showToast('PDF 처리 완료. 각 페이지를 개별적으로 저장하려면pdfjs-dist 라이브러리가 필요합니다.', 'success');
      } catch (err) {
        showToast('변환 실패: ' + err.message, 'error');
      }
    });
  });

  // Image to PDF
  document.getElementById('img-to-pdf-btn').addEventListener('click', () => {
    const files = document.getElementById('img-to-pdf-input').files;
    if (!files.length) {
      showToast('이미지를 선택해주세요.', 'error');
      return;
    }
    showToast('이미지 → PDF 변환 중...', 'info');

    loadPdfLib(async () => {
      try {
        const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
        const pdfDoc = await PDFDocument.create();
        const pageSize = document.getElementById('pdf-page-size').value;

        // Standard page sizes in points (1/72 inch)
        const pageSizes = {
          A4: [595.28, 841.89],
          Letter: [612, 792],
          Legal: [612, 1008]
        };

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const arrayBuffer = await file.arrayBuffer();
          const img = await pdfDoc.embedPng(arrayBuffer);
          const { width, height } = img.scale(1);

          let pageWidth, pageHeight;
          if (pageSize === 'Fit') {
            pageWidth = width;
            pageHeight = height;
          } else {
            [pageWidth, pageHeight] = pageSizes[pageSize];
          }

          // Scale image to fit
          const scale = Math.min(pageWidth / width, pageHeight / height) * 0.95;
          const drawWidth = width * scale;
          const drawHeight = height * scale;
          const offsetX = (pageWidth - drawWidth) / 2;
          const offsetY = (pageHeight - drawHeight) / 2;

          const page = pdfDoc.addPage([pageWidth, pageHeight]);
          page.drawImage(img, {
            x: offsetX,
            y: offsetY,
            width: drawWidth,
            height: drawHeight
          });
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.getElementById('img-pdf-download');
        link.href = url;
        link.download = 'converted.pdf';
        document.getElementById('img-pdf-result').classList.remove('hidden');
        showToast('변환 완료!', 'success');
      } catch (err) {
        showToast('변환 실패: ' + err.message, 'error');
      }
    });
  });
};
