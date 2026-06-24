// Gestion du formulaire de contact
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Récupérer les données du formulaire
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  // Simuler l'envoi (en réalité, à connecter à un backend)
  console.log('Données du formulaire:', formData);

  // Afficher le message de succès
  successMessage.classList.add('show');

  // Réinitialiser le formulaire
  form.reset();

  // Masquer le message après 5 secondes
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 5000);

  /*
  Pour un vrai envoi d'email, utiliser :
  - Un backend (PHP, Node.js, Python)
  - Un service comme EmailJS, Formspree, ou Netlify Forms

  Exemple avec EmailJS :
  emailjs.send('service_id', 'template_id', formData)
    .then(() => {
      successMessage.classList.add('show');
      form.reset();
    });
  */
});

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
