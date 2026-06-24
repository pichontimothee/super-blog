// Aperçu des documents au survol (CV, synthèse, certification)
// Les PDF et images s'affichent dans l'iframe ; les autres formats
// (ex. .xlsx) ne sont pas prévisualisables par le navigateur : on affiche
// alors un message invitant à ouvrir / télécharger le fichier.
const docItems = document.querySelectorAll('.doc-item');
const preview = document.getElementById('docPreview');
const apercuVide = document.getElementById('apercuVide');

const PREVISUALISABLE = /\.(pdf|png|jpe?g|gif|webp|svg)$/i;

docItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const src = item.dataset.doc;
    if (!src) return;

    if (PREVISUALISABLE.test(src)) {
      // Format affichable directement dans l'iframe
      preview.src = src;
      preview.classList.add('actif');
      apercuVide.style.display = 'none';
    } else {
      // Format non prévisualisable (ex. Excel) : on masque l'iframe
      preview.classList.remove('actif');
      preview.removeAttribute('src');
      apercuVide.style.display = 'flex';
      apercuVide.innerHTML =
        "📄 Aperçu non disponible pour ce format" +
        "<br><small>Cliquez sur le document pour l'ouvrir / le télécharger</small>";
    }
  });
});
