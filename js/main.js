/* ════════════════════════════════════
   AUTOMEX-AI — JavaScript
   ════════════════════════════════════ */

/* ── Lucide icons ── */
if (window.lucide) lucide.createIcons();
window.addEventListener('load', () => { if (window.lucide) lucide.createIcons(); });

/* ── NAV scroll state ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile menu ── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}
function closeMobile() {
  if (burger) burger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  revealObs.observe(el);
});

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ── Chatbot demo animation ── */
const chatBody = document.getElementById('chat-body');
if (chatBody) {
  const script = [
    { from: 'bot', text: "Bonjour 👋 Bienvenue chez Le Bistrot Lumière" },
    { from: 'user', text: "Êtes-vous ouverts ce soir ?" },
    { from: 'bot', text: "Oui ! Nous sommes ouverts jusqu'à 23h. Je peux réserver une table pour vous 🕐" },
    { from: 'user', text: "Une table pour 2 personnes à 20h30" },
    { from: 'bot', text: "C'est noté ✅ Réservation confirmée pour 2 personnes à 20h30. À ce soir !" }
  ];

  function typeDelay(text) {
    return Math.min(1600, 500 + text.length * 22);
  }

  function playChatDemo() {
    chatBody.innerHTML = '';
    let delay = 400;
    script.forEach((msg) => {
      if (msg.from === 'bot') {
        setTimeout(() => {
          const typing = document.createElement('div');
          typing.className = 'chat-typing';
          typing.innerHTML = '<span></span><span></span><span></span>';
          chatBody.appendChild(typing);
          chatBody.scrollTop = chatBody.scrollHeight;
        }, delay);
        delay += 900;
        setTimeout(() => {
          const typing = chatBody.querySelector('.chat-typing');
          if (typing) typing.remove();
          addBubble(msg.from, msg.text);
        }, delay);
        delay += typeDelay(msg.text);
      } else {
        setTimeout(() => addBubble(msg.from, msg.text), delay);
        delay += typeDelay(msg.text);
      }
    });
    setTimeout(playChatDemo, delay + 3200);
  }

  function addBubble(from, text) {
    const b = document.createElement('div');
    b.className = `chat-bubble ${from}`;
    b.textContent = text;
    chatBody.appendChild(b);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  playChatDemo();
}

/* ── Contact form (Formspree) ── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = 'Envoi en cours...';
    btn.disabled = true;

    try {
      const response = await fetch('https://formspree.io/f/mredbnpa', {
        method: 'POST',
        body: new FormData(this),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        window.location.href = 'merci.html';
      } else {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        showToast('Erreur. Écrivez directement à abdoulrazack607@gmail.com');
      }
    } catch (err) {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      showToast('Erreur réseau. Écrivez à abdoulrazack607@gmail.com');
    }
  });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}
