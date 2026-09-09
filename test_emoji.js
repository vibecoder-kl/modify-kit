const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');
const chromePath = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome', 'linux-148.0.7778.97', 'chrome-linux64', 'chrome');
const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions', '--disable-gpu', '--disable-dev-shm-usage', '--disable-software-rasterizer', '--single-process'],
    executablePath: chromePath
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('[CONSOLE ' + msg.type() + ']: ' + msg.text()));
  page.on('pageerror', err => console.log('[PAGE ERROR]: ' + err.message));

  await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await wait(5000);

  const allCards = await page.$$('div.tool-card');
  for (const card of allCards) {
    const onclick = await page.evaluate(el => el.getAttribute('onclick'), card);
    if (onclick && onclick.includes('emoji-char-tool')) {
      await card.click();
      break;
    }
  }
  await wait(3000);
  await page.screenshot({ path: '/tmp/char_grid_1.png', fullPage: true });
  console.log('Default (얼굴/감정):', await page.evaluate(() => document.querySelectorAll('.char-btn').length), 'chars');

  // Check layout - char-display and char-code classes
  const layoutCheck = await page.evaluate(() => {
    const btn = document.querySelector('.char-btn');
    if (!btn) return 'NO CHAR BTN';
    return {
      hasCharDisplay: btn.querySelector('.char-display') !== null,
      hasCharCode: btn.querySelector('.char-code') !== null,
      hasText2xl: btn.querySelector('.text-2xl') !== null,
      innerHTML: btn.innerHTML.substring(0, 200)
    };
  });
  console.log('Layout check:', JSON.stringify(layoutCheck));

  // Check first few buttons to see box sizing
  const boxSizes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.char-btn')).slice(0, 3).map(btn => ({
      text: btn.textContent.trim().substring(0, 20),
      width: btn.offsetWidth,
      height: btn.offsetHeight
    }));
  });
  console.log('Box sizes (first 3):', JSON.stringify(boxSizes));

  // Click flags
  await page.evaluate(() => document.getElementById('subtab-flags').click());
  await wait(1000);
  console.log('Flags:', await page.evaluate(() => document.querySelectorAll('.char-btn').length), 'chars');
  await page.screenshot({ path: '/tmp/char_grid_2.png', fullPage: true });

  // symbols
  await page.evaluate(() => window.switchCategory('symbols'));
  await wait(500);
  console.log('Symbols:', await page.evaluate(() => document.querySelectorAll('.char-btn').length), 'chars');
  await page.screenshot({ path: '/tmp/char_grid_3.png', fullPage: true });

  // arrows
  await page.evaluate(() => window.switchCategory('arrows'));
  await wait(500);
  console.log('Arrows:', await page.evaluate(() => document.querySelectorAll('.char-btn').length), 'chars');

  // all
  await page.evaluate(() => window.switchCategory('all'));
  await wait(500);
  console.log('All:', await page.evaluate(() => document.querySelectorAll('.char-btn').length), 'chars');

  console.log('=== Done ===');
  await browser.close();
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
