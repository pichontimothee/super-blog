// Footer commun à toutes les pages — une seule source à maintenir.
// Chaque page contient un emplacement vide : <footer class="footer" id="site-footer"></footer>
// (Injection en JS plutôt que fetch() pour fonctionner aussi en ouverture locale file://)
(function () {
  const html = `
    <div class="conteneur footer-haut">
      <div class="marque">Blog de T. Pichon</div>
      <div class="col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="index.html">Acceuil</a></li>
          <li><a href="#">projets</a></li>
          <li><a href="veille.html">veille</a></li>
          <li><a href="stage.html">stage</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>Documents</h4>
        <ul>
          <li><a href="docs/cv.pdf" target="_blank" rel="noopener">CV</a></li>
          <li><a href="docs/synthese.pdf" target="_blank" rel="noopener">synthèse</a></li>
          <li><a href="docs/certification.pdf" target="_blank" rel="noopener">certification</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>Réseaux</h4>
        <ul>
          <li><a href="https://www.linkedin.com/in/timothee-pichon-823b09297/" target="_blank" rel="noopener">Linkedin</a></li>
          <li><a href="https://github.com/pichontimothee" target="_blank" rel="noopener">Github</a></li>
        </ul>
      </div>
    </div>
    <div class="conteneur footer-bas">2025 T. Pichon - Etudiant en BTS SIO</div>`;

  const el = document.getElementById('site-footer') || document.querySelector('footer.footer');
  if (el) el.innerHTML = html;
})();
