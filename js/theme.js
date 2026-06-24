// Bascule mode sombre / clair (mémorisé dans le navigateur)
const themeToggle = document.getElementById('themeToggle');

function appliquerTheme(sombre) {
  document.body.classList.toggle('dark', sombre);
  themeToggle.textContent = sombre ? '☀️' : '🌙';
  themeToggle.setAttribute(
    'aria-label',
    sombre ? 'Passer en mode clair' : 'Passer en mode sombre'
  );
}

// Au chargement : on relit le choix précédent
appliquerTheme(localStorage.getItem('theme') === 'dark');

themeToggle.addEventListener('click', () => {
  const sombre = !document.body.classList.contains('dark');
  appliquerTheme(sombre);
  localStorage.setItem('theme', sombre ? 'dark' : 'light');
});
