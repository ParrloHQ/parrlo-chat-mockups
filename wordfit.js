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
