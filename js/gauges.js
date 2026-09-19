// Jauges de compétences : une seule source de vérité = l'attribut data-note.
// Pour changer une jauge, modifie UNIQUEMENT data-note (ex. data-note="8.5")
// dans index.html — l'anneau ET le nombre affiché se mettent à jour tout seuls.
(function () {
  const C = 326.73; // circonférence du cercle (r = 52)

  document.querySelectorAll('.gauge').forEach((g) => {
    const note = parseFloat(g.dataset.note);
    if (isNaN(note)) return;

    const n = Math.max(0, Math.min(10, note)); // borne 0 → 10

    // Remplissage de l'anneau
    const fill = g.querySelector('.g-fill');
    if (fill) fill.style.setProperty('--off', (C * (1 - n / 10)).toFixed(1));

    // Nombre affiché au centre (entier + décimale)
    const num = g.querySelector('.g-num');
    if (num) {
      const [ent, dec] = n.toFixed(1).split('.');
      num.innerHTML = '<span class="g-int">' + ent + '</span>' +
                      '<span class="g-dec">.' + dec + '</span>';
    }
  });
})();
