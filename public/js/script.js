import { translations } from './translations.js';

let currentSection = 'home';

function updateTitle(lang) {
  if (!translations[lang]) return;

  // Map sections to title keys
  const titleMap = {
    home: 'title_home',
    '20-anys': 'title_20years',
    concerts: 'title_concerts',
    mercadet: 'title_mercadillo',
    activitats: 'title_activities',
    voluntaris: 'title_participate',
    ubicacio: 'title_location',
  };

  const titleKey = titleMap[currentSection] || 'title_home';
  if (translations[lang][titleKey]) {
    document.title = translations[lang][titleKey];
  }
}

function setLang(lang) {
  if (!translations[lang]) return;

  document.documentElement.lang = lang;

  // Update buttons (Desktop and Mobile)
  const allButtons = document.querySelectorAll('.lang-switch button, .lang-switch-mobile button');
  allButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });

  // Select active buttons by specific classes or IDs
  const activeSelectors = [
    `#btn-${lang}`,           // Desktop ID
    `.btn-${lang}-mob`        // Mobile Class
  ];

  activeSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(btn => {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  // Update text content
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update titles on language change
  updateTitle(lang);

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && translations[lang].meta_description) {
    metaDesc.setAttribute('content', translations[lang].meta_description);
  }

  // Update URL without reloading
  const newUrl = new URL(window.location);
  newUrl.searchParams.set('lang', lang);
  window.history.pushState({}, '', newUrl);
}

// Mobile Menu Logic
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
      
      // Toggle body scroll lock
      if (isActive) {
        document.body.style.overflow = 'hidden';
        hamburger.setAttribute('aria-expanded', 'true');
        navMenu.setAttribute('aria-hidden', 'false');
      } else {
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-active');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }
}

// Initialize Language Switcher Listeners
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-switch button, .lang-switch-mobile button');
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Determine language from ID or class
      // IDs: btn-es, btn-ca, btn-en
      // Classes: btn-es-mob, btn-ca-mob, btn-en-mob
      let targetLang = 'es'; // Default

      if (btn.id && btn.id.startsWith('btn-')) {
        targetLang = btn.id.replace('btn-', '');
      } else if (btn.className.includes('btn-es-mob')) {
        targetLang = 'es';
      } else if (btn.className.includes('btn-ca-mob')) {
        targetLang = 'ca';
      } else if (btn.className.includes('btn-en-mob')) {
        targetLang = 'en';
      }

      // Check inner text if all else fails (fallback)
      if (!['es', 'ca', 'en'].includes(targetLang)) {
         const text = btn.textContent.trim().toLowerCase();
         if (text === 'es') targetLang = 'es';
         else if (text === 'ca') targetLang = 'ca';
         else if (text === 'en') targetLang = 'en';
      }
      
      setLang(targetLang);
    });
  });
}

// Initialize Map
function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  const palauAlosCoords = [41.384261, 2.178873];
  const map = L.map('map').setView(palauAlosCoords, 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(palauAlosCoords)
    .addTo(map)
    .bindPopup('<b>Palau Alòs</b><br>c/ Sant Pere Més Baix 55, 08003 Barcelona')
    .openPopup();
}

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  initMobileMenu();

  // Language Switcher
  initLanguageSwitcher();

  // Map
  initMap();

  // Initial Language Setup
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');
  let currentLang = 'es'; // Default

  if (langParam && translations[langParam]) {
    currentLang = langParam;
  }
  setLang(currentLang);

  // Dynamic Title Observer
  const sections = document.querySelectorAll('section, header');
  const titleObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'inici') currentSection = 'home';
          else if (id === 'mercadet') currentSection = 'mercadet';
          else if (id === 'activitats') currentSection = 'activitats';
          else if (id === 'voluntaris') currentSection = 'voluntaris';
          else if (id === 'ubicacio') currentSection = 'ubicacio';
          else if (id === '20-anys') currentSection = '20-anys';
          else if (id === 'concerts') currentSection = 'concerts';

          updateTitle(document.documentElement.lang);
        }
      });
    },
    { threshold: 0.51 }
  );

  sections.forEach(section => {
    titleObserver.observe(section);
  });

  // Reveal on Scroll
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  document.querySelectorAll('.band-card, .mercadillo-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(el);
  });
});

