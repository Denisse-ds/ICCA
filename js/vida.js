/* ==========================================================================
   LÓGICA INTERACTIVA COMPLETA - VIDA.JS
   ========================================================================== */

const WHATSAPP_PHONE = "523120000000";

document.addEventListener('DOMContentLoaded', () => {

    // 1. Menú Móvil
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Event Listener para el Formulario de Contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // 3. Protección de Imágenes (Clic Derecho)
    const protectedImages = document.querySelectorAll('.protected-img');
    protectedImages.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            alert('Protección de Propiedad Intelectual: El menú contextual está restringido en la Galería de ICCA.');
        });
    });

});

/* ==========================================================================
   Manejo y Validación del Formulario de Contacto
   ========================================================================== */
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value.trim();
    const feedback = document.getElementById('form-feedback');

    // Validación simple
    if (name.length < 3 || message.length < 5) {
        feedback.className = "mt-4 p-4 font-mono text-xs rounded-sm bg-crimson/20 border border-crimson text-crimsonbright block";
        feedback.innerText = "Por favor, complete todos los campos obligatorios correctamente.";
        return;
    }

    // Respuesta exitosa
    feedback.className = "mt-4 p-4 font-mono text-xs rounded-sm bg-emerald-900/30 border border-emerald-500 text-emerald-400 block";
    feedback.innerText = `¡Gracias, ${name}! Tu mensaje sobre "${subject}" ha sido procesado de forma segura. El equipo de ICCA se pondrá en contacto pronto.`;

    // Limpiar formulario
    document.getElementById('contact-form').reset();
}

/* ==========================================================================
   Lectura por Voz (Audioguía)
   ========================================================================== */
function playTTS(elementId, titleName) {
    const textElement = document.getElementById(elementId);
    if (!textElement) return;

    const textToRead = textElement.innerText;

    if (!('speechSynthesis' in window)) {
        alert('Tu navegador no soporta lectura por voz.');
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    utterance.pitch = 0.9;

    window.speechSynthesis.speak(utterance);
}

/* ==========================================================================
   Filtro de Obras de Archivo
   ========================================================================== */
function filterArchive(category) {
    const items = document.querySelectorAll('.archive-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

/* ==========================================================================
   Modal e Integración con WhatsApp
   ========================================================================== */
function openArtworkModal(title, tech, dim, year, status, imgUrl, descId) {
    const modal = document.getElementById('artwork-modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-tech').innerText = tech;
    document.getElementById('modal-dim').innerText = dim;
    document.getElementById('modal-year').innerText = year;
    document.getElementById('modal-img').src = imgUrl;

    const statusEl = document.getElementById('modal-status');
    statusEl.innerText = status;
    
    if (status.toLowerCase().includes('disponible')) {
        statusEl.className = "inline-block font-mono text-[10px] px-2 py-0.5 uppercase bg-crimson text-ivory";
    } else {
        statusEl.className = "inline-block font-mono text-[10px] px-2 py-0.5 uppercase bg-muted text-ivory";
    }

    document.getElementById('modal-tts-btn').onclick = () => playTTS(descId, title);
    document.getElementById('modal-wa-btn').onclick = () => sendWhatsAppInquiry(title);

    modal.classList.remove('hidden');
}

function closeArtworkModal() {
    const modal = document.getElementById('artwork-modal');
    modal.classList.add('hidden');
    window.speechSynthesis.cancel();
}

function sendWhatsAppInquiry(workTitle) {
    const message = encodeURIComponent(`Hola ICCA, me gustaría solicitar más detalles sobre "${workTitle}".`);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, '_blank');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeArtworkModal();
});