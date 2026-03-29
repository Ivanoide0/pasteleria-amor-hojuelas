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