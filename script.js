document.addEventListener('DOMContentLoaded', () => {
  // Remove loading state
  document.documentElement.classList.add('loaded');

  // Footer year
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) currentYearEl.textContent = String(new Date().getFullYear());

  // Header scroll state
  const header = document.querySelector('.header');
  const setHeaderState = () => {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  // Smooth anchor scroll (offset to keep section titles visible under fixed header)
  const HEADER_OFFSET = 104;
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const id = href.replace('#', '').trim();
      if (!id) return;

      e.preventDefault();
      scrollToId(id);

      // Close hamburger menu on mobile after click
      const hamburger = document.getElementById('hamburger');
      if (hamburger && hamburger.checked) hamburger.checked = false;
    });
  });

  // Fade-in reveals
  const revealEls = Array.from(document.querySelectorAll('.fade-in'));
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Projects carousel controls (horizontal scroll)
  const projectsTrack = document.querySelector('.project-list--scroll');
  const btnLeft = document.querySelector('.projects-carousel__btn--left');
  const btnRight = document.querySelector('.projects-carousel__btn--right');

  if (projectsTrack && btnLeft && btnRight) {
    const step = () => {
      const firstCard = projectsTrack.querySelector('.project');
      if (!firstCard) return 320;

      const styles = window.getComputedStyle(projectsTrack);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      return firstCard.getBoundingClientRect().width + gap;
    };

    const update = () => {
      const maxScrollLeft = projectsTrack.scrollWidth - projectsTrack.clientWidth;
      const canScroll = maxScrollLeft > 2;

      // keep buttons from overlaying when not needed
      btnLeft.style.visibility = canScroll ? 'visible' : 'hidden';
      btnRight.style.visibility = canScroll ? 'visible' : 'hidden';

      btnLeft.disabled = projectsTrack.scrollLeft <= 2;
      btnRight.disabled = projectsTrack.scrollLeft >= maxScrollLeft - 2;
    };

    btnLeft.addEventListener('click', () => {
      projectsTrack.scrollBy({ left: -step(), behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
      projectsTrack.scrollBy({ left: step(), behavior: 'smooth' });
    });

    projectsTrack.addEventListener('scroll', () => window.requestAnimationFrame(update));
    window.addEventListener('resize', update);
    update();
  }
});
