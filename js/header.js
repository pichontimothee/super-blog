// En-tête commun à toutes les pages — une seule source à maintenir.
// Chaque page fournit un emplacement :
//   <header class="entete" id="site-header"></header>                      (accueil : logo)
//   <header class="entete" id="site-header" data-title="L'IA"
//           data-back="veille.html"></header>                            (autres pages : ← + titre)
// Injecté en JS (fonctionne aussi en ouverture locale file://).
(function () {
  const el = document.getElementById('site-header');
  if (!el) return;

  const title = el.dataset.title || '';
  const back  = el.dataset.back  || '';

  // Partie gauche : logo (accueil) OU flèche retour + titre de page
  const gauche = back
    ? `<div class="entete-gauche">
         <a href="${back}" class="retour" aria-label="Retour">←</a>
         <h1 class="page-titre">${title}</h1>
       </div>`
    : `<span class="logo">blog de : Timothée Pichon</span>`;

  el.innerHTML = `
    <div class="conteneur">
      ${gauche}
      <nav class="nav">
        <a href="veille.html">Veille</a>
        <a href="stage.html">Stages</a>
        <a href="index.html" class="btn-noir">Accueil</a>
        <button id="themeToggle" class="theme-toggle" aria-label="Basculer le mode sombre">🌙</button>
      </nav>
    </div>`;
})();
