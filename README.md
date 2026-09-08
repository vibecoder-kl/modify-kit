ModifyKit
==============

All-in-one digital utility platform. Client-side processing, 100% free, no uploads.

## Available Tools (15 Categories)

### Image Tools
- Resize, Crop, Format Convert (PNG/JPG/WEBP)
- Compression (quality slider)
- Background Removal (AI-based, on-device)

### PDF Tools
- Merge, Split, Compress
- PDF ↔ Image conversion

### Text Tools
- Word/Character/Line count
- Case Converter (UPPER, lower, Title, Sentence, camelCase, snake_case, kebab-case, aLtErNaTiNg)
- Whitespace Cleaner
- Regex Tester (with flags, match highlighting)
- JSON ↔ CSV Converter

### Media Tools
- Video/Audio → MP3 conversion (via ffmpeg.wasm)
- Audio Trimmer & Merger
- Video Trimmer & Speed Adjuster

### QR/Barcode Tools
- QR Code Generator (custom colors, sizes)
- Barcode Generator (EAN-13)
- QR Code Scanner

### Developer Tools
- JSON Formatter / Minifier
- Base64 Encode/Decode
- UUID Generator (v4)
- URL Encoder/Decoder
- Color Converter (HEX ↔ RGB ↔ HSL ↔ CMYK)
- HTML Entity Encoder/Decoder
- Markdown ↔ HTML Converter
- Hash Generator (SHA-1, SHA-256, SHA-512)
- Timestamp Converter

### Unit Converter
- Length, Weight, Temperature
- Currency (live exchange rates)

### Security Tools
- Password Generator (customizable length, character sets)
- Hash Generator (SHA-256, MD5)
- File Hash Generator

### Extra Tools
- Calculator (4-function with history)
- Timer & Stopwatch (with lap functionality)
- Text-to-Speech (multi-language)

## Getting Started

### Local Development
```bash
npm install
npm run dev
# or: node server.js
```

Open http://localhost:8080

### Structure
```
modify-kit/
├── index.html          # Dashboard
├── css/styles.css      # Custom styles
├── js/
│   ├── components.js   # Tool registry & shared components
│   ├── router.js       # Client-side routing
│   ├── server.js       # Static file server (local dev)
│   ├── 404.html        # 404 page
│   └── tools/          # Individual tool implementations
└── docs/
    ├── privacy.html    # Privacy policy
    └── contact.html    # Contact page
```

## Architecture
- 100% client-side processing (no server computation)
- Tailwind CSS for styling
- pdf-lib for PDF operations
- ffmpeg.wasm for media conversion
- qrcode.js for QR codes
- Web Crypto API for hashing/passwords

## License
MIT
