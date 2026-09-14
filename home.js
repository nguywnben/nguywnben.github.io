export const messages = {
  en: {
    title: 'Projects — nguywnben',
    meta: 'Explore projects by nguywnben. Each project has its own space for features, documentation and source code.',
    skip: 'Skip to content', home: 'nguywnben — Home', navigation: 'Main navigation', language: 'Language',
    eyebrow: 'Projects by nguywnben', hero1: 'From ideas.', hero2: 'To useful things.',
    intro: 'A home for the projects I build. Each one has its own space to explore, get started and dive into the source.',
    explore: 'Explore the projects', projects: 'Projects', count: '01 project', category: 'Tools for developers',
    tagline: 'Every model. One connection.',
    description: 'Connect AI coding tools to multiple providers through one self-hosted gateway. Polaris handles routing, protocol translation and automatic fallback.',
    highlights: 'Polaris highlights', open: 'Open source', selfHosted: 'Self-hosted', languages: '15 languages',
    discover: 'Explore Polaris', source: 'Source code',
    diagram: 'Polaris connects AI tools to OpenAI, Anthropic and Google.', diagramTitle: 'POLARIS / CONNECTIONS',
    tools: 'AI tools', diagramNote: 'One gateway. More possibilities.',
    follow: 'Curious about what I’m building?', visitGithub: 'Find me on GitHub', footer: 'A place for ideas.', websiteSource: 'Website source'
  },
  vi: {
    title: 'Dự án — nguywnben',
    meta: 'Khám phá các dự án của nguywnben. Mỗi dự án có một không gian riêng để tìm hiểu tính năng, tài liệu và mã nguồn.',
    skip: 'Đến nội dung chính', home: 'nguywnben — Trang chủ', navigation: 'Điều hướng chính', language: 'Ngôn ngữ',
    eyebrow: 'Góc dự án của nguywnben', hero1: 'Từ ý tưởng.', hero2: 'Đến những thứ hữu ích.',
    intro: 'Nơi tập hợp các dự án tôi xây dựng. Mỗi dự án có một trang riêng để bạn khám phá, bắt đầu sử dụng và tìm hiểu mã nguồn.',
    explore: 'Khám phá các dự án', projects: 'Dự án', count: '01 dự án', category: 'Công cụ dành cho lập trình viên',
    tagline: 'Mọi mô hình. Một điểm kết nối.',
    description: 'Kết nối các công cụ lập trình AI với nhiều nhà cung cấp qua một gateway tự triển khai. Polaris lo định tuyến, chuyển đổi giao thức và tự động dự phòng.',
    highlights: 'Đặc điểm của Polaris', open: 'Mã nguồn mở', selfHosted: 'Tự triển khai', languages: '15 ngôn ngữ',
    discover: 'Khám phá Polaris', source: 'Mã nguồn',
    diagram: 'Polaris kết nối công cụ AI với OpenAI, Anthropic và Google.', diagramTitle: 'POLARIS / KẾT NỐI',
    tools: 'Công cụ AI', diagramNote: 'Một gateway. Nhiều khả năng.',
    follow: 'Muốn xem những gì tôi đang xây dựng?', visitGithub: 'Ghé qua GitHub', footer: 'Một nơi cho những ý tưởng.', websiteSource: 'Mã nguồn website'
  }
};

function supportedLanguage(value) {
  const base = String(value || '').toLowerCase().split(/[-_]/)[0];
  return Object.hasOwn(messages, base) ? base : '';
}

export function resolveLanguage(query, saved, browserLanguages = []) {
  return supportedLanguage(query) || supportedLanguage(saved) || browserLanguages.map(supportedLanguage).find(Boolean) || 'en';
}

function savedLanguage() {
  try { return localStorage.getItem('nguywnben-home-language'); } catch { return null; }
}

function renderLanguage(language) {
  const copy = messages[language];
  document.documentElement.lang = language;
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.meta;
  document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = copy[element.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-label]').forEach(element => { element.setAttribute('aria-label', copy[element.dataset.i18nLabel]); });
  document.querySelectorAll('[data-language]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.language === language)); });
  document.querySelectorAll('[data-project-link]').forEach(link => {
    const url = new URL(link.href);
    url.searchParams.set('lang', language);
    link.href = url.href;
  });
}

if (typeof document !== 'undefined') {
  const currentLanguage = () => resolveLanguage(new URL(location.href).searchParams.get('lang'), savedLanguage(), navigator.languages || [navigator.language]);
  renderLanguage(currentLanguage());
  document.querySelector('.language-switch').hidden = false;
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    const language = button.dataset.language;
    renderLanguage(language);
    try { localStorage.setItem('nguywnben-home-language', language); } catch { /* Language switching also works without storage. */ }
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
  }));
  window.addEventListener('popstate', () => renderLanguage(currentLanguage()));
}
