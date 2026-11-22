// WordFit (как wordfit.js в корне репозитория): на AX5 слово, которое не влезает в строку, не рвётся —
// сначала раскладка (в CSS: строки во всю ширину, значок над текстом), а если и так не влезло — кегль блока
// уменьшается ступенями ×0,92, но не ниже AX1 (28 pt). Встраивается в каждую страницу; render.js проверяет итог.
var FLOOR_PX = 28;
var WF_L = /[\p{L}\p{N}]/u;
function wfBroken(el) {
  var rg = document.createRange();
  for (var n of el.childNodes) {
    if (n.nodeType !== 3) continue;
    var t = n.textContent, re = /\S+/g, m;
    while ((m = re.exec(t))) {
      if (m[0].length < 2) continue;
      rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
      if ([...rg.getClientRects()].filter(function (r) { return r.width; }).length < 2) continue;
      var prevTop = null;
      for (var i = 0; i < m[0].length; i++) {
        rg.setStart(n, m.index + i); rg.setEnd(n, m.index + i + 1);
        var r = rg.getClientRects()[0];
        if (!r || !r.width) continue;
        if (prevTop !== null && r.top > prevTop + 2 && WF_L.test(m[0][i - 1]) && WF_L.test(m[0][i])) return true;
        prevTop = r.top;
      }
    }
  }
  return false;
}
// вылезает: прокрутка по ширине, либо строка текста выходит за правый край своего блока (для inline — ближайшего не-inline предка,
// для блока/флекс-элемента — родителя) или экрана
function wfBox(el) { var p = el.parentElement; if (getComputedStyle(el).display === 'inline') while (p && getComputedStyle(p).display === 'inline') p = p.parentElement; return p; }
function wfOver(el) {
  var cs = getComputedStyle(el);
  if (cs.display !== 'inline' && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1) return true;
  // правый край — самый узкий из блоков-предков (предок мог сам растянуться под слишком широкий потомок)
  var right = Infinity;
  for (var p = wfBox(el); p && !p.classList.contains('screen'); p = p.parentElement) {
    if (getComputedStyle(p).display === 'inline') continue;
    var pr = p.getBoundingClientRect(), pcs = getComputedStyle(p);
    right = Math.min(right, pr.right - parseFloat(pcs.paddingRight) - parseFloat(pcs.borderRightWidth));
  }
  var sr = (el.closest('.screen') || document.body).getBoundingClientRect().right;
  var rg = document.createRange();
  for (var n of el.childNodes) { if (n.nodeType !== 3 || !/\S/.test(n.textContent)) continue; rg.selectNodeContents(n);
    for (var r of rg.getClientRects()) if (r.width && (r.right > right + 1 || r.right > sr + 1)) return true; }
  // inline-пилюля (с полями и рамкой) тоже не должна выходить за блок
  if (cs.display === 'inline') for (var q of el.getClientRects()) if (q.width && q.right > right + 1) return true;
  return false;
}
function depth(e) { var d = 0; while ((e = e.parentElement)) d++; return d; }
function wordFit(root) {
  var els = [...root.querySelectorAll('*')].filter(function (e) {
    return !e.closest('.sb,svg') && [...e.childNodes].some(function (n) { return n.nodeType === 3 && /\S{2}/.test(n.textContent); });
  });
  els.sort(function (a, b) { return depth(b) - depth(a); }); // сначала самые вложенные: пилюля «не утверждено» не должна уменьшать абзац
  for (var e of els) {
    var cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    if (!wfBroken(e) && !wfOver(e)) continue;
    var fs = parseFloat(cs.fontSize);
    e.setAttribute('data-wf', '');
    while (fs > FLOOR_PX && (wfBroken(e) || wfOver(e))) {
      fs = Math.max(FLOOR_PX, fs * 0.92);
      e.style.fontSize = fs + 'px';
    }
  }
}
