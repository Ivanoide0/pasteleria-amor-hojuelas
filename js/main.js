document.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // NAVBAR
  // ==============================
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  if (dropdowns.length > 0) {
    dropdowns.forEach(drop => {
      const btn = drop.querySelector('.dropdown-toggle');
      if (btn) {
        btn.addEventListener('click', () => {
          drop.classList.toggle('active');
        });
      }
    });
  }

  // ==============================
  // ANIMACIONES SCROLL
  // ==============================
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, { threshold: 0.2 });

    reveals.forEach(el => observer.observe(el));
  }

  // ==============================
  // BOTONES CARDS (evitar conflicto click)
  // ==============================
  const btnCards = document.querySelectorAll('.btn-card');
  if (btnCards.length > 0) {
    btnCards.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
  }

  // ==============================
  // GALERÍA (SCROLL LOOP)
  // ==============================
  const track = document.querySelector('.galeria-track');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');

  const scrollAmount = 350;

  if (track && next && prev) {

    next.addEventListener('click', () => {
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });

    prev.addEventListener('click', () => {
      if (track.scrollLeft <= 5) {
        track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    });

  }

  // ==============================
  // WHATSAPP GALERÍA
  // ==============================
  const buttons = document.querySelectorAll('.btn-wsp');

  if (buttons.length > 0) {
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        const card = btn.closest('.galeria-item');
        const nombre = card?.getAttribute('data-name') || "este diseño";

        const mensaje = encodeURIComponent(
          `Hola, me interesa este diseño: ${nombre}. ¿Me podrías dar precio y opciones?`
        );

        window.open(`https://wa.me/529988446518?text=${mensaje}`, '_blank');
      });
    });
  }

});


// ==============================
// FORMULARIO WHATSAPP (GLOBAL)
// ==============================

function enviarWhatsApp() {

  const btn = document.querySelector(".btn-whatsapp");
  const status = document.getElementById("form-status");

  const nombre = document.getElementById("nombre")?.value.trim();
  const telefono = document.getElementById("telefono")?.value.trim();
  const correo = document.getElementById("correo")?.value.trim();
  const mensaje = document.getElementById("mensaje")?.value.trim();
  const tipo = document.getElementById("tipo")?.value;

  const numero = "529988446518";

  const telRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nombre) return mostrarError("Ingresa tu nombre");
  if (!telRegex.test(telefono)) return mostrarError("Teléfono inválido (10 dígitos)");
  if (correo && !emailRegex.test(correo)) return mostrarError("Correo inválido");
  if (!tipo) return mostrarError("Selecciona un tipo de pastel");

  status.innerText = "";

  if (btn) {
    btn.classList.add("loading");
    btn.querySelector(".btn-text").innerText = "Enviando...";
  }

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

  // Abrir WhatsApp
  window.open(url, "_blank");

  // Restaurar botón
  if (btn) {
    btn.classList.remove("loading");
    btn.querySelector(".btn-text").innerText = "Enviar";
  }

  status.innerText = "Redirigiendo...";
  status.style.color = "#6FCF97";

  // 🔥 REDIRECCIÓN A GRACIAS
  setTimeout(() => {
    window.location.href = "gracias.html";
  }, 1200);

}, 800);
}

function mostrarError(msg) {
  const status = document.getElementById("form-status");
  if (status) {
    status.innerText = msg;
    status.style.color = "#ff4d6d";
  }
}