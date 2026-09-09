// Color Tools - Advanced color picker and converter
// Browser-only, no server processing needed

document.addEventListener('DOMContentLoaded', function() {
  const content = document.getElementById('color-tools-content');
  if (!content) {
    console.error('Color tools container not found');
    return;
  }

  // Build HTML structure
  const html = '<div class="grid md:grid-cols-2 gap-6">' +
    '<div class="space-y-4">' +
      '<h3 class="text-lg font-semibold">컬러 피커</h3>' +
      '<div class="flex items-center gap-3">' +
        '<input type="color" id="colorPicker" class="w-16 h-10 p-0 border rounded cursor-pointer">' +
        '<input type="text" id="hexValue" class="flex-1 px-3 py-2 border rounded text-center font-mono" readonly>' +
        '<button onclick="copyToClipboard(\'hexValue\')" class="px-3 py-2 bg-blue-600 text-white rounded text-sm">복사</button>' +
      '</div>' +
      '<div class="flex gap-2">' +
        '<input type="text" id="rgbValue" class="flex-1 px-3 py-2 border rounded text-center font-mono" readonly>' +
        '<input type="text" id="hslValue" class="flex-1 px-3 py-2 border rounded text-center font-mono" readonly>' +
      '</div>' +
    '</div>' +
    '<div class="space-y-4">' +
      '<h3 class="text-lg font-semibold">컬러 변환</h3>' +
      '<div class="space-y-2">' +
        '<input type="text" id="hexInput" class="w-full px-3 py-2 border rounded font-mono" placeholder="#RRGGBB 입력">' +
        '<div class="flex justify-between gap-2">' +
          '<div class="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-center">' +
            '<span class="font-medium">RGB: </span><span id="rgbOutput">rgb(0, 0, 0)</span>' +
          '</div>' +
          '<div class="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-center">' +
            '<span class="font-medium">HSL: </span><span id="hslOutput">hsl(0, 0%, 0%)</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '</div>';

  content.innerHTML = html;

  const colorPicker = document.getElementById('colorPicker');
  const hexValue = document.getElementById('hexValue');
  const rgbValue = document.getElementById('rgbValue');
  const hslValue = document.getElementById('hslValue');
  const hexInput = document.getElementById('hexInput');
  const rgbOutput = document.getElementById('rgbOutput');
  const hslOutput = document.getElementById('hslOutput');

  colorPicker.addEventListener('input', function(e) {
    const hex = e.target.value.toUpperCase();
    hexValue.value = hex;
    hexInput.value = hex;
    const [r, g, b] = hexToRgb(hex);
    rgbValue.value = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    const [h, s, l] = rgbToHsl(r, g, b);
    hslValue.value = 'hsl(' + Math.round(h) + ', ' + Math.round(s) + '%, ' + Math.round(l) + '%)';
    rgbOutput.textContent = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    hslOutput.textContent = 'hsl(' + Math.round(h) + ', ' + Math.round(s) + '%, ' + Math.round(l) + '%)';
  });

  hexInput.addEventListener('input', function(e) {
    let val = e.target.value;
    if (val.length === 6 && !val.startsWith('#')) val = '#' + val;
    if (val.length > 7) val = val.slice(0, 7);
    const shortHex = val.length === 4;
    const fullHex = shortHex ? '#' + val[1]+val[1]+val[2]+val[2]+val[3]+val[3] : val;
    if (/^#[0-9A-Fa-f]{6}$/.test(fullHex)) {
      const [r, g, b] = hexToRgb(fullHex);
      rgbOutput.textContent = 'rgb(' + r + ', ' + g + ', ' + b + ')';
      const [h, s, l] = rgbToHsl(r, g, b);
      hslOutput.textContent = 'hsl(' + Math.round(h) + ', ' + Math.round(s) + '%, ' + Math.round(l) + '%)';
      rgbValue.value = 'rgb(' + r + ', ' + g + ', ' + b + ')';
      hslValue.value = 'hsl(' + Math.round(h) + ', ' + Math.round(s) + '%, ' + Math.round(l) + '%)';
    }
  });

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    return [parseInt(hex.substr(0, 2), 16), parseInt(hex.substr(2, 2), 16), parseInt(hex.substr(4, 2), 16)];
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h * 360, s * 100, l * 100];
  }

  window.copyToClipboard = function(elementId) {
    const el = document.getElementById(elementId);
    el.select();
    document.execCommand('copy');
  };
});
