// Неразрывные пробелы в текстах макетов redesign-ios: короткое служебное слово не остаётся в конце строки.
// Правило как у веба и iOS (ChatsCore): U+00A0 ставится ПОСЛЕ короткого слова из short-words.json, ПЕРЕД постпозитивом
// («же», «ли», «бы») и ПЕРЕД «—». Склеивается всё видимое: текст страницы (язык — ближайший lang предка) и подписи в data-es / data-en.
// <script>, <style>, комментарии и прочие атрибуты не трогаются.
//   const { glueHtml } = require('<…>/redesign-ios/tools/nbsp.js'); fs.writeFileSync(f, glueHtml(html));
const fs = require('fs');
const path = require('path');
const W = JSON.parse(fs.readFileSync(path.join(__dirname, 'short-words.json'), 'utf8'));
const NBSP = ' ';
const PROTECT = /\{[^}]*\}|https?:\/\/\S+|[\w.-]+@[\w.-]+/g;
const RX = {}, RB = {};
for (const l of ['ru', 'es', 'en']) {
  const alt = W[l].slice().sort((a, b) => b.length - a.length).join('|');
  RX[l] = new RegExp(`(?<![\\p{L}\\p{N}_.@/:'’-])(${alt}) (?=[\\p{L}\\p{N}«"“'‘¿¡({])`, 'giu');
  const b = (W.before || {})[l] || [];
  RB[l] = b.length ? new RegExp(`(?<=[\\p{L}\\p{N}»”"')]) (${b.join('|')})(?![\\p{L}\\p{N}_'’-])`, 'giu') : null;
}
function glue(text, lang) {
  if (!RX[lang]) return text;
  const guards = [];
  let out = text.replace(PROTECT, (s) => { guards.push(s); return `\u0000${guards.length - 1}\u0000`; });
  // дважды: «и в доме» — второе слово идёт сразу после NBSP первого
  for (let i = 0; i < 2; i++) out = out.replace(RX[lang], (_, w) => w + NBSP);
  if (RB[lang]) out = out.replace(RB[lang], (_, w) => NBSP + w);
  out = out.replace(/ (?=—)/g, NBSP);
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => guards[+i]);
}
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
// Язык текста — ближайший lang у элемента-предка (<html lang>, <p lang="es"> у оригинала перевода и т. п.).
function glueHtml(html, lang) {
  const st = [{n: '#root', l: lang || 'ru'}];
  const cur = () => st[st.length - 1].l;
  let skip = null;
  return html.replace(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g, (t) => {
    if (t.startsWith('<!')) return t;
    if (t.startsWith('</')) {
      const nm = t.slice(2, -1).trim().toLowerCase();
      if (skip && nm === skip) skip = null;
      for (let i = st.length - 1; i > 0; i--) if (st[i].n === nm) { st.length = i; break; }
      return t;
    }
    if (t.startsWith('<')) {
      if (skip) return t;
      const m = /^<([a-zA-Z0-9-]+)/.exec(t);
      if (!m) return t;
      const nm = m[1].toLowerCase();
      if (nm === 'script' || nm === 'style') { skip = nm; return t; }
      const la = (/\blang="(ru|es|en)"/.exec(t) || [])[1];
      if (!VOID.has(nm) && !t.endsWith('/>')) st.push({n: nm, l: la || cur()});
      return t.replace(/\bdata-(es|en|ru)="([^"]*)"/g, (_, l, v) => `data-${l}="${glue(v, l)}"`);
    }
    return skip ? t : glue(t, cur());
  });
}
module.exports = { glue, glueHtml, NBSP };
