"""Static regression checks for GitHub Pages assets and translation coverage.

Run from any directory: python polaris/tests/check_site.py
No third-party dependencies or running server required.
"""
from html.parser import HTMLParser
from pathlib import Path
import json
import re
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
LOCALES = {'en', 'zh-CN', 'zh-TW', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'pt', 'ru', 'th', 'tr', 'vi'}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.keys, self.ids, self.fragments, self.local_paths = set(), [], [], []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'data-i18n' in attrs:
            self.keys.add(attrs['data-i18n'])
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for attr in ('src', 'href'):
            value = attrs.get(attr, '')
            if value.startswith('#') and len(value) > 1:
                self.fragments.append(value[1:])
            if value.startswith('./'):
                self.local_paths.append(urlsplit(value).path)
            assert not value.startswith('/'), f'Root-absolute asset breaks /polaris hosting: {value}'


parser = PageParser()
markup = (ROOT / 'index.html').read_text(encoding='utf-8')
parser.feed(markup)
catalogs = {p.stem: json.loads(p.read_text(encoding='utf-8')) for p in (ROOT / 'locales').glob('*.json')}
assert set(catalogs) == LOCALES, 'Must match all 15 Polaris locales'
expected = set(catalogs['en'])
assert parser.keys <= expected, f'Missing HTML keys: {parser.keys - expected}'
for locale, catalog in catalogs.items():
    assert set(catalog) == expected, f'{locale}: inconsistent keys'
    assert all(isinstance(value, str) and value.strip() for value in catalog.values()), f'{locale}: empty translation'
    assert all('<' not in value for value in catalog.values()), f'{locale}: translations must be plain text'
assert len(set(parser.ids)) == len(parser.ids), 'Duplicate HTML IDs'
assert set(parser.fragments) <= set(parser.ids), 'Broken page anchor or SVG reference'
for relative in parser.local_paths:
    path = (ROOT / relative).resolve()
    assert path.is_relative_to(ROOT) and path.is_file(), f'Missing or escaping asset: {relative}'
for name in ('app.js', 'preferences.js', 'styles.css', 'index.html'):
    assert 'Omni Gateway' not in (ROOT / name).read_text(encoding='utf-8'), f'Old brand in {name}'
print(f'PASS: {len(catalogs)} locales × {len(expected)} keys; assets, anchors, IDs, branding, /polaris paths')

# A release update must keep catalog assets and installation pins coherent.
release = (ROOT / 'release.js').read_text(encoding='utf-8')
version = re.search(r'export const version = "([^"]+)"', release).group(1)
providers = json.loads(re.search(r'export const providers = (\[.*\]);', release, re.S).group(1))
assert len(providers) == 23 and len({slug for slug, _ in providers}) == 23
assert all((ROOT / f'assets/providers/{slug}.png').is_file() for slug, _ in providers)
assert all('23' in catalog['providersCopy'] for catalog in catalogs.values())
assert f'/releases/tag/v{version}' in markup
assert f'/blob/v{version}/docs/installation.md' in markup
app = (ROOT / 'app.js').read_text(encoding='utf-8')
assert 'git clone --branch v${version}' in app and 'v1.5.0' not in app
assert 'curl --fail http://127.0.0.1:4283/ready' in app
assert 'Invoke-WebRequest http://127.0.0.1:4283/ready' in app
print(f'PASS: Polaris {version}, 23 provider assets, platform readiness commands')
