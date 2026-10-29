/* =====================================================================
   axes.js — Contenu dynamique des axes de veille, piloté par un JSON.
   Lit data/<page>/veille.json et génère les <section class="bd-card">
   des axes (même design que la version statique d'origine).

   Utilisation dans la page :
     <div id="axes-conteneur" data-src="data/quantique/veille.json"></div>
     <script src="js/axes.js"></script>

   NB : la page doit être servie en HTTP (site en ligne ou serveur local).
        En file:// le navigateur bloque fetch() sur un fichier local.
   ===================================================================== */
(function () {
  "use strict";

  var hote = document.getElementById("axes-conteneur");
  if (!hote) return;

  var src = hote.getAttribute("data-src") || "data/quantique/veille.json";

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  // ---- Rendu des différents types de blocs -------------------------------
  function blocSection(b, section) {
    if (b.sousTitre) section.appendChild(el("h3", "sd-sub", b.sousTitre));
    if (b.texte) {
      var wrap = el("div", null, b.texte);
      while (wrap.firstChild) section.appendChild(wrap.firstChild);
    }
    if (b.url && b.source) {
      var a = document.createElement("a");
      a.className = "actu-source";
      a.href = b.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "Source : " + b.source;
      section.appendChild(a);
    }
  }

  function blocImage(b, section) {
    var div = el("div", "bd-img" + (b.petit ? " bd-img--small" : ""));
    var img = document.createElement("img");
    img.src = b.src || "";
    img.alt = b.alt || "";
    div.appendChild(img);
    section.appendChild(div);
  }

  function blocSplit(b, section) {
    if (b.sousTitre) section.appendChild(el("h3", "sd-sub", b.sousTitre));
    var split = el("div", "bd-split");
    split.appendChild(el("div", null, b.texte || ""));
    if (b.image) {
      var imgDiv = el("div", "bd-img");
      var img = document.createElement("img");
      img.src = b.image.src || "";
      img.alt = b.image.alt || "";
      imgDiv.appendChild(img);
      split.appendChild(imgDiv);
    }
    section.appendChild(split);
  }

  function blocFocus(b, section) {
    var box = el("div", "focus-entreprise");
    if (b.tag) box.appendChild(el("span", "focus-tag", b.tag));
    if (b.titre) box.appendChild(el("h4", null, b.titre));
    if (b.texte) {
      var wrap = el("div", null, b.texte);
      while (wrap.firstChild) box.appendChild(wrap.firstChild);
    }
    section.appendChild(box);
  }

  var rendus = {
    section: blocSection,
    image: blocImage,
    split: blocSplit,
    focus: blocFocus
  };

  function renderSources(axes) {
    var grille = document.getElementById("sources-grille");
    if (!grille) return;
    var seen = {};
    var sources = [];
    axes.forEach(function (axe) {
      (axe.blocs || []).forEach(function (b) {
        if (b.source && b.url && !seen[b.source]) {
          seen[b.source] = true;
          sources.push({ source: b.source, url: b.url });
        }
      });
    });
    grille.innerHTML = "";
    if (!sources.length) {
      grille.appendChild(el("p", "actu-chargement", "Aucune source listée."));
      return;
    }
    sources.forEach(function (s) {
      var carte = el("div", "source-carte");
      carte.appendChild(el("h4", null, s.source));
      var p = document.createElement("p");
      var a = document.createElement("a");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "Voir l'article";
      p.appendChild(a);
      carte.appendChild(p);
      grille.appendChild(carte);
    });
  }

  function renderAxe(axe) {
    var section = el("section", "bd-card");
    if (axe.numero) section.appendChild(el("span", "sd-badge", axe.numero));
    if (axe.titre) section.appendChild(el("h2", "bd-titre", axe.titre));
    if (axe.objectif) {
      section.appendChild(el("div", "axe-objectif",
        "<strong>Objectif :</strong> " + axe.objectif));
    }
    if (axe.image) {
      var imgDiv = el("div", "axe-photo");
      var img = document.createElement("img");
      img.src = axe.image;
      img.alt = axe.titre || "Illustration de l'axe";
      img.loading = "lazy";
      imgDiv.appendChild(img);
      section.appendChild(imgDiv);
    }
    (axe.blocs || []).forEach(function (b) {
      var fn = rendus[b.type];
      if (fn) fn(b, section);
    });
    var clear = document.createElement("div");
    clear.style.clear = "both";
    section.appendChild(clear);
    return section;
  }

  function showMessage(txt, isError) {
    hote.innerHTML = "";
    var card = el("section", "bd-card");
    card.appendChild(el("p", isError ? "actu-erreur" : "actu-chargement", txt));
    hote.appendChild(card);
  }

  showMessage("Chargement des axes de veille…", false);

  fetch(src, { cache: "no-store" })
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (data) {
      var axes = (data && data.axes) || [];
      if (!axes.length) {
        showMessage("Aucun axe de veille à afficher.", false);
        return;
      }
      hote.innerHTML = "";
      axes.forEach(function (axe) { hote.appendChild(renderAxe(axe)); });
      renderSources(axes);

      var majEl = document.getElementById("rapports-maj");
      if (majEl && data.derniereMaj) {
        var d = new Date(data.derniereMaj);
        var txt = isNaN(d) ? data.derniereMaj
          : d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
        majEl.textContent = "Axes mis à jour le " + txt;
      }
    })
    .catch(function (err) {
      showMessage(
        "Impossible de charger les axes (" + err.message +
        "). La page doit être servie en HTTP (site en ligne ou serveur local).",
        true
      );
    });
})();
