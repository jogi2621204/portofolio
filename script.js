// Nav scroll effect
const nav = document.getElementById('global-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Subtle fade-up — enhancement only, content always visible first
// Only runs if user has no reduced-motion preference
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const fadeEls = document.querySelectorAll(
    '.about-grid, .edu-card, .edu-visual-wrap, .exp-item, .org-card,' +
    '.pub-card, .award-card, .skills-group, .contact-item,' +
    '.pub-visual-wrap, .ach-visual-wrap, .leader-visual,' +
    '.gallery-item, .contact-photo-main, .contact-photo-sub'
  );

  fadeEls.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // Stagger animation on grid children
  document.querySelectorAll('.edu-timeline, .org-grid, .awards-grid, .skills-columns, .contact-links').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 60}ms`;
    });
  });
}
