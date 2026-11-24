// Local policy viewer: no external request, consent tracking or account creation.
(()=>{
 const trigger=document.getElementById('privacy-open'),dialog=document.getElementById('privacy-dialog'),content=document.getElementById('privacy-content');
 if(!trigger||!dialog)return;
 let loaded=false;
 const close=()=>{dialog.close();trigger.focus();};
 trigger.addEventListener('click',async()=>{
  dialog.showModal();
  if(loaded)return;
  try{
   const response=await fetch('privacy.html');if(!response.ok)throw Error('Policy unavailable');
   const doc=new DOMParser().parseFromString(await response.text(),'text/html'),main=doc.querySelector('main');
   if(!main)throw Error('Policy unavailable');content.replaceChildren(...Array.from(main.childNodes));loaded=true;
  }catch{content.textContent='The local privacy page could not load. Devil Domain saves progress on your device and does not upload gameplay data. Privacy contact: Akash AJ — janawada2@gmail.com.';}
 });
 document.getElementById('privacy-close').addEventListener('click',close);
 for(const name of ['keydown','devildomain-back'])addEventListener(name,e=>{
  if(!dialog.open||(name==='keydown'&&e.code!=='Escape'))return;
  e.preventDefault();e.stopImmediatePropagation();close();
 },true);
})();
