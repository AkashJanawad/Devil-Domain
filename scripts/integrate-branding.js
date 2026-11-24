// One-time asset plumbing. Gameplay and level definition files are intentionally untouched.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
for(const file of ['scripts/build.js','forge/server.js','tests/browser-smoke.js','tests/browser-replays.js']) {
 const full=path.join(root,file);let text=fs.readFileSync(full,'utf8');
 if(!text.includes("'content/branding/logo.png'"))text=text.replace("'chapters.js',","'chapters.js','content/branding/logo.png','content/branding/icon.png',");
 if(!text.includes("'presentation.js'"))text=text.replace("'chapters.js',","'chapters.js','presentation.js',");
 if(!text.includes("'privacy.html'"))text=text.replace("'presentation.js',","'presentation.js','privacy.js','privacy.html',");
 text=text.replace("name.endsWith('.jpg')?'image/jpeg':","name.endsWith('.jpg')?'image/jpeg':name.endsWith('.png')?'image/png':");
 if(!text.includes("name.endsWith('.html')"))text=text.replace("name.endsWith('.mp4')?","name.endsWith('.html')?'text/html':name.endsWith('.mp4')?");
 fs.writeFileSync(full,text);
}
const file=path.join(root,'forge/fixtures/production-hashes.json');
const hashes=JSON.parse(fs.readFileSync(file,'utf8'));
for(const name of Object.keys(hashes)) {
 const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,name))).digest('hex');
 if(['index.html','style.css'].includes(name)) hashes[name]=hash;
 else if(hashes[name]!==hash) throw new Error('Unexpected gameplay change: '+name);
}
fs.writeFileSync(file,JSON.stringify(hashes)+'\n');
console.log('Brand assets included; gameplay and campaign hashes unchanged.');
