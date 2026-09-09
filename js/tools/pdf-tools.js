// pdf-tools.js - PDF processing tools (merge, split, compress, convert)

window.initPdfTools = () => {
  const content = document.getElementById('pdf-tools-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
        PDF 도구는 pdf-lib를 사용하여 브라우저에서 처리됩니다. 파일은 서버로 전송되지 않습니다.
      </p>

      <!-- Merge PDFs -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 class="font-medium text-lg mb-3">PDF 병합</h3>
        <input type="file" id="merge-input" accept="application/pdf" multiple class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
        <button id="merge-btn" class="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">병합하기</button>
      </div>

      <!-- Split PDF -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 class="font-medium text-lg mb-3">PDF 분할</h3>
        <input type="file" id="split-input" accept="application/pdf" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
        <button id="split-btn" class="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">분할하기</button>
      </div>

      <!-- Compress PDF -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 class="font-medium text-lg mb-3">PDF 압축</h3>
        <input type="file" id="compress-input" accept="application/pdf" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
        <button id="compress-btn" class="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">압축하기</button>
      </div>

      <!-- Page Management -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 class="font-medium text-lg mb-3">페이지 관리</h3>
        <input type="file" id="page-input" accept="application/pdf" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 mb-2" />
        <div class="space-y-2 mb-3">
          <input type="number" id="page-number" placeholder="페이지 번호 (1부터)" min="1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <select id="page-action" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
            <option value="delete">페이지 삭제</option>
            <option value="rotate">페이지 회전</option>
            <option value="add-number">페이지 번호 추가</option>
          </select>
        </div>
        <button id="page-action-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">실행</button>
      </div>

      <!-- Password Protection -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 class="font-medium text-lg mb-3">PDF 비밀번호</h3>
        <input type="file" id="password-input" accept="application/pdf" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 mb-2" />
        <div class="space-y-2 mb-3">
          <input type="password" id="pdf-password" placeholder="새 비밀번호 입력" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <select id="password-action" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
            <option value="encrypt">비밀번호 설정</option>
            <option value="decrypt">비밀번호 해제</option>
          </select>
          <input type="password" id="pdf-current-password" placeholder="현재 비밀번호 (해제 시 입력)" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
        </div>
        <button id="password-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">실행</button>
      </div>

      <!-- Result -->
      <div id="pdf-result-section" class="hidden">
        <h3 class="font-medium text-lg mb-2">결과</h3>
        <a id="pdf-download-link" class="inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
          다운로드
        </a>
      </div>
    </div>
  `;

  // Load pdf-lib dynamically (external library)
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

  const mergeBtn = document.getElementById('merge-btn');
  const splitBtn = document.getElementById('split-btn');
  const compressBtn = document.getElementById('compress-btn');
  const mergeInput = document.getElementById('merge-input');
  const splitInput = document.getElementById('split-input');
  const compressInput = document.getElementById('compress-input');
  const pageInput = document.getElementById('page-input');
  const pageNumber = document.getElementById('page-number');
  const pageAction = document.getElementById('page-action');
  const pageActionBtn = document.getElementById('page-action-btn');
  const passwordInput = document.getElementById('password-input');
  const pdfPassword = document.getElementById('pdf-password');
  const pdfCurrentPassword = document.getElementById('pdf-current-password');
  const passwordAction = document.getElementById('password-action');
  const passwordBtn = document.getElementById('password-btn');
  const resultSection = document.getElementById('pdf-result-section');
  const downloadLink = document.getElementById('pdf-download-link');

  // Merge PDFs
  mergeBtn.addEventListener('click', () => {
    const files = mergeInput.files;
    if (files.length < 2) {
      showToast('2개 이상의 PDF를 선택해주세요.', 'error');
      return;
    }

    showToast('PDF 병합 중...', 'info');
    loadPdfLib(async () => {
      try {
        const { PDFDocument } = window.PDFLib;
        const mergedPdf = await PDFDocument.create();

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach(page => mergedPdf.addPage(page));
        }

        const pdfBytes = await mergedPdf.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'merged.pdf';
        resultSection.classList.remove('hidden');
        showToast('병합 완료!', 'success');
      } catch (err) {
        console.error(err);
        showToast('병합 실패. 파일 형식을 확인해주세요.', 'error');
      }
    });
  });

  // Split PDF (simple - extract all pages as individual)
  splitBtn.addEventListener('click', () => {
    const file = splitInput.files[0];
    if (!file) {
      showToast('PDF 파일을 선택해주세요.', 'error');
      return;
    }

    showToast('PDF 분할 중...', 'info');
    loadPdfLib(async () => {
      try {
        const { PDFDocument } = window.PDFLib;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();

        // Download each page as separate PDF
        let downloaded = 0;
        for (let i = 0; i < pageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(pdf, [i]);
          newPdf.addPage(page);
          const pdfBytes = await newPdf.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `page_${i + 1}.pdf`;
          a.click();
          URL.revokeObjectURL(url);
          downloaded++;
        }

        showToast(`${downloaded}개 페이지 분할 완료!`, 'success');
      } catch (err) {
        console.error(err);
        showToast('분할 실패.', 'error');
      }
    });
  });

  // Compress PDF (simple - reduce quality)
  compressBtn.addEventListener('click', () => {
    const file = compressInput.files[0];
    if (!file) {
      showToast('PDF 파일을 선택해주세요.', 'error');
      return;
    }

    showToast('PDF 압축 중...', 'info');
    loadPdfLib(async () => {
      try {
        const { PDFDocument } = window.PDFLib;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);

        // Re-save to compress
        const pdfBytes = await pdf.save({
          compress: true,
          useObjectStreams: true
        });

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'compressed.pdf';
        resultSection.classList.remove('hidden');
        showToast('압축 완료!', 'success');
      } catch (err) {
        console.error(err);
        showToast('압축 실패.', 'error');
      }
    });
  });

  // Page Management (delete or rotate)
  pageActionBtn.addEventListener('click', () => {
    const file = pageInput.files[0];
    if (!file) {
      showToast('PDF 파일을 선택해주세요.', 'error');
      return;
    }

    const pageNum = parseInt(pageNumber.value);
    if (!pageNum || pageNum < 1) {
      showToast('유효한 페이지 번호를 입력해주세요.', 'error');
      return;
    }

    const action = pageAction.value;
    showToast(`${action === 'delete' ? '삭제' : '회전'} 중...`, 'info');
    
    loadPdfLib(async () => {
      try {
        const { PDFDocument } = window.PDFLib;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();
        
        if (pageNum > pageCount) {
          showToast(`총 ${pageCount}페이지입니다.`, 'error');
          return;
        }

        if (action === 'delete') {
          pdf.removePage(pageNum - 1);
          const pdfBytes = await pdf.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          downloadLink.href = url;
          downloadLink.download = 'page_deleted.pdf';
          showToast('페이지 삭제 완료!', 'success');
        } else if (action === 'rotate') {
          const page = pdf.getPage(pageNum - 1);
          page.setRotation(page.getRotation() + 90);
          const pdfBytes = await pdf.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          downloadLink.href = url;
          downloadLink.download = 'page_rotated.pdf';
          showToast('페이지 회전 완료!', 'success');
        } else if (action === 'add-number') {
          const pages = pdf.getPages();
          pages.forEach((page, index) => {
            const { width, height } = page.getSize();
            page.drawText(String(index + 1), {
              x: width / 2 - 10,
              y: 20,
              size: 12,
              color: { r: 0.5, g: 0.5, b: 0.5 }
            });
          });
          const pdfBytes = await pdf.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          downloadLink.href = url;
          downloadLink.download = 'page_numbered.pdf';
          showToast('페이지 번호 추가 완료!', 'success');
        }
        
        resultSection.classList.remove('hidden');
      } catch (err) {
        console.error(err);
        showToast('페이지 처리 실패.', 'error');
      }
    });
  });

  // Password Protection (encrypt/decrypt)
  passwordBtn.addEventListener('click', () => {
    const file = passwordInput.files[0];
    if (!file) {
      showToast('PDF 파일을 선택해주세요.', 'error');
      return;
    }

    const password = pdfPassword.value;
    const currentPassword = pdfCurrentPassword.value;
    const action = passwordAction.value;

    if (action === 'encrypt' && !password) {
      showToast('새 비밀번호를 입력해주세요.', 'error');
      return;
    }

    if (action === 'decrypt' && !currentPassword) {
      showToast('현재 비밀번호를 입력해주세요.', 'error');
      return;
    }

    showToast(`${action === 'encrypt' ? '비밀번호 설정' : '비밀번호 해제'} 중...`, 'info');
    
    loadPdfLib(async () => {
      try {
        const { PDFDocument } = window.PDFLib;
        const arrayBuffer = await file.arrayBuffer();
        
        let pdf;
        if (action === 'decrypt') {
          pdf = await PDFDocument.load(arrayBuffer, { password: currentPassword });
        } else {
          pdf = await PDFDocument.load(arrayBuffer);
        }

        const pdfBytes = await pdf.save({
          encrypt: password,
          ownerPassword: password
        });

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = action === 'encrypt' ? 'password_protected.pdf' : 'password_removed.pdf';
        showToast(action === 'encrypt' ? '비밀번호 설정 완료!' : '비밀번호 해제 완료!', 'success');
        resultSection.classList.remove('hidden');
      } catch (err) {
        console.error(err);
        showToast('비밀번호 처리 실패. 비밀번호가 올바른지 확인해주세요.', 'error');
      }
    });
  });
};
