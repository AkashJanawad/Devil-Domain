const fs=require('fs'),{boot}=require('../tests/harness');const h=boot();h.run(fs.readFileSync('tests/replay-driver.js','utf8'));
const r=JSON.parse(fs.readFileSync('tests/replays/level-32.json'));
function wins(actions){return h.run('playReplay')({...r,actions}).state==='win'}
for(const size of [32,16,8,4,2,1])for(let i=0;i+size<=r.actions.length;){const a=[...r.actions.slice(0,i),...r.actions.slice(i+size)];if(wins(a))r.actions=a;else i++}
r.ticks=r.actions.length*r.framesPerAction;fs.writeFileSync('tests/replays/level-32.json',JSON.stringify(r,null,2)+'\n');console.log('Level 32 shortened replay',r.ticks/120,'seconds');
