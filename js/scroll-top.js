// Bouton "retour en haut" : apparaît après avoir scrollé, ramène en haut de page
const backBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backBtn.classList.add('show');
  } else {
    backBtn.classList.remove('show');
  }
});

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
