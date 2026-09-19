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

        <div class="nav-drop">
          <a href="veille.html" class="nav-lien">Veille <span class="caret">▾</span></a>
          <div class="nav-menu">
            <a href="veille.html">Toutes les veilles</a>
            <a href="big-data.html">Big Data</a>
            <a href="quantique.html">Numérique quantique</a>
          </div>
        </div>

        <div class="nav-drop">
          <a href="stage.html" class="nav-lien">Stages <span class="caret">▾</span></a>
          <div class="nav-menu">
            <a href="stage.html">Tous les stages</a>
            <a href="stage-soloc.html">Soloc Rabotage</a>
            <a href="stage-sca-ouest.html">SCA Ouest</a>
            <a href="stage-duqueine.html">Duqueine</a>
          </div>
        </div>

        <div class="nav-drop">
          <span class="nav-lien" tabindex="0" role="button" aria-haspopup="true">Projets <span class="caret">▾</span></span>
          <div class="nav-menu">
            <span class="nav-menu-item disabled">ParcSync <em>bientôt</em></span>
            <span class="nav-menu-item disabled">Lab réseau perso <em>bientôt</em></span>
            <span class="nav-menu-item disabled">GSB – Infra réseau <em>bientôt</em></span>
            <span class="nav-menu-item disabled">Blog tech <em>bientôt</em></span>
          </div>
        </div>

        <a href="index.html" class="btn-noir">Accueil</a>
        <button id="themeToggle" class="theme-toggle" aria-label="Basculer le mode sombre">🌙</button>
      </nav>
    </div>`;
})();
