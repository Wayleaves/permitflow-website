// PermitFlow SA — Main JS

document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile nav toggle ───
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close nav when a link is clicked
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // ─── Smooth scroll for all anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Sticky header shadow on scroll ───
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(13,37,69,0.10)'
      : 'none';
  }, { passive: true });

  // ─── Form submission feedback ───
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', e => {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Formspree handles submission; re-enable if error
    setTimeout(() => {
      btn.textContent = 'Send Enquiry →';
      btn.disabled = false;
    }, 5000);
  });

  // ─── Fade-in on scroll (service cards, process steps, why points) ───
  const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOpts);

  document.querySelectorAll('.service-card, .process-step, .why-point, .hero-card').forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });

});
