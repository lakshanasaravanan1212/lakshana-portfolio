export function initScrollEffects() {
  // 1. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
      if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
      }

      if (scrollTop > 80) {
        header.classList.add('scrolled');
        backToTopBtn.classList.add('is-visible');
      } else {
        header.classList.remove('scrolled');
        backToTopBtn.classList.remove('is-visible');
      }

    }, { passive: true });

  // 2. Back to top action
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
