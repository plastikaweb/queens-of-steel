import { translations } from './translations.js';

let currentSection = 'home';
let locationMarker = null;

function updateTitle(lang) {
  if (!translations[lang]) return;

  const titleKey = `title_${currentSection}`;
  if (translations[lang][titleKey]) {
    document.title = translations[lang][titleKey];
  }
}

function setLang(lang) {
  if (!translations[lang]) return;

  document.documentElement.lang = lang;

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

  updateTitle(lang);
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && translations[lang].meta_description) {
    metaDesc.setAttribute('content', translations[lang].meta_description);
  }

  // Update map popup if it exists
  if (locationMarker && translations[lang].location_address) {
     locationMarker.setPopupContent(`<b>Palau Alòs</b><br>${translations[lang].location_address}`);
  }

  // Update aria-labels for language buttons
  const langLabels = {
    es: 'lang_es',
    ca: 'lang_ca',
    en: 'lang_en'
  };

  Object.entries(langLabels).forEach(([l, key]) => {
    const label = translations[lang][key];
    if (label) {
      document.querySelectorAll(`#btn-${l}, .btn-${l}-mob`).forEach(btn => {
        btn.setAttribute('aria-label', label);
      });
    }
  });

  const newUrl = new URL(window.location);
  newUrl.searchParams.set('lang', lang);
  window.history.pushState({}, '', newUrl);
}

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

function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  const palauAlosCoords = [41.384261, 2.178873];
  const map = L.map('map').setView(palauAlosCoords, 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  
  const address = translations[document.documentElement.lang]?.location_address || 'c/ Sant Pere Més Baix 55, 08003 Barcelona';

  locationMarker = L.marker(palauAlosCoords)
    .addTo(map)
    .bindPopup(`<b>Palau Alòs</b><br>${address}`)
    .openPopup();
}
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initLanguageSwitcher();
  initMap();
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');
  let currentLang = 'es';

  if (langParam && translations[langParam]) {
    currentLang = langParam;
  }
  setLang(currentLang);

  // Dynamic Title Observer
  const sections = document.querySelectorAll('section, header');
  const titleObserver = new IntersectionObserver(
    entries => {
      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let mostVisibleSection = null;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target;
        }
      });

      // Update only if we found a visible section
      if (mostVisibleSection) {
        const id = mostVisibleSection.id;
        currentSection = id;

        updateTitle(document.documentElement.lang);

        // Update URL hash while preserving language parameter
        const newUrl = new URL(window.location);
        newUrl.hash = id;
        window.history.replaceState({}, '', newUrl);

        document.querySelectorAll('.nav-menu a, .nav-main > a').forEach(link => {
          link.classList.remove('selected');
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('selected');
          }
        });
      }
    },
    { 
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '-20% 0px -60% 0px' 
    }
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
  },
  {
    threshold: 0,
    rootMargin: '200px 0px -100px 0px'
  }
);

  document.querySelectorAll('.band-card, .mercadillo-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.3s ease-out';
    revealObserver.observe(el);
  });
});

