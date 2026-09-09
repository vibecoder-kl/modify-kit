// media-advanced.js - Advanced media processing tools
// (video trim, audio trim/merge, speed adjust, image slideshow to video)

window.initMediaAdvanced = () => {
  const content = document.getElementById('media-advanced-content');
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <ul class="flex border-b border-gray-200 dark:border-gray-700 mb-4 overflow-x-auto">
        <li class="-mb-px mr-2">
          <button id="audio-trim-tab" class="tab-btn border-b-2 border-blue-600 pb-2 px-2 text-blue-600">오디오 트림</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="audio-merge-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">오디오 머지</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="video-speed-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">영상 속도 조절</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="video-trim-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">영상 트림</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="audio-adjust-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">오디오 볼륨/피치</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="noise-reduce-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">노이즈 감소</button>
        </li>
        <li class="-mb-px mr-2">
          <button id="subtitle-tab" class="tab-btn border-b-2 border-transparent pb-2 px-2 hover:border-gray-300 dark:hover:border-gray-600">자막 추가</button>
        </li>
      </ul>
      <!-- Audio Trimmer -->
      <div id="audio-trim-tab-content" class="tab-content">
        <div class="space-y-4">
          <input type="file" id="audio-trim-input" accept="audio/*,audio/aac,audio/flac,audio/mp4,audio/wav" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">시작 시간 (초)</label>
              <input type="number" id="audio-trim-start" value="0" min="0" step="0.1" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">종료 시간 (초)</label>
              <input type="number" id="audio-trim-end" value="30" min="0" step="0.1" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
          </div>
          <button id="audio-trim-btn" class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">트림</button>
          <div id="audio-trim-progress" class="hidden">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div id="audio-trim-bar" class="bg-purple-600 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p id="audio-trim-text" class="text-sm text-center mt-2">처리 중...</p>
          </div>
          <div id="audio-trim-result" class="hidden">
            <a id="audio-trim-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              다운로드
            </a>
          </div>
        </div>
      </div>

      <!-- Audio Merger -->
      <div id="audio-merge-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <input type="file" id="audio-merge-input" accept="audio/*,audio/aac,audio/flac,audio/mp4,audio/wav" multiple class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <button id="audio-merge-btn" class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">머지</button>
          <div id="audio-merge-progress" class="hidden">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div id="audio-merge-bar" class="bg-purple-600 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p id="audio-merge-text" class="text-sm text-center mt-2">처리 중...</p>
          </div>
          <div id="audio-merge-result" class="hidden">
            <a id="audio-merge-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              다운로드
            </a>
          </div>
        </div>
      </div>

      <!-- Video Speed Changer -->
      <div id="video-speed-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <input type="file" id="video-speed-input" accept="video/*" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <div>
            <label class="block text-sm font-medium mb-2">속도: <span id="speed-value">1.5x</span></label>
            <input type="range" id="speed-slider" min="0.1" max="4" step="0.1" value="1.5" class="w-full" />
          </div>
          <button id="video-speed-btn" class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">변경</button>
          <div id="video-speed-progress" class="hidden">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div id="video-speed-bar" class="bg-purple-600 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p id="video-speed-text" class="text-sm text-center mt-2">처리 중...</p>
          </div>
          <div id="video-speed-result" class="hidden">
            <a id="video-speed-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              다운로드
            </a>
          </div>
        </div>
      </div>

      <!-- Video Trimmer -->
      <div id="video-trim-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <input type="file" id="video-trim-input" accept="video/*" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">시작 시간 (초)</label>
              <input type="number" id="video-trim-start" value="0" min="0" step="1" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">종료 시간 (초)</label>
              <input type="number" id="video-trim-end" value="10" min="0" step="1" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
          </div>
          <button id="video-trim-btn" class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">트림</button>
          <div id="video-trim-progress" class="hidden">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div id="video-trim-bar" class="bg-purple-600 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p id="video-trim-text" class="text-sm text-center mt-2">처리 중...</p>
          </div>
          <div id="video-trim-result" class="hidden">
            <a id="video-trim-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              다운로드
            </a>
          </div>
        </div>
      </div>

      <!-- Audio Volume/Pitch Adjuster -->
      <div id="audio-adjust-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <input type="file" id="audio-adjust-input" accept="audio/*,audio/aac,audio/flac,audio/mp4,audio/wav" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <div class="space-y-2">
            <div>
              <label class="block text-sm font-medium mb-1">볼륨: <span id="volume-value">100%</span></label>
              <input type="range" id="volume-slider" min="0" max="200" value="100" class="w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">피치: <span id="pitch-value">1.0x</span></label>
              <input type="range" id="pitch-slider" min="50" max="200" value="100" class="w-full" />
            </div>
          </div>
          <button id="audio-adjust-btn" class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">적용</button>
          <div id="audio-adjust-progress" class="hidden">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div id="audio-adjust-bar" class="bg-purple-600 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p id="audio-adjust-text" class="text-sm text-center mt-2">처리 중...</p>
          </div>
          <div id="audio-adjust-result" class="hidden">
            <a id="audio-adjust-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              다운로드
            </a>
          </div>
        </div>
      </div>

      <!-- Noise Reduction -->
      <div id="noise-reduce-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <input type="file" id="noise-input" accept="audio/*,audio/aac,audio/flac,audio/mp4,audio/wav" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <div class="space-y-2">
            <div>
              <label class="block text-sm font-medium mb-1">노이즈 크기: <span id="noise-value">0.5</span></label>
              <input type="range" id="noise-slider" min="1" max="10" step="1" value="5" class="w-full" />
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <p>값이 클수록 더 강한 노이즈 제거 효과 (음성 왜곡 가능성 높음)</p>
            </div>
          </div>
          <button id="noise-reduce-btn" class="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">노이즈 감소</button>
          <div id="noise-progress" class="hidden">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div id="noise-bar" class="bg-teal-600 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p id="noise-text" class="text-sm text-center mt-2">처리 중...</p>
          </div>
          <div id="noise-result" class="hidden">
            <a id="noise-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              다운로드
            </a>
          </div>
        </div>
      </div>

      <!-- Subtitle Adder -->
      <div id="subtitle-tab-content" class="hidden tab-content">
        <div class="space-y-4">
          <input type="file" id="subtitle-video-input" accept="video/*" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <input type="file" id="subtitle-file-input" accept=".srt,.vtt,.sub,.ass,.ssa" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <p>지원 포맷: SRT, VTT, SUB, ASS, SSA</p>
            <p>참고: 자막은 영상 스트림에 직접 하드코딩됩니다.</p>
          </div>
          <button id="subtitle-add-btn" class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">자막 추가</button>
          <div id="subtitle-progress" class="hidden">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div id="subtitle-bar" class="bg-purple-600 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p id="subtitle-text" class="text-sm text-center mt-2">처리 중...</p>
          </div>
          <div id="subtitle-result" class="hidden">
            <a id="subtitle-download" href="#" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
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
    const tabContent = document.getElementById(contentId);
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('border-blue-600', 'text-blue-600');
        b.classList.add('border-transparent');
      });
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
      btn.classList.add('border-blue-600', 'text-blue-600');
      tabContent.classList.remove('hidden');
    });
  };
  setupTab('audio-trim-tab', 'audio-trim-tab-content');
  setupTab('audio-merge-tab', 'audio-merge-tab-content');
  setupTab('video-speed-tab', 'video-speed-tab-content');
  setupTab('video-trim-tab', 'video-trim-tab-content');
  setupTab('audio-adjust-tab', 'audio-adjust-tab-content');
  setupTab('noise-reduce-tab', 'noise-reduce-tab-content');
  setupTab('subtitle-tab', 'subtitle-tab-content');

  // Speed slider update
  document.getElementById('speed-slider').addEventListener('input', () => {
    document.getElementById('speed-value').textContent = document.getElementById('speed-slider').value + 'x';
  });

  // FFmpeg loader
  const loadFfmpegAdvanced = () => {
    if (window.FFmpeg && window.FFmpeg.createFFmpeg) return Promise.resolve(window.FFmpeg);
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/ffmpeg.min.js';
      script.onload = () => resolve(window.FFmpeg);
      script.onerror = () => reject(new Error('FFmpeg.wasm 로드 실패'));
      document.head.appendChild(script);
    });
  };

  const fetchFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (file.type.startsWith('video/') || file.type.startsWith('audio/')) {
        reader.onload = () => resolve(new Uint8Array(reader.result));
      } else {
        reader.onload = () => resolve(new Uint8Array(reader.result));
      }
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Audio Trimmer
  document.getElementById('audio-trim-btn').addEventListener('click', async () => {
    const file = document.getElementById('audio-trim-input').files[0];
    if (!file) { showToast('오디오 파일을 선택해주세요.', 'error'); return; }
    const start = parseFloat(document.getElementById('audio-trim-start').value);
    const end = parseFloat(document.getElementById('audio-trim-end').value);
    if (start >= end) { showToast('시작 시간이 종료 시간보다 작아야 합니다.', 'error'); return; }

    showToast('FFmpeg.wasm 로드 중...', 'info');
    const progressDiv = document.getElementById('audio-trim-progress');
    const progressBar = document.getElementById('audio-trim-bar');
    const progressText = document.getElementById('audio-trim-text');
    const resultDiv = document.getElementById('audio-trim-result');
    const downloadLink = document.getElementById('audio-trim-download');

    progressDiv.classList.remove('hidden');
    try {
      const FFmpeg = await loadFfmpegAdvanced();
      const { createFFmpeg, fetchFile: ffFetchFile } = FFmpeg;
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      progressText.textContent = '파일 로드 중...';
      const data = await ffFetchFile(file);
      ffmpeg.FS('writebuffer', file.name, data);

      const ext = file.name.split('.').pop();
      const outputName = 'trimmed.' + ext;

      progressText.textContent = '트림 처리 중...';
      await ffmpeg.run(
        '-i', file.name,
        '-ss', String(start),
        '-t', String(end - start),
        '-acodec', 'copy',
        outputName
      );

      const dataOut = ffmpeg.FS('readFile', outputName);
      const blob = new Blob([dataOut.buffer], { type: file.type });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = outputName;
      resultDiv.classList.remove('hidden');
      progressBar.style.width = '100%';
      progressText.textContent = '완료!';
      showToast('오디오 트림 완료!', 'success');
      setTimeout(() => progressDiv.classList.add('hidden'), 2000);

      ffmpeg.FS('unlink', file.name);
      ffmpeg.FS('unlink', outputName);
    } catch (err) {
      console.error(err);
      showToast('처리 실패: ' + (err.message || '오류'), 'error');
      progressText.textContent = '오류 발생';
    }
  });

  // Audio Merger
  document.getElementById('audio-merge-btn').addEventListener('click', async () => {
    const files = document.getElementById('audio-merge-input').files;
    if (files.length < 2) { showToast('2개 이상의 오디오 파일을 선택해주세요.', 'error'); return; }

    showToast('FFmpeg.wasm 로드 중...', 'info');
    const progressDiv = document.getElementById('audio-merge-progress');
    const progressBar = document.getElementById('audio-merge-bar');
    const progressText = document.getElementById('audio-merge-text');
    const resultDiv = document.getElementById('audio-merge-result');
    const downloadLink = document.getElementById('audio-merge-download');

    progressDiv.classList.remove('hidden');
    try {
      const FFmpeg = await loadFfmpegAdvanced();
      const { createFFmpeg, fetchFile: ffFetchFile } = FFmpeg;
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      // Write all files and create a concat list
      const inputNames = [];
      for (let i = 0; i < files.length; i++) {
        const data = await ffFetchFile(files[i]);
        ffmpeg.FS('writebuffer', files[i].name, data);
        inputNames.push(files[i].name);
      }

      const listContent = inputNames.map(name => `file '${name}'`).join('\n');
      ffmpeg.FS('writeFile', 'list.txt', listContent);

      progressText.textContent = '머지 처리 중...';
      await ffmpeg.run('-f', 'concat', '-safe', '0', '-i', 'list.txt', '-c', 'copy', 'merged.mp3');

      const dataOut = ffmpeg.FS('readFile', 'merged.mp3');
      const blob = new Blob([dataOut.buffer], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'merged.mp3';
      resultDiv.classList.remove('hidden');
      progressBar.style.width = '100%';
      showToast('오디오 머지 완료!', 'success');
      setTimeout(() => progressDiv.classList.add('hidden'), 2000);

      ffmpeg.FS('unlink', 'list.txt');
      ffmpeg.FS('unlink', 'merged.mp3');
    } catch (err) {
      console.error(err);
      showToast('처리 실패: ' + (err.message || '오류'), 'error');
    }
  });

  // Video Speed Changer
  document.getElementById('video-speed-btn').addEventListener('click', async () => {
    const file = document.getElementById('video-speed-input').files[0];
    if (!file) { showToast('영상 파일을 선택해주세요.', 'error'); return; }
    const speed = parseFloat(document.getElementById('speed-slider').value);

    showToast('FFmpeg.wasm 로드 중...', 'info');
    const progressDiv = document.getElementById('video-speed-progress');
    const progressBar = document.getElementById('video-speed-bar');
    const progressText = document.getElementById('video-speed-text');
    const resultDiv = document.getElementById('video-speed-result');
    const downloadLink = document.getElementById('video-speed-download');

    progressDiv.classList.remove('hidden');
    try {
      const FFmpeg = await loadFfmpegAdvanced();
      const { createFFmpeg, fetchFile: ffFetchFile } = FFmpeg;
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      const data = await ffFetchFile(file);
      ffmpeg.FS('writebuffer', file.name, data);

      const ext = file.name.split('.').pop();
      const outputName = 'speed_' + speed + 'x.' + ext;

      progressText.textContent = `속도 변경 중... (${speed}x)`;
      ffmpeg.setProgress(({ ratio }) => {
        progressBar.style.width = `${Math.round(ratio * 100)}%`;
      });

      await ffmpeg.run(
        '-i', file.name,
        '-vf', `setpts=PTS/${speed}`,
        '-af', `atempo=${speed}`,
        outputName
      );

      const dataOut = ffmpeg.FS('readFile', outputName);
      const blob = new Blob([dataOut.buffer], { type: file.type });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = outputName;
      resultDiv.classList.remove('hidden');
      showToast('영상 속도 변경 완료!', 'success');

      ffmpeg.FS('unlink', file.name);
      ffmpeg.FS('unlink', outputName);
    } catch (err) {
      console.error(err);
      showToast('처리 실패: ' + (err.message || '오류'), 'error');
    } finally {
      setTimeout(() => progressDiv.classList.add('hidden'), 2000);
    }
  });

  // Video Trimmer
  document.getElementById('video-trim-btn').addEventListener('click', async () => {
    const file = document.getElementById('video-trim-input').files[0];
    if (!file) { showToast('영상 파일을 선택해주세요.', 'error'); return; }
    const start = parseFloat(document.getElementById('video-trim-start').value);
    const end = parseFloat(document.getElementById('video-trim-end').value);
    if (start >= end) { showToast('시작 시간이 종료 시간보다 작아야 합니다.', 'error'); return; }

    showToast('FFmpeg.wasm 로드 중...', 'info');
    const progressDiv = document.getElementById('video-trim-progress');
    const progressBar = document.getElementById('video-trim-bar');
    const progressText = document.getElementById('video-trim-text');
    const resultDiv = document.getElementById('video-trim-result');
    const downloadLink = document.getElementById('video-trim-download');

    progressDiv.classList.remove('hidden');
    try {
      const FFmpeg = await loadFfmpegAdvanced();
      const { createFFmpeg, fetchFile: ffFetchFile } = FFmpeg;
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      const data = await ffFetchFile(file);
      ffmpeg.FS('writebuffer', file.name, data);

      const ext = file.name.split('.').pop();
      const outputName = 'trimmed.' + ext;

      progressText.textContent = '트림 처리 중...';
      ffmpeg.setProgress(({ ratio }) => {
        progressBar.style.width = `${Math.round(ratio * 100)}%`;
      });

      await ffmpeg.run(
        '-i', file.name,
        '-ss', String(start),
        '-t', String(end - start),
        '-c', 'copy',
        outputName
      );

      const dataOut = ffmpeg.FS('readFile', outputName);
      const blob = new Blob([dataOut.buffer], { type: file.type });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = outputName;
      resultDiv.classList.remove('hidden');
      showToast('영상 트림 완료!', 'success');

      ffmpeg.FS('unlink', file.name);
      ffmpeg.FS('unlink', outputName);
    } catch (err) {
      console.error(err);
      showToast('처리 실패: ' + (err.message || '오류'), 'error');
    } finally {
      setTimeout(() => progressDiv.classList.add('hidden'), 2000);
    }
  });

  // Subtitle Adder
  document.getElementById('subtitle-add-btn').addEventListener('click', async () => {
    const videoFile = document.getElementById('subtitle-video-input').files[0];
    const subtitleFile = document.getElementById('subtitle-file-input').files[0];
    if (!videoFile) { showToast('영상 파일을 선택해주세요.', 'error'); return; }
    if (!subtitleFile) { showToast('자막 파일을 선택해주세요.', 'error'); return; }

    showToast('FFmpeg.wasm 로드 중...', 'info');
    const progressDiv = document.getElementById('subtitle-progress');
    const progressBar = document.getElementById('subtitle-bar');
    const progressText = document.getElementById('subtitle-text');
    const resultDiv = document.getElementById('subtitle-result');
    const downloadLink = document.getElementById('subtitle-download');

    progressDiv.classList.remove('hidden');
    try {
      const FFmpeg = await loadFfmpegAdvanced();
      const { createFFmpeg, fetchFile: ffFetchFile } = FFmpeg;
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      const videoData = await ffFetchFile(videoFile);
      const subtitleData = await ffFetchFile(subtitleFile);

      ffmpeg.FS('writebuffer', videoFile.name, videoData);
      ffmpeg.FS('writebuffer', subtitleFile.name, subtitleData);

      const ext = videoFile.name.split('.').pop();
      const outputName = 'subtitled.' + ext;

      progressText.textContent = '자막 하드코딩 중...';
      ffmpeg.setProgress(({ ratio }) => {
        progressBar.style.width = `${Math.round(ratio * 100)}%`;
      });

      await ffmpeg.run(
        '-i', videoFile.name,
        '-vf', `subtitles=${subtitleFile.name}`,
        outputName
      );

      const dataOut = ffmpeg.FS('readFile', outputName);
      const blob = new Blob([dataOut.buffer], { type: videoFile.type });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = outputName;
      resultDiv.classList.remove('hidden');
      showToast('자막 추가 완료!', 'success');

      ffmpeg.FS('unlink', videoFile.name);
      ffmpeg.FS('unlink', subtitleFile.name);
      ffmpeg.FS('unlink', outputName);
    } catch (err) {
      console.error(err);
      showToast('처리 실패: ' + (err.message || '오류'), 'error');
    } finally {
      setTimeout(() => progressDiv.classList.add('hidden'), 2000);
    }
  });

  // Audio Volume/Pitch Adjuster
  document.getElementById('volume-slider').addEventListener('input', () => {
    document.getElementById('volume-value').textContent = document.getElementById('volume-slider').value + '%';
  });

  document.getElementById('pitch-slider').addEventListener('input', () => {
    const val = document.getElementById('pitch-slider').value;
    document.getElementById('pitch-value').textContent = (val / 100).toFixed(2) + 'x';
  });

  document.getElementById('audio-adjust-btn').addEventListener('click', async () => {
    const file = document.getElementById('audio-adjust-input').files[0];
    if (!file) { showToast('오디오 파일을 선택해주세요.', 'error'); return; }

    const volume = parseFloat(document.getElementById('volume-slider').value) / 100;
    const pitch = parseFloat(document.getElementById('pitch-slider').value) / 100;

    showToast('FFmpeg.wasm 로드 중...', 'info');
    const progressDiv = document.getElementById('audio-adjust-progress');
    const progressBar = document.getElementById('audio-adjust-bar');
    const progressText = document.getElementById('audio-adjust-text');
    const resultDiv = document.getElementById('audio-adjust-result');
    const downloadLink = document.getElementById('audio-adjust-download');

    progressDiv.classList.remove('hidden');
    try {
      const FFmpeg = await loadFfmpegAdvanced();
      const { createFFmpeg, fetchFile: ffFetchFile } = FFmpeg;
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      const data = await ffFetchFile(file);
      ffmpeg.FS('writebuffer', file.name, data);

      const outputName = 'adjusted_' + file.name;

      progressText.textContent = '볼륨/피치 조절 중...';
      ffmpeg.setProgress(({ ratio }) => {
        progressBar.style.width = `${Math.round(ratio * 100)}%`;
      });

      await ffmpeg.run(
        '-i', file.name,
        '-af', `volume=${volume},atempo=${pitch}`,
        outputName
      );

      const dataOut = ffmpeg.FS('readFile', outputName);
      const blob = new Blob([dataOut.buffer], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = outputName;
      resultDiv.classList.remove('hidden');
      showToast('볼륨/피치 조절 완료!', 'success');

      ffmpeg.FS('unlink', file.name);
      ffmpeg.FS('unlink', outputName);
    } catch (err) {
      console.error(err);
      showToast('처리 실패: ' + (err.message || '오류'), 'error');
    } finally {
      setTimeout(() => progressDiv.classList.add('hidden'), 2000);
    }
  });

  // Noise Reduction
  document.getElementById('noise-slider').addEventListener('input', () => {
    const val = parseInt(document.getElementById('noise-slider').value);
    document.getElementById('noise-value').textContent = (val / 10).toFixed(1);
  });

  document.getElementById('noise-reduce-btn').addEventListener('click', async () => {
    const file = document.getElementById('noise-input').files[0];
    if (!file) { showToast('오디오 파일을 선택해주세요.', 'error'); return; }

    const noiseValue = parseInt(document.getElementById('noise-slider').value);
    const noiseLevel = noiseValue / 10;

    showToast('FFmpeg.wasm 로드 중...', 'info');
    const progressDiv = document.getElementById('noise-progress');
    const progressBar = document.getElementById('noise-bar');
    const progressText = document.getElementById('noise-text');
    const resultDiv = document.getElementById('noise-result');
    const downloadLink = document.getElementById('noise-download');

    progressDiv.classList.remove('hidden');
    try {
      const FFmpeg = await loadFfmpegAdvanced();
      const { createFFmpeg, fetchFile: ffFetchFile } = FFmpeg;
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      const data = await ffFetchFile(file);
      ffmpeg.FS('writebuffer', file.name, data);

      const outputName = 'noise_reduced_' + file.name;

      progressText.textContent = '노이즈 감소 중...';
      ffmpeg.setProgress(({ ratio }) => {
        progressBar.style.width = `${Math.round(ratio * 100)}%`;
      });

      // Use afftdn filter for noise reduction
      await ffmpeg.run(
        '-i', file.name,
        '-af', `afftdn=nf=${-noiseValue}`,
        outputName
      );

      const dataOut = ffmpeg.FS('readFile', outputName);
      const blob = new Blob([dataOut.buffer], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = outputName;
      resultDiv.classList.remove('hidden');
      showToast('노이즈 감소 완료!', 'success');

      ffmpeg.FS('unlink', file.name);
      ffmpeg.FS('unlink', outputName);
    } catch (err) {
      console.error(err);
      showToast('처리 실패: ' + (err.message || '오류'), 'error');
    } finally {
      setTimeout(() => progressDiv.classList.add('hidden'), 2000);
    }
  });
};
