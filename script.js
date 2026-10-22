// Année du copyright
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile : fermeture au clic
document.querySelectorAll('#menu a').forEach(a => a.addEventListener('click', () => document.getElementById('menu').classList.remove('open')));

// Curseurs avant / après
document.querySelectorAll('.ba').forEach(ba => {
  const range = ba.querySelector('input[type=range]');
  const update = () => ba.style.setProperty('--pos', range.value + '%');
  range.addEventListener('input', update);
  update();
});

// Pré-sélection du type de projet depuis les cartes "Projets"
document.querySelectorAll('[data-projet]').forEach(a => a.addEventListener('click', () => {
  document.getElementById('type').value = a.dataset.projet;
}));

// Envoi du devis par e-mail sans quitter la page
const form = document.getElementById('devis-form');
const msg = document.getElementById('msg');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button');
  btn.disabled = true; btn.textContent = 'Envoi en cours…';
  msg.className = 'msg';
  try {
    const res = await fetch('https://formsubmit.co/ajax/batrenovation78@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    const data = await res.json();
    if (res.ok && (data.success === 'true' || data.success === true)) {
      msg.textContent = 'Merci ! Votre demande a bien été envoyée. Nous vous recontactons très vite.';
      msg.className = 'msg ok';
      form.reset();
    } else { throw new Error(); }
  } catch (err) {
    msg.innerHTML = 'Une erreur est survenue. Vous pouvez nous joindre au <a href="tel:+33778473831">07 78 47 38 31</a> ou à batrenovation78@gmail.com.';
    msg.className = 'msg err';
  }
  btn.disabled = false; btn.textContent = 'Envoyer ma demande →';
});
