const { chromium } = require('playwright');
// Извлекает тексты старых кадров frames/{ru,es,en}-<экран>.html (фигура __pro-n) по порядку: ru[i] ↔ es[i] ↔ en[i].
// Запуск: node redesign-ios/contacts-calls/tools/extract.js  → tools/texts.json
const fs=require('fs');const path=require('path');
const FR=path.resolve(__dirname,'../../../frames');
const S=require('./screens.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const D={};const PS={};const warn=[];
for(const s of S){const L={};
 for(const l of ['ru','es','en']){
 await p.goto('file://'+FR+'/'+l+'-'+s+'.html',{waitUntil:'domcontentloaded'});
 L[l]=await p.evaluate(()=>{const f=document.querySelector('figure[data-id$="__pro-n"]');const out=[];
  const w=document.createTreeWalker(f.querySelector('.pc-frame'),NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);
  let n;while(n=w.nextNode()){if(n.nodeType===1){if(n.closest('svg,.ovl'))continue;const a=n.getAttribute('aria-label');if(a)out.push(a);}
   else{if(n.parentElement.closest('svg,.ovl,script,style'))continue;const t=n.textContent.replace(/\s+/g,' ').trim();if(t)out.push(t)}}
  return out});}
 if(L.ru.length!==L.es.length||L.ru.length!==L.en.length)warn.push(s+' '+L.ru.length+'/'+L.es.length+'/'+L.en.length);
 PS[s]=L; L.ru.forEach((r,i)=>{if(!D[r])D[r]={es:L.es[i],en:L.en[i],s}; else if(D[r].es!==L.es[i]&&!(D[r].alt||[]).includes(L.es[i])){(D[r].alt=D[r].alt||[]).push(s+': '+L.es[i]+' | '+L.en[i])}});
}
fs.writeFileSync(path.join(__dirname,"texts.json"),JSON.stringify(PS));console.log(warn.join('\n'));await b.close()})();
