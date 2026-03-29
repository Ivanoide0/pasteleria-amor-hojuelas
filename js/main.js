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
