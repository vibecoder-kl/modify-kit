#!/usr/bin/env python3
# Generate 30 SEO landing pages for ModifyKit tools
import os
import json

# Tool definitions
TOOLS = [
    # Image Tools
    {"slug": "image-resize", "title": "Image Resizer", "ko_title": "이미지 리사이징", "desc": "Resize images to any dimensions quickly and easily. Supports JPG, PNG, WebP formats. All processing is done in your browser - no uploads required!", "ko_desc": "이미지를 원하는 크기로 쉽고 빠르게 리사이징하세요. JPG, PNG, WebP 포맷을 지원합니다. 브라우저에서 모든 처리가 완료되며 업로드가 필요하지 않습니다!", "keywords": "image resize, image resizer, resize image, image dimensions, thumbnail maker"},
    {"slug": "image-crop", "title": "Image Crop Tool", "ko_title": "이미지 크롭", "desc": "Crop images with precision. Select exact areas to remove unwanted parts of your images for free.", "ko_desc": "정밀하게 이미지를 크롭하세요. 원하지 않는 부분을 제거할 수 있습니다.", "keywords": "image crop, crop image, image cropper, remove unwanted parts, photo crop"},
    {"slug": "image-format-convert", "title": "Image Format Converter", "ko_title": "이미지 포맷 변환", "desc": "Convert between JPG, PNG, WebP, and other image formats with one click. Fast and free.", "ko_desc": "JPG, PNG, WebP 등 다양한 이미지 포맷 간 변환을 원클릭으로 처리하세요.", "keywords": "image format converter, convert image format, jpg to png, png to jpg, webp converter"},
    {"slug": "image-compress", "title": "Image Compressor", "ko_title": "이미지 압축", "desc": "Compress images while maintaining quality. Reduce file sizes for web, email, and storage optimization.", "ko_desc": "품질을 유지하면서 이미지를 압축하세요. 웹, 이메일, 저장 공간 최적화에 적합합니다.", "keywords": "image compressor, compress image, image compression, reduce image size, tinyjpg"},
    {"slug": "image-watermark", "title": "Image Watermark Tool", "ko_title": "이미지 워터마크", "desc": "Add customizable watermarks to your images. Protect your photos with text or logo watermarks easily.", "ko_desc": "사용자 지정 워터마크를 이미지에 추가하세요. 텍스트 또는 로고 워터마크로 사진을 보호할 수 있습니다.", "keywords": "image watermark, add watermark, watermark tool, photo watermark, copyright watermark"},
    {"slug": "background-remover", "title": "AI Background Remover", "ko_title": "AI 배경 제거", "desc": "Remove image backgrounds automatically using AI technology. Perfect for product photos, portraits, and design projects.", "ko_desc": "AI 기술을 사용하여 이미지 배경을 자동으로 제거하세요. 제품 사진, 초상화, 디자인 프로젝트에 적합합니다.", "keywords": "background remover, remove background, ai background removal, transparent background, png background"},

    # PDF Tools
    {"slug": "pdf-merge", "title": "Merge PDF Online", "ko_title": "PDF 병합", "desc": "Combine multiple PDF files into one document. Free online tool - no registration required.", "ko_desc": "여러 PDF 파일을 하나로 병합하세요. 무료 온라인 도구로 등록이 필요하지 않습니다.", "keywords": "merge pdf, combine pdf, join pdf, pdf merger, online pdf merge"},
    {"slug": "pdf-split", "title": "Split PDF Online", "ko_title": "PDF 분할", "desc": "Split PDF files into individual pages or extract specific page ranges for free.", "ko_desc": "PDF 파일을 개별 페이지로 분할하거나 특정 페이지 범위를 추출하세요.", "keywords": "split pdf, pdf splitter, separate pdf pages, extract pdf pages, pdf page splitter"},
    {"slug": "pdf-compress", "title": "Compress PDF Online", "ko_title": "PDF 압축", "desc": "Reduce PDF file sizes while maintaining quality. Great for email attachments and storage.", "ko_desc": "품질을 유지하면서 PDF 파일 크기를 줄이세요. 이메일 첨부파일과 저장에 적합합니다.", "keywords": "compress pdf, reduce pdf size, pdf compression, small pdf, compress pdf online"},
    {"slug": "pdf-page-management", "title": "PDF Page Management", "ko_title": "PDF 페이지 관리", "desc": "Delete, rotate, reorder, and manage PDF pages easily. Add or remove page numbers and watermarks.", "ko_desc": "PDF 페이지를 쉽게 삭제, 회전, 재정렬 및 관리하세요. 페이지 번호와 워터마크를 추가/제거할 수 있습니다.", "keywords": "pdf page management, delete pdf pages, rotate pdf, reorder pdf pages, edit pdf pages"},
    {"slug": "pdf-image-convert", "title": "PDF to Image Converter", "ko_title": "PDF → 이미지 변환", "desc": "Convert PDF files to JPG, PNG, or WebP images. High-quality output with batch support.", "ko_desc": "PDF 파일을 JPG, PNG 또는 WebP 이미지로 변환하세요.", "keywords": "pdf to image, pdf to jpg, pdf to png, convert pdf to image, pdf image converter"},
    {"slug": "image-pdf-convert", "title": "Image to PDF Converter", "ko_title": "이미지 → PDF 변환", "desc": "Convert images to PDF format. Combine multiple images into one PDF document easily.", "ko_desc": "이미지를 PDF 형식으로 변환하세요. 여러 이미지를 하나의 PDF로 결합할 수 있습니다.", "keywords": "image to pdf, jpg to pdf, png to pdf, convert image to pdf, image to pdf converter"},

    # Text Tools
    {"slug": "word-count", "title": "Word Counter", "ko_title": "단어 카운터", "desc": "Count words, characters, lines, and paragraphs in your text. Real-time counting for writers and students.", "ko_desc": "텍스트의 단어, 문자, 줄, 문단 수를 세어세요. 작가와 학생들을 위한 실시간 카운팅.", "keywords": "word count, character counter, word counter, char count, text counter"},
    {"slug": "character-count", "title": "Character Counter", "ko_title": "문자 카운터", "desc": "Count characters with or without spaces. Check character limits for social media and essays.", "ko_desc": "공백 포함/제외 문자 수를 세어세요. 소셜 미디어와 에세이의 문자 제한을 확인할 수 있습니다.", "keywords": "character count, count characters, char counter, character limit, text length"},
    {"slug": "line-count", "title": "Line Counter", "ko_title": "줄 카운터", "desc": "Count lines, words, and characters in text files. Useful for coding and writing analysis.", "ko_desc": "텍스트 파일의 줄, 단어, 문자 수를 세어세요. 코딩 및 글쓰기 분석에 유용합니다.", "keywords": "line count, count lines, line counter, text analyzer, code line counter"},
    {"slug": "case-converter", "title": "Case Converter", "ko_title": "대소문자 변환", "desc": "Convert text case: upper, lower, title, sentence, camel, snake, kebab case and more.", "ko_desc": "텍스트 케이스 변환: 대문자, 소문자, 타이틀, 문장, 카멜, 스네이크, 케밥 케이스 등.", "keywords": "case converter, text case, upper case, lower case, camel case, snake case, title case"},
    {"slug": "regex-tester", "title": "Regex Tester", "ko_title": "정규식 테스트기", "desc": "Test regular expressions in real-time with matching highlights and flag options.", "ko_desc": "일치 강조 및 플래그 옵션과 함께 실시간으로 정규식을 테스트하세요.", "keywords": "regex tester, regex, regular expression, test regex, regex tool"},
    {"slug": "json-csv", "title": "JSON to CSV Converter", "ko_title": "JSON ↔ CSV 변환", "desc": "Convert between JSON and CSV formats. Format, validate, and transform data easily.", "ko_desc": "JSON과 CSV 형식 간 변환. 데이터를 쉽게 형식화, 검증 및 변환하세요.", "keywords": "json to csv, csv to json, json csv converter, json formatter, csv converter"},

    # Media Tools
    {"slug": "video-to-mp3", "title": "Video to MP3 Converter", "ko_title": "영상 → MP3 변환", "desc": "Extract audio from video files and convert to MP3 format. Fast conversion in your browser.", "ko_desc": "영상 파일에서 오디오를 추출하여 MP3 형식으로 변환하세요. 빠른 브라우저 변환.", "keywords": "video to mp3, extract audio, video to mp3 converter, convert video to mp3, audio extractor"},
    {"slug": "audio-to-mp3", "title": "Audio to MP3 Converter", "ko_title": "오디오 → MP3 변환", "desc": "Convert audio files to MP3 format. Support for WAV, FLAC, AAC, and more.", "ko_desc": "오디오 파일을 MP3 형식으로 변환하세요. WAV, FLAC, AAC 등 다양한 포맷 지원.", "keywords": "audio to mp3, convert audio, wav to mp3, flac to mp3, audio converter"},
    {"slug": "media-trim", "title": "Video/Audio Trimmer", "ko_title": "미디어 트림", "desc": "Trim video and audio files to cut out unwanted sections. Precise cutting with preview.", "ko_desc": "원하지 않는 부분을 잘라내는 데 정밀한 커팅과 미리보기 기능으로 비디오와 오디오 파일을 트림하세요.", "keywords": "video trimmer, audio trimmer, cut video, trim audio, media editor"},
    {"slug": "media-merge", "title": "Media Merger", "ko_title": "미디어 머지", "desc": "Merge multiple video or audio files into a single file. Combine clips easily.", "ko_desc": "여러 비디오 또는 오디오 파일을 하나의 파일로 병합하세요. 클립을 쉽게 결합할 수 있습니다.", "keywords": "video merger, audio merger, merge video, merge audio, combine media"},

    # QR & Barcode
    {"slug": "qr-generator", "title": "QR Code Generator", "ko_title": "QR 코드 생성기", "desc": "Generate custom QR codes for URLs, text, WiFi, and more. Free with high-quality PNG downloads.", "ko_desc": "URL, 텍스트, WiFi 등을 위한 사용자 지정 QR 코드를 생성하세요. 고품질 PNG 다운로드 지원.", "keywords": "qr code generator, create qr code, qr code maker, qr generator, qr code png"},
    {"slug": "qr-scanner", "title": "QR Code Scanner", "ko_title": "QR 코드 스캔", "desc": "Scan QR codes using your camera or upload QR code images. Instant results in your browser.", "ko_desc": "카메라로 QR 코드를 스캔하거나 QR 코드 이미지를 업로드하세요. 브라우저에서 즉시 결과 확인.", "keywords": "qr code scanner, scan qr code, qr reader, qr code reader, qr scanner online"},
    {"slug": "barcode-generator", "title": "Barcode Generator", "ko_title": "바코드 생성기", "desc": "Generate barcodes in various formats including Code 128, Code 39, EAN-13, and UPC-A.", "ko_desc": "Code 128, Code 39, EAN-13, UPC-A를 포함한 다양한 형식으로 바코드를 생성하세요.", "keywords": "barcode generator, create barcode, barcode maker, code 128, ean 13, upc barcode"},

    # Dev Tools
    {"slug": "json-formatter", "title": "JSON Formatter", "ko_title": "JSON 포맷터", "desc": "Format, validate, and beautify JSON code with syntax highlighting. Tree view and raw view options.", "ko_desc": "문법 강조 기능으로 JSON 코드를 형식화, 검증 및 미려하게 표시하세요.", "keywords": "json formatter, json validator, pretty print json, json beautifier, json editor"},
    {"slug": "base64-converter", "title": "Base64 Encoder/Decoder", "ko_title": "Base64 인코더/디코더", "desc": "Encode and decode text or files to/from Base64 format. Handle strings, images, and binary data.", "ko_desc": "텍스트 또는 파일을 Base64 형식으로 인코딩/디코딩하세요.", "keywords": "base64 encoder, base64 decoder, base64 convert, encode base64, decode base64"},

    # Converter Tools
    {"slug": "unit-converter", "title": "Unit Converter", "ko_title": "단위 변환기", "desc": "Convert between units of length, weight, temperature, area, volume, speed, and more.", "ko_desc": "길이, 무게, 온도, 면적, 부피, 속도 등 다양한 단위 간 변환.", "keywords": "unit converter, length converter, weight converter, temperature converter, metric converter"},

    # Security Tools
    {"slug": "password-generator", "title": "Password Generator", "ko_title": "비밀번호 생성기", "desc": "Generate strong, random passwords with customizable length and character types.", "ko_desc": "맞춤형 길이와 문자 유형으로 강력한 무작위 비밀번호를 생성하세요.", "keywords": "password generator, random password, strong password, password maker, secure password"},

    # Text to Speech
    {"slug": "text-to-speech", "title": "Text to Speech", "ko_title": "문자음성변환", "desc": "Convert text to speech using browser's speech synthesis API. Listen to text in multiple languages.", "ko_desc": "브라우저의 음성 합성 API를 사용하여 텍스트를 음성으로 변환하세요.", "keywords": "text to speech, tts, text to voice, speech synthesis, hear text"},
]

# HTML Template
HTML_TEMPLATE = '''<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{ko_desc}">
  <title>{title} - ModifyKit | {ko_title}</title>
  <meta name="keywords" content="{keywords}">
  <!-- Open Graph -->
  <meta property="og:title" content="{title} - ModifyKit">
  <meta property="og:description" content="{ko_desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://modifykit.com/{slug}">
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
  <!-- Navbar -->
  <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <a href="/" class="text-xl font-bold text-blue-600">ModifyKit</a>
      <div class="text-sm text-gray-600 dark:text-gray-400">100% 브라우저 기반 | 파일 업로드 없음</div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="bg-white dark:bg-gray-800 py-12 mb-8">
    <div class="container mx-auto px-4 text-center">
      <div class="text-4xl mb-4">{icon}</div>
      <h1 class="text-3xl md:text-4xl font-bold mb-4">{title} - ModifyKit</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">{ko_desc}</p>
      <a href="#tool" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
        바로 사용하기
      </a>
    </div>
  </section>

  <!-- Features -->
  <section class="container mx-auto px-4 py-8">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
        <div class="text-2xl mb-2">🔒</div>
        <h3 class="font-bold mb-2">프라이버시 보호</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">100% 브라우저에서 처리. 파일은 서버로 전송되지 않습니다.</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
        <div class="text-2xl mb-2">⚡</div>
        <h3 class="font-bold mb-2">즉시 처리</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">클릭 한 번으로 빠른 결과를 확인하세요.</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
        <div class="text-2xl mb-2">📱</div>
        <h3 class="font-bold mb-2">모든 기기 지원</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">데스크톱, 태블릿, 모바일에서 동작합니다.</p>
      </div>
    </div>

    <!-- Tool Container -->
    <div id="tool" class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 mb-8">
      <h2 class="text-2xl font-bold mb-6">{title} 사용하기</h2>
      <div id="{slug}-content"></div>
    </div>

    <!-- How to Use -->
    <div class="prose dark:prose-invert max-w-none">
      <h2 class="text-2xl font-bold mb-4">사용 방법</h2>
      <ol class="space-y-2 text-gray-600 dark:text-gray-400">
        <li><strong>1단계:</strong> 파일을 업로드하거나 텍스트를 입력하세요.</li>
        <li><strong>2단계:</strong> 원하는 옵션을 설정하고 처리 버튼을 클릭하세요.</li>
        <li><strong>3단계:</strong> 결과를 미리보기하고 다운로드하세요.</li>
      </ol>
      <h3 class="text-xl font-bold mt-6 mb-2">장점</h3>
      <ul class="space-y-1 text-gray-600 dark:text-gray-400">
        <li>✓ 브라우저에서 모든 처리 - 파일 업로드 불필요</li>
        <li>✓ 즉시 사용 가능 - 설치 필요 없음</li>
        <li>✓ 프라이버시 보호 - 데이터가 절대 유출되지 않음</li>
        <li>✓ 무료 - 기업용 플랜 없음</li>
      </ul>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
    <div class="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
      <p>&copy; 2024 ModifyKit. All rights reserved.</p>
      <p class="mt-2">100% 브라우저 기반 처리. 파일은 서버로 전송되지 않습니다.</p>
      <div class="mt-2">
        <a href="/docs/privacy.html" class="hover:text-blue-600">Privacy</a>
        <a href="/docs/contact.html" class="hover:text-blue-600 ml-2">Contact</a>
      </div>
    </div>
  </footer>

  <script src="../js/components.js"></script>
  <script>
    showTool('{slug}');
  </script>
</body>
</html>'''

# Icons for each tool category
ICONS = {
    "image-resize": "🖼️", "image-crop": "✂️", "image-format-convert": "🔄",
    "image-compress": "🗜️", "image-watermark": "📝", "background-remover": "✂️",
    "pdf-merge": "📎", "pdf-split": "✂️", "pdf-compress": "🗜️",
    "pdf-page-management": "📄", "pdf-image-convert": "🖼️", "image-pdf-convert": "📄",
    "word-count": "📝", "character-count": "🔤", "line-count": "📏",
    "case-converter": "🔤", "regex-tester": "🔍", "json-csv": "📊",
    "video-to-mp3": "🎬", "audio-to-mp3": "🎵", "media-trim": "✂️",
    "media-merge": "🔗", "qr-generator": "📱", "qr-scanner": "📷",
    "barcode-generator": "🔲", "json-formatter": "📋", "base64-converter": "🔢",
    "unit-converter": "📐", "password-generator": "🔒", "text-to-speech": "🗣️"
}

def generate_pages():
    output_dir = os.path.join(os.path.dirname(__file__), '..', 'landing')
    os.makedirs(output_dir, exist_ok=True)

    for tool in TOOLS:
        slug = tool['slug']
        html = HTML_TEMPLATE.format(
            title=tool['title'],
            ko_title=tool['ko_title'],
            ko_desc=tool['ko_desc'][:160],
            keywords=tool['keywords'],
            slug=slug,
            icon=ICONS.get(slug, "🔧")
        )

        output_path = os.path.join(output_dir, f"{slug}.html")
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html)

        print(f"Generated: {slug}.html")

    # Generate sitemap
    sitemap_urls = [f"https://modifykit.com/landing/{tool['slug']}" for tool in TOOLS]
    sitemap = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.6">
""" + "\n".join(f"  <url><loc>{url}</loc></url>" for url in sitemap_urls) + "\n</urlset>"

    sitemap_path = os.path.join(output_dir, 'sitemap.xml')
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(sitemap)

    print(f"\nGenerated sitemap.xml with {len(TOOLS)} URLs")

if __name__ == '__main__':
    generate_pages()
