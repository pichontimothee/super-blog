// Bascule mode sombre / clair (mémorisé dans le navigateur).
// À la 1re visite (aucun choix mémorisé), une fenêtre propose clair ou sombre.
(function () {
  const KEY = 'theme';
  const body = document.body;
  const toggle = document.getElementById('themeToggle');

  function appliquer(sombre) {
    body.classList.toggle('dark', sombre);
    if (toggle) {
      toggle.textContent = sombre ? '☀️' : '🌙';
      toggle.setAttribute('aria-label', sombre ? 'Passer en mode clair' : 'Passer en mode sombre');
    }
  }

  function enregistrer(sombre) {
    try { localStorage.setItem(KEY, sombre ? 'dark' : 'light'); } catch (e) {}
  }

  // Choix précédent ?
  let choix = null;
  try { choix = localStorage.getItem(KEY); } catch (e) {}

  if (choix === 'dark' || choix === 'light') {
    appliquer(choix === 'dark');
  } else {
    // Aucun choix : on pré-applique la préférence système et on demande.
    const prefSombre = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    appliquer(prefSombre);
    afficherModale(prefSombre);
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const sombre = !body.classList.contains('dark');
      appliquer(sombre);
      enregistrer(sombre);
    });
  }

  // ── Fenêtre de choix du thème ──
  function afficherModale(prefSombre) {
    const ov = document.createElement('div');
    ov.className = 'theme-modal';
    ov.innerHTML = `
      <div class="theme-modal__box" role="dialog" aria-modal="true" aria-labelledby="tm-titre">
        <h2 id="tm-titre" class="theme-modal__titre">Bienvenue&nbsp;👋</h2>
        <p class="theme-modal__txt">Quel thème préférez-vous pour naviguer&nbsp;?</p>
        <div class="theme-modal__choix">
          <button class="theme-opt" data-mode="light">
            <span class="theme-opt__ico">☀️</span>
            <span class="theme-opt__lbl">Mode clair</span>
          </button>
          <button class="theme-opt" data-mode="dark">
            <span class="theme-opt__ico">🌙</span>
            <span class="theme-opt__lbl">Mode sombre</span>
          </button>
        </div>
        <p class="theme-modal__note">Vous pourrez changer à tout moment avec le bouton 🌙&nbsp;/&nbsp;☀️ en haut.</p>
      </div>`;
    body.appendChild(ov);

    // Met en avant l'option correspondant à la préférence système
    const reco = ov.querySelector('.theme-opt[data-mode="' + (prefSombre ? 'dark' : 'light') + '"]');
    if (reco) reco.classList.add('theme-opt--reco');

    // Aperçu en direct au survol, sans encore enregistrer
    ov.querySelectorAll('.theme-opt').forEach((btn) => {
      btn.addEventListener('mouseenter', () => appliquer(btn.dataset.mode === 'dark'));
    });
    ov.addEventListener('mouseleave', () => appliquer(prefSombre));

    // Verrouille le défilement pendant l'affichage
    const scrollBefore = body.style.overflow;
    body.style.overflow = 'hidden';

    requestAnimationFrame(() => ov.classList.add('show'));

    function choisir(sombre) {
      appliquer(sombre);
      enregistrer(sombre);
      ov.classList.remove('show');
      body.style.overflow = scrollBefore;
      setTimeout(() => ov.remove(), 250);
    }

    ov.querySelectorAll('.theme-opt').forEach((btn) => {
      btn.addEventListener('click', () => choisir(btn.dataset.mode === 'dark'));
    });
  }
})();
