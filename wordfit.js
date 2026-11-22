// WordFit (решение 22.11.2026): при XL/AX5 слово, которое не влезает в строку, не рвётся —
// кегль этого блока уменьшается ступенями (×0,92), но не ниже AX1. Раскладка (строки во всю ширину,
// значок над текстом и т. п.) — основная; WordFit — только для оставшихся мест.
// Нижний предел — AX1 (тело 28 pt при обычном 17): от кегля XL это ×0,70, от AX5 — ×0,53.
// Повторный вызов сначала снимает свои прежние правки (нужно проверкам на ширине 360).
(function () {
  const FLOOR = {xl: 0.70, ax5: 0.53};
  const L = /[\p{L}\p{N}]/u;
  const rg = document.createRange();
  // слово перенесено между двумя буквами/цифрами — как в checks/wbr.js
  function broken(el) {
    for (const n of el.childNodes) {
      if (n.nodeType !== 3) continue;
      const t = n.textContent;
      const re = /\S+/g;
      let m;
      while ((m = re.exec(t))) {
        if (m[0].length < 2) continue;
        rg.setStart(n, m.index);
        rg.setEnd(n, m.index + m[0].length);
        const rs = [...rg.getClientRects()].filter((r) => r.width);
        if (rs.length < 2) continue;
        let prevTop = null;
        for (let i = 0; i < m[0].length; i++) {
          rg.setStart(n, m.index + i);
          rg.setEnd(n, m.index + i + 1);
          const r = rg.getClientRects()[0];
          if (!r || !r.width) continue;
          if (prevTop !== null && r.top > prevTop + 2 && L.test(m[0][i - 1]) && L.test(m[0][i])) return true;
          prevTop = r.top;
        }
      }
    }
    return false;
  }
  function unglue(e) {
    let b = e;
    while (b && getComputedStyle(b).display.startsWith('inline')) b = b.parentElement;
    const bs = getComputedStyle(b);
    const avail = b.clientWidth - parseFloat(bs.paddingLeft) - parseFloat(bs.paddingRight);
    for (const n of e.childNodes) {
      if (n.nodeType !== 3 || n.textContent.indexOf('\u00a0') < 0) continue;
      const t = n.textContent, re = /[^\s\u00a0]+(?:\u00a0+[^\s\u00a0]+)+/g, cut = [];
      const w = (a, z) => { rg.setStart(n, a); rg.setEnd(n, z); return [...rg.getClientRects()].reduce((s, r) => s + r.width, 0); };
      let m;
      while ((m = re.exec(t))) {
        if (w(m.index, m.index + m[0].length) <= avail + 0.5) continue;
        const parts = [], re2 = /[^\u00a0]+/g;
        let q;
        while ((q = re2.exec(m[0]))) parts.push([m.index + q.index, m.index + q.index + q[0].length]);
        let start = parts[0][0];
        for (let i = 1; i < parts.length; i++) if (w(start, parts[i][1]) > avail + 0.5) { cut.push(parts[i - 1][1]); start = parts[i][0]; }
      }
      if (!cut.length) continue;
      const c = t.split('');
      cut.forEach((k) => { for (let j = k; j < t.length && c[j] === '\u00a0'; j++) c[j] = ' '; });
      n.textContent = c.join('');
    }
  }
  window.wordFit = function () {
    document.querySelectorAll('[data-wf]').forEach((e) => { e.style.fontSize = ''; e.removeAttribute('data-wf'); });
    document.querySelectorAll('figure .pc-frame').forEach((fr) => {
      const floor = FLOOR[fr.dataset.ts];
      if (!floor) return;
      const els = [...fr.querySelectorAll('*')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && /\S{2}/.test(n.textContent)));
      for (const e of els) {
        if (e.closest('.pc-sr')) continue;
        const cs = getComputedStyle(e);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        if (!broken(e)) continue;
        // порядок 22.11: раскладка → снять склейку → WordFit. Склеенная цепочка шире строки рвётся там,
        // где перестаёт помещаться (как redesign-ios/tools/unglue.js); кегль уменьшаем, только если слово не влезает и так.
        unglue(e);
        if (!broken(e)) continue;
        const base = parseFloat(cs.fontSize), min = base * floor;
        let fs = base;
        e.setAttribute('data-wf', '');
        while (fs > min && broken(e)) {
          fs = Math.max(min, fs * 0.92);
          e.style.fontSize = fs + 'px';
        }
      }
    });
  };
})();
