# Queens of Steel Fest 2026

**20 Years of Noise and Resistance** | **20 Anys de Soroll i Resistència**

Official website for Queens of Steel Fest 2026, celebrating 20 years of women in metal, punk, and hardcore music in Barcelona.

## 🎸 About the Event

Queens of Steel Fest is a Barcelona-based festival celebrating two decades of demonstrating that metal has no gender. This anniversary edition brings together powerful voices from the extreme music scene for a day of concerts, workshops, and community building.

### Event Details

- **Date:** March 7, 2026 (07/03/2026)
- **Time:** 17:00h
- **Price:** Reverse Box Office / Voluntary Donation (Recommended 5€)
- **Extras:** Vegan food and drinks at popular prices
- **Location:** Palau Alòs, c/ Sant Pere Més Baix 55, 08003 Barcelona
- **Website:** [www.queensfest.org](https://www.queensfest.org)

## 🎤 Line-Up

The festival features five all-women bands representing different styles of extreme music:

- **TUGURIO** - Sludge/death
- **SACROSANCTA DECADENCIA OCCIDENTAL** - Stench/Crust/Death
- **SAYÓN** - Stenchcore/crust
- **MATER TENEBRARUM** - Doom goth
- **IMPÍA** - Raw D-beat / Metallic Punk

## 🛠️ Activities

- **Metal Against Fascism** - A conversation about history, resistance, and activism within the extreme scene.
- **Feminist Market (Mercadillo DIY)** - Featuring independent distribution, crafts, jewelry, and illustration.

## 🌐 Website Features

### Multilingual Support (ES/CA/EN)

The site is fully bilingual/trilingual, supporting Spanish, Catalan, and English. It uses a custom JavaScript implementation (`public/js/translations.js`) that:

- Switches content dynamically using `data-key` attributes.
- Persists language selection via URL parameters (`?lang=en`, `?lang=es`, or `?lang=ca`).
- Automatically detects the user's preferred language on first load.
- Updates page title, meta descriptions, and ARIA attributes for accessibility.

### Modern UX & Animations

- **Reveal on Scroll:** Band cards and sections smoothly fade and slide into view as the user scrolls.
- **Smooth Navigation:** Internal links use smooth-scroll behavior.
- **Responsive Layout:** A mobile-first approach ensuring the gritty aesthetic works on all screen sizes.
- **Micro-interactions:** Hover effects, refined button states, and custom mobile menu.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Build Tool:** Vite 6.x
- **Fonts:** Black Ops One, Courier Prime (Google Fonts)
- **Maps:** Leaflet.js (OpenStreetMap)
- **Deployment:** GitHub Pages
- **Domain:** Custom domain via CNAME

## 🚀 Development

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Scripts

```bash
# Start development server (default port: 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```text
queens-of-steel/
├── public/                 # Static assets served by Vite
│   ├── css/
│   │   ├── components/     # Reusable UI components (nav, buttons, cards)
│   │   ├── global/         # Global styles (variables, reset, typography)
│   │   ├── sections/       # Section-specific styles (hero, activities, etc.)
│   │   └── style.css       # Main entry point importing all CSS modules
│   ├── img/                # Optimized band visuals & event graphics
│   ├── js/
│   │   ├── script.js       # Core logic (DOM, events, animations)
│   │   └── translations.js # Language data module
│   ├── CNAME               # Custom domain configuration
│   ├── .nojekyll           # Bypasses Jekyll for GitHub Pages
│   └── favicon.png
├── index.html              # Main semantic HTML structure
├── vite.config.js          # Vite configuration & build optimization
├── package.json            # Dependencies & scripts
└── README.md               # Project documentation
```

## 🌍 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when pushed to the main branch.

- **Production URL:** [https://www.queensfest.org](https://www.queensfest.org)
- **GitHub Pages URL:** [https://plastikaweb.github.io/queens-of-steel/](https://plastikaweb.github.io/queens-of-steel/)

## 🎨 Design Philosophy

The website embodies the DIY punk aesthetic with:

- **Gritty textures** and torn paper separators
- **High contrast** black background with vibrant accent colors
- **Bold typography** using industrial and typewriter-style fonts
- **Raw imagery** featuring the bands and event graphics
- **Minimalist navigation** for quick access to key sections

## 🤝 Get Involved

The festival is looking for volunteers to help with:

- Bar service
- Stage management
- Access control
- Logistics
- Transportation

Contact: <cooperate@queensofsteel.com>

## ⚖️ Manifesto

*Two decades demonstrating that metal has no gender. Our voice is guttural, our presence indelible. Against patriarchy, volume to the max. We are the queens of steel and we have come to shake the foundations.*

*Dos décadas demostrando que el metal no tiene género. Nuestra voz es gutural, nuestra presencia imborrable. Contra el patriarcado, volumen al máximo. Somos las reinas del acero y hemos venido a hacer temblar los cimientos.*

*Dues dècades demostrant que el metall no té gènere. La nostra veu és gutural, la nostra presència inesborrable. Contra el patriarcat, volum al màxim. Som les reines de l'acer i hem vingut a fer tremolar els fonaments.*

## 📝 Credits

- **Design & Development:** [Plastikaweb](https://www.plastikaweb.com)
- **Author:** Carlos Matheu Armengol
- **Email:** <info@plastikaweb.com>

---

2026 QUEENS OF STEEL · Designed by the Cause.
