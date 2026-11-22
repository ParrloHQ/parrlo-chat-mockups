// Порядок по решению 22.11: раскладка → снять склейку NBSP → WordFit.
// Если склеенная группа («в⍽Толедо?») шире своего блока, U+00A0 в ней становятся обычными пробелами — иначе группа
// вылезает за облачко или рвётся внутри слова. Работает в странице после загрузки шрифтов; вызов повторный — безопасен.
(function () {
  var rg = document.createRange();
  function block(el) { while (el && getComputedStyle(el).display.indexOf('inline') === 0) el = el.parentElement; return el; }
  function avail(b) { var s = getComputedStyle(b); return b.clientWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight); }
  window.unglue = function () {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n, todo = [];
    while ((n = w.nextNode())) if (n.textContent.indexOf(' ') >= 0) todo.push(n);
    todo.forEach(function (n) {
      var el = n.parentElement; if (!el || el.closest('script,style')) return;
      var b = block(el); if (!b) return;
      var a = avail(b); if (!(a > 0)) return;
      var t = n.textContent, re = /[^\s\u00a0]+(?:\u00a0+[^\s\u00a0]+)+/g, m, cut = [];
      function wOf(a1, b1) { rg.setStart(n, a1); rg.setEnd(n, b1); return [].reduce.call(rg.getClientRects(), function (s, r) { return s + r.width; }, 0); }
      while ((m = re.exec(t))) {
        rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
        var rs = [].filter.call(rg.getClientRects(), function (r) { return r.width; });
        var tops = rs.map(function (r) { return r.top; });
        var multi = rs.length > 1 && Math.max.apply(null, tops) - Math.min.apply(null, tops) > 2;
        if (wOf(m.index, m.index + m[0].length) <= a + 0.5 && !multi) continue;
        // группа шире строки: идём по словам и рвём склейку только там, где цепочка перестаёт помещаться
        var parts = [], re2 = /[^\u00a0]+/g, q, base = m.index;
        while ((q = re2.exec(m[0]))) parts.push([base + q.index, base + q.index + q[0].length]);
        var chainStart = parts[0][0];
        for (var i = 1; i < parts.length; i++) {
          if (wOf(chainStart, parts[i][1]) > a + 0.5) { cut.push(parts[i - 1][1]); chainStart = parts[i][0]; }
        }
      }
      if (!cut.length) return;
      var s = t.split('');
      cut.forEach(function (c) { for (var k = c; k < t.length && s[k] === '\u00a0'; k++) s[k] = ' '; });
      n.textContent = s.join('');
    });
  };
  function go() { (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { window.unglue(); document.documentElement.dataset.unglued = '1'; }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
