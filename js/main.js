/* =========================================
   ENLANZA — Diamond Roll Studio
   Landing Page Scripts
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV scroll effect ── */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ── Fade-up animations ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── Carousel dots ── */
  function initCarousel(carouselEl) {
    const track  = carouselEl.querySelector('.carousel__track');
    const dots   = carouselEl.querySelectorAll('.carousel__dot');
    if (!track || !dots.length) return;

    const slides = carouselEl.querySelectorAll('.carousel__slide');
    if (!slides.length) return;

    // Update active dot based on scroll position
    const updateDots = () => {
      const scrollLeft = track.scrollLeft;
      const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(track).gap || 16);
      const index = Math.round(scrollLeft / slideWidth);
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    };

    track.addEventListener('scroll', updateDots, { passive: true });

    // Dot click → scroll to slide
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(track).gap || 16);
        track.scrollTo({ left: slideWidth * i, behavior: 'smooth' });
      });
    });

    // Init first dot
    updateDots();
  }

  document.querySelectorAll('.carousel').forEach(initCarousel);

});
