// media-tools.js - Media Converter tools (video/audio conversion)

const initMediaTools = () => {
  const content = document.getElementById('media-tools-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p class="text-sm text-yellow-800 dark:text-yellow-200">
          ⚠️ 미디어 변환은 브라우저에서 직접 처리되므로 처리 시간이 다소 소요됩니다.
        </p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">파일 선택 (MP4, MOV, AVI, MP3, WAV, AAC, FLAC)</label>
        <input type="file" id="media-input" accept="video/*,audio/*,audio/aac,audio/flac" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">출력 포맷</label>
        <select id="media-output-format" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
          <option value="mp3">MP3 (Audio)</option>
          <option value="wav">WAV (Audio)</option>
          <option value="aac">AAC (Audio)</option>
          <option value="flac">FLAC (Audio - 무손실)</option>
          <option value="mp4">MP4 (Video)</option>
        </select>
      </div>

      <button id="media-process-btn" class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
        변환 시작
      </button>

      <div id="media-progress" class="hidden">
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div id="progress-bar" class="bg-purple-600 h-2 rounded-full" style="width: 0%"></div>
        </div>
        <p id="progress-text" class="text-sm text-center mt-2">처리 중...</p>
      </div>

      <div id="media-result" class="hidden">
        <a id="media-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          결과 다운로드
        </a>
      </div>
    </div>
  `;

  const processBtn = document.getElementById('media-process-btn');
  const mediaInput = document.getElementById('media-input');
  const progressDiv = document.getElementById('media-progress');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const resultDiv = document.getElementById('media-result');
  const downloadLink = document.getElementById('media-download');

  processBtn.addEventListener('click', async () => {
    const file = mediaInput.files[0];
    if (!file) {
      showToast('파일을 선택해주세요.', 'error');
      return;
    }

    showToast('FFmpeg.wasm 로드 중...', 'info');
    progressDiv.classList.remove('hidden');
    progressText.textContent = '라이브러리 초기화 중...';

    try {
      // Dynamically load FFmpeg.wasm
      await loadFfmpeg();

      // @ts-ignore
      const { createFFmpeg, fetchFile } = FFmpeg;
      const ffmpeg = createFFmpeg({ log: true });

      progressText.textContent = '파일 로드 중...';
      const data = await fetchFile(file);
      ffmpeg.FS('writebuffer', file.name, data);

      const outputFile = file.name.replace(/\\.[^/.]+$/, '') + '.' + document.getElementById('media-output-format').value;
      const outputFormat = document.getElementById('media-output-format').value;
      
      progressText.textContent = '변환 중... (브라우저에서 직접 처리)';
      const mimeTypes = {
        'mp3': 'audio/mpeg',
        'wav': 'audio/wav',
        'aac': 'audio/aac',
        'flac': 'audio/flac',
        'mp4': 'video/mp4'
      };

      let ffmpegArgs;
      if (outputFormat === 'mp4') {
        ffmpegArgs = ['-i', file.name, '-c:v', 'libx264', '-c:a', 'aac', outputFile];
      } else if (outputFormat === 'aac') {
        ffmpegArgs = ['-i', file.name, '-vn', '-c:a', 'aac', '-b:a', '128k', outputFile];
      } else if (outputFormat === 'flac') {
        ffmpegArgs = ['-i', file.name, '-vn', '-c:a', 'flac', outputFile];
      } else {
        ffmpegArgs = ['-i', file.name, '-vn', '-ar', '44100', '-ac', '2', '-b:a', '128k', '-f', outputFormat, outputFile];
      }

      await ffmpeg.run(...ffmpegArgs);

      progressText.textContent = '결과 처리 중...';
      const dataOut = ffmpeg.FS('readFile', outputFile);
      const blob = new Blob([dataOut.buffer], { type: mimeTypes[outputFormat] || 'application/octet-stream' });
      const url = URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.download = outputFile;
      resultDiv.classList.remove('hidden');
      progressDiv.classList.add('hidden');

      showToast('변환 완료!', 'success');
    } catch (err) {
      console.error('Media conversion error:', err);
      progressText.textContent = '오류 발생: ' + (err.message || '알 수 없는 오류');
      showToast('변환 실패. 대형 파일은 다른 도구를 사용해 주세요.', 'error');
    }
  });

  // Helper to load FFmpeg.wasm script
  function loadFfmpeg() {
    if (window.FFmpeg) return Promise.resolve();
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/ffmpeg.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('FFmpeg.wasm 로드 실패'));
      document.head.appendChild(script);
    });
  }
};
