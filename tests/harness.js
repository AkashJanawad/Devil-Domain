const fs = require('node:fs');
const vm = require('node:vm');
function boot(seed = {}, blocked = false, config = { BUILD_MODE: "release", DEVELOPER_UNLOCK_ALL_LEVELS: false }) {
  const elements = new Map(), events = {}, data = {...seed};
  function element() {
    const listeners = {}, classes = new Set();
    return {style:{}, children:[], textContent:'', disabled:false,
      get innerHTML(){return this._html||''},set innerHTML(value){this._html=value;this.children.length=0},
      classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),toggle:(x,v)=>v?classes.add(x):classes.delete(x),contains:x=>classes.has(x)},
      addEventListener:(t,f)=>(listeners[t]??=[]).push(f),
      fire:(t,e={})=>(listeners[t]||[]).forEach(f=>f({preventDefault(){},pointerId:1,...e})),
      appendChild(e){this.children.push(e)},setPointerCapture(){},
      getContext:()=>new Proxy({}, {get:()=>()=>({addColorStop(){}})})};
  }
  const document={hidden:false,documentElement:{setAttribute(){},getAttribute(){return 'dark'}},
    getElementById:id=>{if(!elements.has(id))elements.set(id,element());return elements.get(id)},
    createElement:element,addEventListener:(t,f)=>(events[t]??=[]).push(f)};
  const sandbox={DEVIL_DOMAIN_CONFIG:config,document,console,performance:{now:()=>0},requestAnimationFrame(){},setTimeout(){},
    matchMedia:()=>({matches:false}),localStorage:{getItem:k=>{if(blocked)throw Error('denied');return data[k]??null},setItem:(k,v)=>{if(blocked)throw Error('denied');data[k]=String(v)}},
    innerWidth:960,innerHeight:540,addEventListener:(t,f)=>(events[t]??=[]).push(f)};
  sandbox.window=sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../game.js'),'utf8'),sandbox);
  vm.runInContext('for (const k of Object.keys(AudioFX)) AudioFX[k] = () => false;',sandbox);
  return {run:code=>vm.runInContext(code,sandbox),elements,data,fire:(t)=>(events[t]||[]).forEach(f=>f({}))};
}
module.exports={boot};
