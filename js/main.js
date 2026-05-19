/* ════════════════════════════════════
   AUTOMEX-AI PORTFOLIO — JavaScript
   ════════════════════════════════════ */

/* ── NAV ── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

function closeMobile() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}
function closeMobile() {
  document.getElementById('mobile-menu').classList.remove('open');
}

/* ── COMPTEURS ANIMÉS ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  if (!target) return;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = '1';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hstat-n[data-target]').forEach(el => counterObs.observe(el));

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });

const toReveal = [
  '.service-card',
  '.projet-item',
  '.val-item',
  '.certif-item',
  '.skills-panel',
  '.certif-panel',
  '.section-header',
  '.contact-left'
];

toReveal.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`;
    revealObs.observe(el);
  });
});

/* ── CONTACT ── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    btn.innerHTML = 'Envoi en cours...';
    btn.disabled = true;

    try {
      const response = await fetch('https://formspree.io/f/mredbnpa', {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        window.location.href = 'https://portfolio-automex-ai.vercel.app/merci.html';
      } else {
        btn.innerHTML = 'Envoyer ma demande <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>';
        btn.disabled = false;
        alert('Erreur. Écrivez directement à abdoulrazack607@gmail.com');
      }
    } catch(err) {
      btn.innerHTML = 'Envoyer ma demande';
      btn.disabled = false;
      alert('Erreur réseau. Écrivez à abdoulrazack607@gmail.com');
    }
  });
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}
