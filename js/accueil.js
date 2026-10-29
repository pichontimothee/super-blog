// accueil.js — comportements propres à la page d'accueil
//   1) barre de navigation : état "scrolled" + barre de progression
//   2) révélations au défilement (scroll-triggered)
//   3) jauges "Mes compétences" : remplissage + décompte au scroll
(function () {
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 1. Nav : .scrolled + progression de lecture -------------------
  var entete = document.getElementById('site-header');
  if (entete) {
    var onScroll = function () {
      var h = document.documentElement;
      var max = (h.scrollHeight - h.clientHeight) || 1;
      var pct = Math.min(100, (window.scrollY / max) * 100);
      // posé sur <html> → hérité par la nav ET le bouton retour-haut
      h.style.setProperty('--scrollp', pct.toFixed(2) + '%');
      entete.classList.toggle('scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- 2. Scroll-triggered reveals -----------------------------------
  var cibles = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduit) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    cibles.forEach(function (el) { obs.observe(el); });
  } else {
    cibles.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // --- 3. Jauges : remplissage de l'anneau + décompte du nombre ------
  var gauges = document.querySelectorAll('.gauge');
  if (!gauges.length) return;

  function formatNum(n) {
    var parts = n.toFixed(1).split('.');
    return '<span class="g-int">' + parts[0] + '</span>' +
           '<span class="g-dec">.' + parts[1] + '</span>';
  }

  function animerJauge(g, i) {
    var note = parseFloat(g.dataset.note);
    if (isNaN(note)) return;
    note = Math.max(0, Math.min(10, note));
    var num = g.querySelector('.g-num');

    setTimeout(function () {
      g.classList.add('in-view');          // déclenche le remplissage CSS
      if (!num) return;
      if (reduit) { num.innerHTML = formatNum(note); return; }

      var dur = 1300, t0 = null;
      function tick(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);  // ease-out cubic
        num.innerHTML = formatNum(note * eased);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, i * 110);                            // effet cascade
  }

  if ('IntersectionObserver' in window && !reduit) {
    var started = false;
    var gObs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !started) {
          started = true;
          gauges.forEach(animerJauge);
          o.disconnect();
        }
      });
    }, { threshold: 0.25 });
    var zone = document.querySelector('.gauges') || gauges[0];
    gObs.observe(zone);
  } else {
    gauges.forEach(function (g) {
      g.classList.add('in-view');
      var num = g.querySelector('.g-num');
      var note = Math.max(0, Math.min(10, parseFloat(g.dataset.note) || 0));
      if (num) num.innerHTML = formatNum(note);
    });
  }
})();
