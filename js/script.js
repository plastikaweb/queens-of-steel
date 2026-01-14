const translations = {
    ca: {
        date: "7 DE MARÇ",
        tickets: "ENTRADES DISPONIBLES",
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
        collective_desc: "Espai per a col·lectius, distris i material polític.",
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
        tickets: "ENTRADAS DISPONIBLES",
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
        collective_desc: "Espacio para colectivos, distris y material político.",
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

// Un petit script per fer smooth scroll si el navegador no ho suporta nativament o per afegir efectes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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
