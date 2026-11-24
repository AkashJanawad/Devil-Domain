const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{Worker}=require('node:worker_threads'),F=require('./v3');
const root=path.resolve(__dirname,'..'),file=path.join(__dirname,'work/batch.json'),token=crypto.randomBytes(24).toString('hex');let batch=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)):[],busy=false;
const history=path.join(__dirname,'work/history');
if(fs.existsSync(history)){for(const name of fs.readdirSync(history)){try{for(const c of JSON.parse(fs.readFileSync(path.join(history,name)))){if(c.data.id>50&&!batch.some(b=>b.data.id===c.data.id)&&c.status==='VERIFIED')batch.push({...c,fingerprint:F.hash(c.data)});}}catch{}}}
for(const c of batch){if(c.solution?.trace){c.difficulty=F.difficulty(c.data,c.solution.trace);if(!c.data.experimental&&c.status==='VERIFIED'&&c.difficulty.tier!==c.data.targetDifficulty){c.accepted=false;c.status='OUT OF BAND';c.approved=false;c.reason='Measured '+c.difficulty.tier+' does not match '+c.data.targetDifficulty;}}}
function save(){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,JSON.stringify(batch,null,2));}
function verify(i){if(busy)throw Error('A solver is already running');const c=batch[i];if(!c)throw Error('No candidate');busy=true;c.status='TESTING';save();const worker=new Worker(path.join(__dirname,'worker.js'),{workerData:{c,others:[...F.existing(c.data.id),...batch.filter((b,n)=>n!==i).map(b=>b.data)]}});worker.on('message',r=>{if(r.progress){c.progress=r.progress;save();return;}batch[i]={...r,generationRun:c.generationRun};busy=false;save();const next=batch.findIndex(c=>c.status==='GENERATING');if(next>=0)verify(next)});worker.once('error',e=>{c.status='FAILED';c.reason=e.message;busy=false;save()});}
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');if(url.pathname==='/api/state'){res.setHeader('Content-Type','application/json');return res.end(JSON.stringify({batch,busy,types:F.types,tiers:F.tiers,report:F.batchReport(batch.filter(c=>c.generationRun===batch.at(-1)?.generationRun)),nextId:F.allocate(batch,1)}));}
 if(url.pathname==='/season2-lab'){res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','text/html');return res.end(fs.readFileSync(path.join(__dirname,'season2/lab.html'),'utf8'));}
 if(url.pathname==='/api/season2'){
  const {approved,drafts}=require('./season2/catalog'),levels=[...drafts,...approved];
  res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json');
  if(url.searchParams.has('level')){
   const data=levels.find(d=>d.id===Number(url.searchParams.get('level')));
   if(!data||!data.developerOnly)throw Error('Unknown Season 2 draft');
   return res.end(JSON.stringify(data));
  }
  return res.end(JSON.stringify(levels.map(d=>{
   let record;try{record=JSON.parse(fs.readFileSync(path.join(__dirname,'season2/results',d.id+'.json'),'utf8'));}catch{}
   return {id:d.id,name:d.name,targetDifficulty:d.targetDifficulty,verified:!!record?.verified&&record.solution?.trace?.hash===F.hash(d),productionReady:approved.some(a=>a.id===d.id),manualReview:approved.some(a=>a.id===d.id)?'APPROVED':'PENDING'};
  })));
 }
 if(url.pathname==='/game'){
  const game=fs.readFileSync(path.join(root,'index.html'),'utf8');
  res.setHeader('Content-Type','text/html');return res.end(game.replace('<head>','<head><base href="/">'));
 }
 if(url.pathname==='/api/composite'){
  const id=Number(url.searchParams.get('level'));if(![481,482,483].includes(id))throw Error('Unknown composite');
  // Read the exact verified fixture. No composition, regeneration, or batch mutation.
  const record=JSON.parse(fs.readFileSync(path.join(__dirname,'composition/results',id+'.json'),'utf8'));
  if(!record.accepted||!record.data.developerOnly||F.hash(record.data)!==record.solution.trace.hash)throw Error('Composite fixture does not match its verified data');
  res.setHeader('Content-Type','application/json');return res.end(JSON.stringify(record.data));
 }
 if(url.pathname==='/composite-lab'){res.setHeader('Content-Type','text/html');return res.end(fs.readFileSync(path.join(__dirname,'composite-lab.html'),'utf8'));}
 if(url.pathname==='/api/action'){if(req.method!=='POST'||req.headers['x-forge-token']!==token)throw Error('Invalid local action token');let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>200000)throw Error('Request too large')}const {action,index,options,data,expectedFingerprint}=JSON.parse(raw);if(busy)throw Error('Wait for current solver');const c=batch[index];if(c&&expectedFingerprint&&expectedFingerprint!==F.hash(c.data))throw Error("REPLAY_MISMATCH: selected data changed");let result={};
 if(action==='generate'){if(batch.length){fs.mkdirSync(path.join(__dirname,'work/history'),{recursive:true});fs.writeFileSync(path.join(__dirname,'work/history',Date.now()+'.json'),JSON.stringify(batch,null,2));}const added=F.generate({...options,startId:F.allocate(batch,options.count)});const run=Date.now();for(const c of added)c.generationRun=run;result={startIndex:batch.length};batch.push(...added);save();const first=batch.findIndex(c=>c.status==='GENERATING');if(first>=0)verify(first);}
 else if(action==='humanTiming'){if(!(data>0&&Number.isFinite(data)))throw Error("Invalid seconds");c.humanSeconds=data;save();}
 else if(action==='validate'){c.validation=F.validate(c.data);c.status=c.validation.errors.length?'FAILED':'UNVERIFIED';c.approved=false;save();}
 else if(action==='solve')verify(index);
 else if(action==='replay'){result=F.replay(c.data,c.solution?.trace);if(result.status!=='VERIFIED'){c.approved=false;c.status='UNVERIFIED';save();}}
 else if(action==='approve'){c.quality=F.quality(c.data,c.solution?.trace,[...F.existing(c.data.id),...batch.filter(b=>b!==c&&b.approved).map(b=>b.data)]);if(c.released||c.accepted===false||c.status!=='VERIFIED'||!c.quality?.unique||F.replay(c.data,c.solution?.trace).status!=='VERIFIED')throw Error('Approval requires current validation, uniqueness and successful replay');c.approved=true;c.review={kind:'developer approval',at:new Date().toISOString(),humanPlaytested:false};save();}
 else if(action==='discard'){if(c.approved)throw Error('Reject approved candidate before releasing its slot');c.released=true;c.status='DISCARDED';save();}
 else if(action==='reject'){c.approved=false;c.status='FAILED';c.reason='Rejected by developer';save();}
 else if(action==='export'){const approved=batch.filter(b=>b.approved);for(const b of approved)if(F.validate(b.data).errors.length||F.replay(b.data,b.solution?.trace).status!=='VERIFIED')throw Error('Stale approval');result={schemaVersion:1,packageVersion:1,levels:approved.map(b=>b.data),proofs:approved.map(b=>b.solution.trace)};}
 else throw Error('Unknown action');res.setHeader('Content-Type','application/json');return res.end(JSON.stringify(result));}
 if(url.pathname==='/'){res.setHeader('Content-Type','text/html');return res.end(fs.readFileSync(path.join(__dirname,'index.html'),'utf8').replace('__TOKEN__',token));}
 if(url.pathname==='/preview'){let html=fs.readFileSync(path.join(root,'index.html'),'utf8');html=html.replace('<head>','<head><base href="/"><script>Object.defineProperty(window,"localStorage",{value:{getItem:()=>null,setItem:()=>{}}});</script>');if(url.searchParams.has('composite')||url.searchParams.has('season2'))html=html.replace('</body>','<script src="/forge/composite-player.js"></script></body>');res.setHeader('Content-Type','text/html');return res.end(html);}
 const allowed=['game.js','game-config.js','style.css','level-runtime.js','campaign.js','chapters.js','presentation.js','privacy.js','privacy.html','content/branding/menu-art.jpg','content/branding/logo.png','content/branding/icon.png','content/chapter-1.mp4','content/chapter-1-poster.jpg','content/season-one.js','content/season-two.js','forge/app.js','forge/composite-player.js'];const name=url.pathname.slice(1);if(!allowed.includes(name)){res.writeHead(404);return res.end('Not found');}res.setHeader('Content-Type',name.endsWith('.html')?'text/html':name.endsWith('.mp4')?'video/mp4':name.endsWith('.jpg')?'image/jpeg':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.png')?'image/png':name.endsWith('.css')?'text/css':'text/javascript');res.end(fs.readFileSync(path.join(root,name)));
 }catch(e){res.writeHead(400,{'Content-Type':'application/json'});res.end(JSON.stringify({error:e.message}));}});
server.listen(8091,'127.0.0.1',()=>console.log('Level Forge: http://127.0.0.1:8091 (local only)'));
