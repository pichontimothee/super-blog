// Gestion du formulaire de contact
// Envoi réel via Web3Forms : le service reçoit le POST et envoie
// un email à l'adresse liée à la clé d'accès (voir champ caché
// "access_key" dans le formulaire).
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const bouton = form.querySelector('.submit-btn');

  bouton.disabled = true;
  afficher('Envoi…', '');

  try {
    // Web3Forms accepte directement le contenu du formulaire (FormData)
    const reponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form)
    });
    const data = await reponse.json().catch(() => ({}));

    if (reponse.ok && data.success) {
      form.reset();
      afficher('✓ Message envoyé avec succès ! Je vous répondrai rapidement.', 'ok');
    } else {
      afficher('⚠️ ' + (data.message || "Un souci est survenu à l'envoi. Réessayez."), 'erreur');
    }
  } catch (err) {
    afficher('⚠️ Impossible d\'envoyer pour le moment. Vérifiez votre connexion et réessayez.', 'erreur');
  } finally {
    bouton.disabled = false;
  }
});

function afficher(message, type) {
  successMessage.textContent = message;
  // 'ok' garde le style de succès existant ; 'erreur' le neutralise
  successMessage.style.color = type === 'erreur' ? '#c0392b' : '';
  successMessage.classList.add('show');

  if (type === 'ok') {
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 5000);
  }
}

// Petite animation des champs au focus
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('focus', function () {
    this.parentElement.style.transform = 'translateX(2px)';
  });

  input.addEventListener('blur', function () {
    this.parentElement.style.transform = 'translateX(0)';
  });
});
