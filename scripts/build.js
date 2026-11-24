// A release build generates configuration; it never trusts local developer settings.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const release = process.argv.includes('--release') || process.argv.includes('--android-release');
const output = path.join(root, process.argv.includes('--android-release')
  ? 'android/app/build/generated/releaseWeb/assets/public' : 'www');
fs.mkdirSync(output, { recursive: true });
for (const name of ['index.html', 'game.js', 'level-runtime.js', 'campaign.js', 'chapters.js','presentation.js','privacy.js','privacy.html','content/branding/menu-art.jpg','content/branding/logo.png','content/branding/icon.png', 'content/season-one.js','content/season-two.js', 'content/chapter-1.mp4', 'content/chapter-1-poster.jpg', 'style.css', 'LICENSE', 'THIRD_PARTY_NOTICES.txt']) {
  fs.mkdirSync(path.dirname(path.join(output,name)), {recursive:true});
  fs.copyFileSync(path.join(root, name), path.join(output, name));
}
const config = release
  ? 'window.DEVIL_DOMAIN_CONFIG = Object.freeze({ BUILD_MODE: "release", DEVELOPER_UNLOCK_ALL_LEVELS: false });\n'
  : fs.readFileSync(path.join(root, 'game-config.js'), 'utf8');
fs.writeFileSync(path.join(output, 'game-config.js'), config);
console.log(`Bundled ${release ? 'release (progression locked)' : 'development'} web assets: ${output}`);
