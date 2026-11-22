// Пакет «группы»: язык (?l=), подгонка ленты под композер, WordFit для AX5.
// Порядок: раскладка → window.unglue() (../tools/unglue.js) → WordFit.
// WordFit: если слово не помещается в строку (перенос внутри слова или вылезает за блок) — кегль этого блока ×0,92 ступенями,
// не ниже AX1 (×0,53 от AX5: тело 53 → 28). Раскладка AX5 (строки во всю ширину, значок над текстом) — основная; WordFit — страховка.
(function(){
  var L=/[\p{L}\p{N}]/u, rg=document.createRange();
  function box(e){var b=e;while(b&&getComputedStyle(b).display.indexOf('inline')===0)b=b.parentElement;var r=b.getBoundingClientRect(),cs=getComputedStyle(b);
    return {l:r.left+parseFloat(cs.paddingLeft)+parseFloat(cs.borderLeftWidth)-1,r:r.right-parseFloat(cs.paddingRight)-parseFloat(cs.borderRightWidth)+1}}
  // вернуть описание проблемы со словом в элементе e (или null)
  window.wordIssue=function(e){var bx=box(e);
    for(var i=0;i<e.childNodes.length;i++){var n=e.childNodes[i];if(n.nodeType!==3)continue;var t=n.textContent,re=/\S+/g,m;
      while((m=re.exec(t))){rg.setStart(n,m.index);rg.setEnd(n,m.index+m[0].length);var rs=[].slice.call(rg.getClientRects()).filter(function(r){return r.width});
        for(var k=0;k<rs.length;k++)if(rs[k].right>bx.r+0.5||rs[k].left<bx.l-0.5)return 'вылезает: '+m[0];
        if(rs.length<2||m[0].length<2)continue;var prev=null;
        for(var j=0;j<m[0].length;j++){rg.setStart(n,m.index+j);rg.setEnd(n,m.index+j+1);var r=rg.getClientRects()[0];if(!r||!r.width)continue;
          if(prev!==null&&r.top>prev+2&&L.test(m[0][j-1])&&L.test(m[0][j]))return 'разорвано: '+m[0];prev=r.top;}}}
    return null};
  window.textEls=function(root){return [].slice.call(root.querySelectorAll('*')).filter(function(e){if(e.closest('svg,template'))return false;var cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return false;
    return [].some.call(e.childNodes,function(n){return n.nodeType===3&&/\S{2}/.test(n.textContent)})})};
  function wordFit(){if(document.documentElement.dataset.t!=='ax5')return;
    textEls(document.querySelector('main')).forEach(function(e){if(!wordIssue(e))return;var base=parseFloat(getComputedStyle(e).fontSize),min=base*0.53,fs=base;
      e.setAttribute('data-wf','');while(fs>min&&wordIssue(e)){fs=Math.max(min,fs*0.92);e.style.fontSize=fs+'px';}});}
  function fitFeed(){var c=document.querySelector('.comp'),m=document.querySelector('.msgs');if(c&&m)m.style.paddingBottom=(c.offsetHeight+8)+'px';
    var d=document.querySelector('.dock'),p=document.querySelector('.page');if(d&&p&&!p.classList.contains('center'))p.style.paddingBottom=d.offsetHeight+'px';}
  document.addEventListener('DOMContentLoaded',function(){var l=document.documentElement.dataset.l,m=document.querySelector('main');m.innerHTML=document.getElementById('L-'+l).innerHTML;
    document.fonts.ready.then(function(){fitFeed();
      // снимок склеенного текста: после WordFit блоки с уменьшенным кеглем получают склейку обратно и unglue проходит по ним ещё раз
      var snap=[],tw=document.createTreeWalker(m,NodeFilter.SHOW_TEXT),x;while((x=tw.nextNode()))snap.push([x,x.textContent]);
      if(window.unglue)window.unglue();wordFit();
      var re=false;snap.forEach(function(p){var el=p[0].parentElement;if(el&&el.closest('[data-wf]')&&p[0].textContent!==p[1]){p[0].textContent=p[1];re=true;}});
      if(re&&window.unglue)window.unglue();fitFeed();document.documentElement.dataset.unglued='1';document.body.dataset.ready='1';});});
})();
