// Exercise the actual on-screen button between paints with Chrome touch events.
// The test drives the shipped frame loop at a known cadence to measure the arc.
const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.BROWSER_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true
  });
  try {
    const context = await browser.newContext({ viewport: { width: 800, height: 360 }, hasTouch: true, isMobile: true });
    await context.addInitScript(() => { window.requestAnimationFrame = () => 0; });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:8091/game');
    await page.evaluate(() => {
      document.documentElement.requestFullscreen = () => Promise.resolve();
      startGame(0);
      AudioFX.toggleMute();
    });
    const cdp = await context.newCDPSession(page);
    async function point(selector, id) {
      const box = await page.locator(selector).boundingBox();
      return { x: box.x + box.width / 2, y: box.y + box.height / 2, id };
    }
    const jump = await point('#tc-jump', 2), right = await point('#tc-right', 1);
    async function sample(fps, ms, mode = 'tap') {
      await page.evaluate(mode => {
        Game.loadLevel(0);
        Game.state = 'play';
        Game.wipe = Game.wipeDir = 0;
        for (let i = 0; i < 60; i++) Game.update(STEP);
        if (mode === 'buffer') {
          Game.player.y -= 6;
          Game.player.grounded = false;
          Game.player.coyote = 0;
          Game.player.vy = 180;
        }
        suspended = false;
        last = 1000;
        accumulator = 0;
        window.startY = Game.player.y;
        window.startX = Game.player.x;
        window.ys = [];
        window.tickAt = t => { frame(1000 + t); ys.push(Game.player.y); };
      }, mode);
      const base = Date.now() / 1000;
      const dispatch = (type, touchPoints, t) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints, timestamp: base + t / 1000 });
      if (mode === 'moving') await dispatch('touchStart', [right], -2);
      await dispatch('touchStart', mode === 'moving' ? [right, jump] : [jump], 0);
      const framesHeld = Math.floor(ms * fps / 1000);
      const run = (from, to) => page.evaluate(([a, b, fps]) => {
        for (let i = a; i <= b; i++) tickAt(i * 1000 / fps);
      }, [from, to, fps]);
      await run(1, framesHeld);
      await dispatch(mode === 'cancel' ? 'touchCancel' : 'touchEnd', [], ms);
      if (mode === 'blur') await page.evaluate(() => { suspendGame(); resumeGame(); last = 1000; });
      await run(framesHeld + 1, Math.max(fps, framesHeld + fps));
      return page.evaluate(() => ({
        rise: +(startY - Math.min(...ys)).toFixed(1),
        firstFrameRise: +(startY - ys[0]).toFixed(1),
        travel: +(Game.player.x - startX).toFixed(1),
        grounded: Game.player.grounded,
        takeoffs: ys.filter((y, i) => y < (ys[i-1] ?? startY) && (ys[i-1] ?? startY) >= (ys[i-2] ?? startY)).length
      }));
    }
    for (const fps of [24, 30, 60, 120]) {
      const arcs = [];
      for (const ms of [1, 60, 150, 900]) {
        const result = await sample(fps, ms);
        assert(result.grounded && result.firstFrameRise > 0 && result.takeoffs === 1, JSON.stringify(result));
        arcs.push(result.rise);
      }
      assert(arcs[0] >= 60 && arcs[1] > arcs[0] + 8 && arcs[2] > arcs[1] + 6 && Math.abs(arcs[2] - arcs[3]) < 1, JSON.stringify(arcs));
      console.log(JSON.stringify({ fps, holdMilliseconds: [1,60,150,900], riseWorldPixels: arcs }));
    }
    assert.equal((await sample(30, 1, 'cancel')).rise, 0);
    assert.equal((await sample(30, 1, 'blur')).rise, 0);
    assert((await sample(30, 1, 'buffer')).rise > 54);
    const moving = await sample(60, 60, 'moving');
    assert(moving.travel > 3 && moving.rise > 75);
    console.log('PASS: short taps, intermediate and full jumps, single takeoff per hold, moving jump, landing buffer, cancel and suspend.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
