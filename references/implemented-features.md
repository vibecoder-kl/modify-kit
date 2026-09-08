# Implemented Features Catalog

## Image Tools (image-resizer.js)
- Resize (width/height with auto-aspect)
- Crop (via file upload preview)
- Format conversion (PNG/JPEG/WebP)
- Compression (quality slider 10-100%)
- Watermark add (text, color picker, size slider)
- Watermark remove (rectangle region + clone fill)
- Filters: grayscale, blur, sharpen, invert, brightness, contrast
- Rotation: left/right 90°, 180°
- Flip: horizontal, vertical
- Collage maker (multi-image grid layout)
- ASCII art generator (configurable width)

## PDF Tools (pdf-tools.js)
- Merge multiple PDFs
- Split (extract each page as separate PDF)
- Compress (pdf-lib save with compress + object streams)
- Page management: delete, rotate 90°
- Page number overlay
- Password encrypt/decrypt (pdf-lib encrypt API)

## Text Tools (text-tools.js)
- Word/character/line count

## Text Advanced (text-advanced.js)
- Case converter: UPPER, lower, Title, Sentence, camel, snake, kebab, alternating
- Whitespace cleaner: trim, remove empty lines, collapse spaces, clean all
- Regex tester (real-time with highlight)
- JSON ↔ CSV converter
- Text similarity calculator (Jaccard similarity)
- Text summarizer (extractive, configurable ratio)

## Media Tools (media-tools.js)
- Video/audio → MP3 extraction (ffmpeg.wasm)

## Media Advanced (media-advanced.js)
- Audio trim (start/end time)
- Audio merge (multi-file concat)
- Video speed adjustment (0.1x-4x with audio atempo)
- Video trim (start/end time)
- Audio volume/pitch adjustment
- Noise reduction (FFmpeg afftdn filter)
- Subtitle embedding (SRT/VTT/SUB/ASS/SSA → hardsub)

## QR/Barcode Tools (qr-tools.js)
- QR code generation (text/URL, size, color)
- Barcode generation (Code 128, EAN, UPC via JsBarcode)
- QR code scanning (image upload via qr-scanner library)
- Barcode scanning (image upload via Html5Qrcode)

## Dev Tools Extended (dev-tools-extended.js)
- URL encode/decode
- Color converter (HEX/RGB/HSL/CMYK)
- HTML entity encode/decode
- Markdown ↔ HTML converter
- Hash generator (MD5/SHA-1/SHA-256/SHA-512)
- Timestamp converter (Unix ↔ Date)
- QR code generation
- XML formatter (format/minify)
- SQL formatter (format/uppercase keywords)
- Fake data generator (JSON/CSV/SQL, selectable fields)

## Converter Tools (converter-tools.js)
- Unit converter (length, weight, temperature, currency)

## Security Tools (security-tools.js)
- Password generator (customizable length, charset)
- Password strength checker (7-point scoring, feedback)
- Random number generator (crypto.getRandomValues, range + batch)

## TTS Tools (tts-tools.js)
- Text-to-speech (browser SpeechSynthesis API)

## Calculator Tools (calculator-tools.js)
- Basic calculator (4 ops, %, ÷)

## Timer Tools (timer-tools.js)
- Timer/stopwatch (countdown, lap timer)
