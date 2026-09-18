import { version, providers } from "./release.js";
const languages = { en:'English', 'zh-CN':'中文(简体)', 'zh-TW':'中文(繁體)', de:'Deutsch', es:'Español', fr:'Français', id:'Indonesia', it:'Italiano', ja:'日本語', ko:'한국어', pt:'Português', ru:'Русский', th:'ภาษาไทย', tr:'Türkçe', vi:'Tiếng Việt' };
const languageTrigger = document.querySelector('#language');
const languageMenu = document.querySelector('#language-menu');
const languageLabel = document.querySelector('#language-label');
const languageGrid = document.querySelector('#language-grid');
let messages = {}, languageRequest = 0, activeOS = 'unix', copyTimer;
const catalogCache = new Map();
const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key,value) { try { localStorage.setItem(key,value); } catch { /* Preferences still work without storage. */ } } };
const t = key => messages[key] || key;

function resolveLanguage(value) {
  if (!value) return '';
  const normalized = value.replaceAll('_','-').toLowerCase();
  const exact = Object.keys(languages).find(key => key.toLowerCase() === normalized);
  if (exact) return exact;
  if (normalized.startsWith('zh')) return /(?:tw|hk|mo|hant)/.test(normalized) ? 'zh-TW' : 'zh-CN';
  const base = normalized.split('-')[0];
  return Object.hasOwn(languages,base) ? base : '';
}

for (const [code, label] of Object.entries(languages)) {
  const option = document.createElement('button'); option.type = 'button'; option.lang = code;
  option.textContent = label; option.dataset.language = code; option.tabIndex = -1;
  option.setAttribute('role','menuitemradio'); option.setAttribute('aria-checked','false');
  const check = document.createElementNS('http://www.w3.org/2000/svg','svg');
  check.classList.add('icon'); check.setAttribute('aria-hidden','true');
  const use = document.createElementNS('http://www.w3.org/2000/svg','use'); use.setAttribute('href','#check');
  check.append(use); option.append(check);
  option.addEventListener('click',() => { closeLanguageMenu(true); setLanguage(code,true); });
  languageMenu.append(option);
  const button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.lang = code; button.dataset.language = code; button.setAttribute('aria-pressed','false');
  button.addEventListener('click', () => setLanguage(code,true)); languageGrid.append(button);
}
for (const [slug, name] of providers) {
  const provider = document.createElement('div'); provider.className = 'provider';
  const logo = document.createElement('img'); logo.src = `./assets/providers/${slug}.png`; logo.alt = ''; logo.width = 28; logo.height = 28; logo.loading = 'lazy';
  const label = document.createElement('span'); label.textContent = name; provider.append(logo,label); document.querySelector('#provider-grid').append(provider);
}

async function catalog(code) {
  if (!catalogCache.has(code)) {
    const response = await fetch(`./locales/${code}.json`);
    if (!response.ok) throw new Error(`Locale ${code}: ${response.status}`);
    catalogCache.set(code, await response.json());
  }
  return catalogCache.get(code);
}
async function setLanguage(code, remember = false) {
  if (!Object.hasOwn(languages,code)) return;
  const request = ++languageRequest;
  try {
    const next = await catalog(code);
    if (request !== languageRequest) return;
    messages = next;
    document.documentElement.lang = code;
    document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = t(element.dataset.i18n); });
    document.title = t('title');
    document.querySelector('meta[name=description]').content = t('intro');
    languageLabel.textContent = languages[code]; languageLabel.lang = code;
    languageTrigger.setAttribute('aria-label',`${t('language')}: ${languages[code]}`);
    languageMenu.setAttribute('aria-label',t('language'));
    languageMenu.querySelectorAll('[role=menuitemradio]').forEach(option => option.setAttribute('aria-checked',String(option.dataset.language === code)));
    document.querySelector('.main-nav').setAttribute('aria-label',t('navigation'));
    document.querySelector('.console-preview').setAttribute('aria-label',t('preview'));
    document.querySelector('.demo-tabs').setAttribute('aria-label',t('preview'));
    document.querySelector('.os-tabs').setAttribute('aria-label',t('os'));
    document.querySelector('footer a:last-child').textContent = t('license');
    languageGrid.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.language === code)));
    syncTheme();
    if (remember) {
      storage.set('polaris-site-language',code);
      const url = new URL(location.href); url.searchParams.set('lang',code); history.replaceState(null,'',url);
      document.querySelector('#announcement').textContent = languages[code];
    }
  } catch (error) {
    if (request !== languageRequest) return;
    console.error(error);
    document.querySelector('#announcement').textContent = `${languages[code]}: ${t('loadError')}`;
    if (!Object.keys(messages).length && code !== 'en') await setLanguage('en');
  }
}
function closeLanguageMenu(restoreFocus = false) {
  languageMenu.hidden = true;
  languageTrigger.setAttribute('aria-expanded','false');
  if (restoreFocus) languageTrigger.focus({preventScroll:true});
}
function focusLanguageOption(option) {
  option.focus({preventScroll:true});
  option.scrollIntoView({block:'nearest',behavior:'instant'});
}
function openLanguageMenu() {
  languageMenu.hidden = false;
  languageTrigger.setAttribute('aria-expanded','true');
  focusLanguageOption(languageMenu.querySelector('[aria-checked=true]') || languageMenu.firstElementChild);
}
languageTrigger.addEventListener('click',() => {
  if (languageMenu.hidden) openLanguageMenu(); else closeLanguageMenu();
});
languageTrigger.addEventListener('keydown',event => {
  if (['ArrowDown','ArrowUp'].includes(event.key)) { event.preventDefault(); openLanguageMenu(); }
});
let typeahead = '', typeaheadTimer;
languageMenu.addEventListener('keydown',event => {
  const options = [...languageMenu.querySelectorAll('[role=menuitemradio]')];
  const index = options.indexOf(document.activeElement);
  let next;
  if (event.key === 'ArrowDown') next = (index+1)%options.length;
  if (event.key === 'ArrowUp') next = (index-1+options.length)%options.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = options.length-1;
  if (next !== undefined) { event.preventDefault(); focusLanguageOption(options[next]); }
  else if (event.key === 'Escape') { event.preventDefault(); closeLanguageMenu(true); }
  else if (event.key === 'Tab') {
    // Return to the trigger before the browser performs its normal Tab movement.
    closeLanguageMenu(true);
  } else if (event.key.length === 1 && event.key !== ' ' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault();
    typeahead += event.key.toLocaleLowerCase(); clearTimeout(typeaheadTimer);
    const match = options.find(option => option.textContent.trim().toLocaleLowerCase().startsWith(typeahead));
    if (match) focusLanguageOption(match);
    typeaheadTimer = setTimeout(() => { typeahead = ''; },600);
  }
});
document.addEventListener('pointerdown',event => {
  if (!event.target.closest('.language-control')) closeLanguageMenu();
});
document.addEventListener('focusin',event => {
  if (!event.target.closest('.language-control')) closeLanguageMenu();
});
window.addEventListener('popstate',() => setLanguage(resolveLanguage(new URL(location.href).searchParams.get('lang')) || resolveLanguage(storage.get('polaris-site-language')) || 'en'));
function syncTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  document.querySelector('#theme').setAttribute('aria-label',t(dark ? 'themeLight' : 'themeDark'));
  document.querySelector('#theme use').setAttribute('href',dark ? '#sun' : '#moon');
  document.querySelector('meta[name=theme-color]').content = dark ? '#121212' : '#ffffff';
}
function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.add('theme-changing');
  root.dataset.theme = theme;
  syncTheme();
  // Resolve the new palette without transitions before restoring hover effects.
  void root.offsetHeight;
  root.classList.remove('theme-changing');
}
document.querySelector('#theme').addEventListener('click',() => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next); storage.set('polaris-site-theme',next);
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',event => {
  if (!storage.get('polaris-site-theme')) applyTheme(event.matches ? 'dark' : 'light');
});
function setupTabs(container, onSelect) {
  const tabs = [...container.querySelectorAll('[role=tab]')];
  function select(tab) {
    tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected',String(selected)); item.tabIndex = selected ? 0 : -1; });
    onSelect(tab);
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click',() => select(tab));
    tab.addEventListener('keydown',event => {
      let next;
      if (['ArrowRight','ArrowDown'].includes(event.key)) next = (index+1)%tabs.length;
      if (['ArrowLeft','ArrowUp'].includes(event.key)) next = (index-1+tabs.length)%tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length-1;
      if (next !== undefined) { event.preventDefault(); select(tabs[next]); tabs[next].focus(); }
    });
  });
}
setupTabs(document.querySelector('.demo-tabs'),tab => {
  document.querySelectorAll('.console-content > section').forEach(panel => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
});
function renderCommands() {
  const copy = activeOS === 'windows' ? 'Copy-Item deploy/compose.env.example .env' : 'cp deploy/compose.env.example .env';
  const ready = activeOS === 'windows' ? 'Invoke-WebRequest http://127.0.0.1:4283/ready' : 'curl --fail http://127.0.0.1:4283/ready';
  document.querySelector('#install-code').textContent = `git clone --branch v${version} --depth 1 https://github.com/nguywnben/polaris.git\ncd polaris\n${copy}\ndocker compose -f deploy/docker-compose.yml config --quiet\ndocker compose -f deploy/docker-compose.yml pull\ndocker compose -f deploy/docker-compose.yml up --detach --wait --wait-timeout 60\ndocker compose -f deploy/docker-compose.yml ps\n${ready}`;
}
setupTabs(document.querySelector('.os-tabs'),tab => {
  activeOS = tab.dataset.os; document.querySelector('#install-code-panel').setAttribute('aria-labelledby',tab.id); renderCommands();
});
document.querySelector('#copy').addEventListener('click',async () => {
  const button = document.querySelector('#copy');
  const feedback = document.querySelector('#copy-feedback');
  button.disabled = true;
  let deadline;
  try {
    await Promise.race([
      navigator.clipboard.writeText(document.querySelector('#install-code').textContent),
      new Promise((_,reject) => { deadline = setTimeout(() => reject(new Error('Clipboard unavailable')),1800); })
    ]);
    button.querySelector('span').textContent = t('copied'); document.querySelector('#announcement').textContent = t('copied');
    feedback.hidden = true;
    clearTimeout(copyTimer); copyTimer = setTimeout(() => { button.querySelector('span').textContent = t('copy'); },2000);
  } catch {
    const range = document.createRange(); range.selectNodeContents(document.querySelector('#install-code'));
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
    feedback.textContent = t('copyError'); feedback.hidden = false;
    document.querySelector('#announcement').textContent = t('copyError');
  } finally { clearTimeout(deadline); button.disabled = false; }
});
renderCommands();
const initialLanguage = resolveLanguage(new URL(location.href).searchParams.get('lang')) || resolveLanguage(storage.get('polaris-site-language')) || navigator.languages.map(resolveLanguage).find(Boolean) || 'en';
await setLanguage(initialLanguage);
