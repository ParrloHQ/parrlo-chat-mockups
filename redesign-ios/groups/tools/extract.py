# Извлекает тексты экранов пакета «группы» из старых макетов frames/{ru,es,en}-<экран>.html (фигура __pro-n)
# и сопоставляет их по порядку: ru → es/en. Результат — strings.json (ключ — ru-текст, nbsp → пробел).
# Запуск: python3 redesign-ios/groups/tools/extract.py
import re, json, os, html as H
from html.parser import HTMLParser
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
S = "group group-syslines group-create group-photo group-invite group-invite-reset group-join group-join-wait group-join-done group-join-declined group-join-invalid group-members group-members-menu group-members-remove group-members-empty group-admin-you group-admin-changed group-leave-confirm group-limit group-limit-inline group-parrlo group-parrlo-off group-ai-info admin-transfer admin-transfer-confirm admin-transfer-done group-successor group-successor-confirm group-call group-call-full".split()
class P(HTMLParser):
    def __init__(s): super().__init__(convert_charrefs=True); s.out = []; s.skip = 0
    def handle_starttag(s, t, a):
        if t in ('br', 'img', 'input', 'meta', 'link', 'hr'): return
        if s.skip or t in ('svg', 'style', 'script'): s.skip += 1; return
        for k, v in a:
            if k in ('aria-label', 'placeholder') and v: s.out.append(v)
    def handle_endtag(s, t):
        if s.skip and t not in ('br', 'img', 'input', 'meta', 'link', 'hr'): s.skip -= 1
    def handle_data(s, x):
        if not s.skip and x.strip(): s.out.append(x.strip())
def texts(l, s):
    f = open(f'{ROOT}/frames/{l}-{s}.html', encoding='utf-8').read()
    m = re.search(r'<figure class="fig" data-id="[^"]*__pro-n".*?</figure>', f, re.S)
    p = P(); p.feed(m.group(0)); return p.out
norm = lambda x: re.sub(r'\s+', ' ', x.replace(' ', ' ')).strip()
M = {}
for s in S:
    r, e, n = (texts(l, s) for l in ('ru', 'es', 'en'))
    assert len(r) == len(e) == len(n), s
    for a, b, c in zip(r, e, n):
        M.setdefault(norm(a), {'ru': a, 'es': b, 'en': c})
json.dump(M, open(os.path.join(os.path.dirname(__file__), 'strings.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print(len(M), 'строк')
