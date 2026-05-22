const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const slugs = ['yeonae-gojang-paeteon', 'jipcheok-button', 'tongjang-sae-neun-paeteon'];
  for (const slug of slugs) {
    try {
      console.log('--- Testing: ' + slug + ' ---');
      await page.goto('https://test-pink-two-64.vercel.app/test/' + slug + '/play', { waitUntil: 'networkidle' });
      
      for (let i = 0; i < 15; i++) {
        await page.waitForTimeout(500);
        const buttons = await page.locator('button').all();
        let clicked = false;
        for (const btn of buttons) {
          if (await btn.isVisible()) {
            const text = await btn.innerText();
            const aria = await btn.getAttribute('aria-label');
            // Skip menu and back buttons using broad checks
            if (text.includes('☰') || (aria && aria.length < 5) || text.includes('이전') || text.includes('←')) {
               continue;
            }
            await btn.click();
            clicked = true;
            break;
          }
        }
        if (!clicked) break;
      }
      
      await page.waitForTimeout(3000);
      console.log('FINAL_URL: ' + page.url());
      console.log('FINAL_TITLE: ' + await page.title());
    } catch (e) {
      console.error('ERROR: ' + e.message);
    }
  }
  await browser.close();
})();
