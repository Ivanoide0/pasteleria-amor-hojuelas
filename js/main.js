const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

/* MENU */
toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

/* DROPDOWNS */
dropdowns.forEach(drop => {
  const btn = drop.querySelector('.dropdown-toggle');

  btn.addEventListener('click', () => {
    drop.classList.toggle('active');
  });
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.2
});

reveals.forEach(el => observer.observe(el));

function enviarWhatsApp() {

  const btn = document.querySelector(".btn-whatsapp");
  const status = document.getElementById("form-status");

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const tipo = document.getElementById("tipo").value;

  const numero = "529988446518";

  // VALIDACIONES
  const telRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nombre) {
    return mostrarError("Ingresa tu nombre");
  }

  if (!telRegex.test(telefono)) {
    return mostrarError("Teléfono inválido (10 dígitos)");
  }

  if (correo && !emailRegex.test(correo)) {
    return mostrarError("Correo inválido");
  }

  if (!tipo) {
    return mostrarError("Selecciona un tipo de pastel");
  }

  // LIMPIAR ERROR
  status.innerText = "";

  // ANIMACIÓN BOTÓN
  btn.classList.add("loading");
  btn.querySelector(".btn-text").innerText = "Enviando...";

  const texto = `
Hola, quiero cotizar un pastel 🎂

👤 Nombre: ${nombre}
📞 Teléfono: ${telefono}
📧 Correo: ${correo || "No proporcionado"}
🎉 Tipo: ${tipo}

📝 Detalles:
${mensaje || "Sin mensaje adicional"}
`;

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  setTimeout(() => {
    window.open(url, "_blank");

    btn.classList.remove("loading");
    btn.querySelector(".btn-text").innerText = "Enviar";

    status.innerText = "Mensaje listo para enviar en WhatsApp";
    status.style.color = "#6FCF97";

  }, 800);
}

function mostrarError(msg) {
  const status = document.getElementById("form-status");
  status.innerText = msg;
  status.style.color = "#ff4d6d";
}

document.querySelectorAll('.btn-card').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});
const track = document.querySelector('.galeria-track');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

// ==============================
// SCROLL CON LOOP
// ==============================

const scrollAmount = 350;

next.addEventListener('click', () => {
  // Si ya estás al final → vuelve al inicio
  if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
    track.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
});

prev.addEventListener('click', () => {
  // Si estás al inicio → ir al final
  if (track.scrollLeft <= 5) {
    track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }
});

// ==============================
// WHATSAPP DINAMICO
// ==============================

const buttons = document.querySelectorAll('.btn-wsp');

buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    const card = btn.closest('.galeria-item');
    const nombre = card.getAttribute('data-name');

    const mensaje = encodeURIComponent(
      `Hola, me interesa este diseño: ${nombre}. ¿Me podrías dar precio y opciones?`
    );

    window.open(`https://wa.me/529988446518?text=${mensaje}`, '_blank');
  });
});