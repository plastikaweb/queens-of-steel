const translations = {
    ca: {
        date: "7 DE MARÇ",
        date_label: "DATA",
        time_label: "HORARI",
        time_value: "17:00h",
        price_label: "PREU",
        price_value: "Taquilla inversa (aportació recomanada 5€)",
        extras_label: "EXTRES",
        extras_value: "Menjar vegà i beguda a preus populars",
        nav_concerts: "LINE UP",
        nav_activities: "ACTIVITATS",
        nav_20years: "20 ANYS",
        nav_participate: "PARTICIPA",
        nav_location: "ON ÉS?",
        noise_title: "20 ANYS DE SOROLL I RESISTÈNCIA",
        noise_desc: "Dues dècades demostrant que el metall no té gènere. La nostra veu és gutural, la nostra presència inesborrable. Contra el patriarcat, volum al màxim. Som les reines de l'acer i hem vingut a fer tremolar els fonaments.",
        activities_title: "ACTIVITATS",
        act_fascismo_title: "METAL FRENTE AL FASCISMO",
        act_fascismo_desc: "Un conversatori sobre la història, la resistència i l'activisme dins l'escena extrema.",
        act_fascismo_speakers_title: "Un conversatori amb:",
        act_fascismo_speakers: "Raquel García<br><small>(fotògrafa i fundadora de Rockin' Ladies)</small><br>Emilio Casal<br><small>(Bocc, Tugurio i Veratre)</small><br>i dinamitzada per Sol",
        act_fascismo_schedule_title: "Dissabte 7 de març",
        act_fascismo_schedule: "17:30h @ Palau Alós",
        help_title: "ENS DÓNES UN COP DE MÀ?",
        help_desc: "Busquem gent per l'equip de treball. Sense vosaltres això no seria possible. T'apuntes a fer un torn?",
        role_bar: "BARRA",
        role_stage: "ESCENARI",
        role_access: "ACCÉS",
        role_logistics: "LOGÍSTICA",
        role_transport: "TRANSPORT",
        write_us: "ESCRIU-NOS",
        location_title: "ON ÉS?",
        footer_design: "Dissenyat per la Causa. Autogestió sempre."
    },
    es: {
        date: "7 DE MARZO",
        date_label: "FECHA",
        time_label: "HORARIO",
        time_value: "17:00h",
        price_label: "PRECIO",
        price_value: "Taquilla inversa (aportación recomendada 5€)",
        extras_label: "EXTRAS",
        extras_value: "Comida vegana y bebida a precios populares",
        nav_concerts: "LINE UP",
        nav_activities: "ACTIVIDADES",
        nav_20years: "20 AÑOS",
        nav_participate: "PARTICIPA",
        nav_location: "¿DÓNDE ES?",
        noise_title: "20 AÑOS DE RUIDO Y RESISTENCIA",
        noise_desc: "Dos décadas demostrando que el metal no tiene género. Nuestra voz es gutural, nuestra presencia imborrable. Contra el patriarcado, volumen al máximo. Somos las reinas del acero y hemos venido a hacer temblar los cimientos.",
        activities_title: "ACTIVIDADES",
        act_fascismo_title: "METAL FRENTE AL FASCISMO",
        act_fascismo_desc: "Un conversatorio sobre la historia, la resistencia y el activismo dentro de la escena extrema.",
        act_fascismo_speakers_title: "Un conversatorio con:",
        act_fascismo_speakers: "Raquel García<br><small>(fotógrafa y fundadora de Rockin' Ladies)</small><br>Emilio Casal<br><small>(Bocc, Tugurio y Veratre)</small><br>y dinamizada por Sol",
        act_fascismo_schedule_title: "Sábado 7 de marzo",
        act_fascismo_schedule: "17:30h @ Palau Alós",
        help_title: "¿NOS ECHAS UNA MANO?",
        help_desc: "Buscamos gente para el equipo de trabajo. Sin vosotrxs esto no sería posible. ¿Te apuntas a hacer un turno?",
        role_bar: "BARRA",
        role_stage: "ESCENARIO",
        role_access: "ACCESO",
        role_logistics: "LOGÍSTICA",
        role_transport: "TRANSPORTE",
        write_us: "ESCRÍBENOS",
        location_title: "¿DÓNDE ES?",
        footer_design: "Diseñado por la Causa. Autogestión siempre."
    }
};

function setLang(lang) {
    if (!translations[lang]) return;

    document.documentElement.lang = lang;
    
    // Update buttons
    document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('btn-' + lang).classList.add('active');

    // Update text content
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update URL without reloading
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('lang', lang);
    window.history.pushState({}, '', newUrl);
}

// Check URL for language param on load
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    
    if (langParam && translations[langParam]) {
        setLang(langParam);
    } else {
        // Default to Spanish if no param or invalid
        setLang('es');
    }
});

// El smooth scroll es gestiona nativament per CSS (scroll-behavior: smooth)
// per permetre que els hashes es reflecteixin a la URL.

// Simple Reveal on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Aplica l'animació a les cards
document.querySelectorAll('.band-card').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Inicialització del mapa Leaflet
function initMap() {
    const palauAlosCoords = [41.384261, 2.178873];
    const map = L.map('map').setView(palauAlosCoords, 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(palauAlosCoords).addTo(map)
        .bindPopup('<b>Palau Alòs</b><br>c/ Sant Pere Més Baix 55, 08003 Barcelona')
        .openPopup();
}

// Inicialitza el mapa quan el contingut s'ha carregat
document.addEventListener('DOMContentLoaded', initMap);
