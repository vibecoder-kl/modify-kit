const fs = require('fs');
const data = fs.readFileSync('/workspace/modify-kit/landing/js/emoji-data.js', 'utf8');

// Use a sandbox with window
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(data, sandbox);
const charData = sandbox.window.CHARACTER_DATA;

Object.keys(charData).forEach(cat => {
  const catData = charData[cat];
  if (typeof catData === 'object' && !Array.isArray(catData)) {
    console.log('CATEGORY:', cat, '(has subcategories)');
    Object.keys(catData).forEach(sub => {
      const subdata = catData[sub];
      if (typeof subdata === 'object' && !Array.isArray(subdata)) {
        console.log('  [Level 3]:', sub, '->', Object.keys(subdata).join(', '));
      } else if (Array.isArray(subdata)) {
        console.log('  [Level 2 -> array]:', sub, '->', subdata.length, 'items');
      }
    });
  } else if (Array.isArray(catData)) {
    console.log('CATEGORY:', cat, '(direct array):', catData.length, 'items');
  }
});
