// Reuse Phase 1's independent keyboard replay and local-only browser harness.
require('node:child_process').execFileSync(process.execPath,[require('node:path').join(__dirname,'../experiments/browser.js'),'--composites'],{stdio:'inherit'});
