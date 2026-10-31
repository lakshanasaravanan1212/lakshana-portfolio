export function initNavigation() {
  // 3. Mobile Navigation Drawer
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (mobileToggle) {
      mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileDrawer.classList.contains('is-open')) {
          toggleMobileMenu();
        }
      });
    });

  // 4. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-item a:not(.nav-cta)');

    function updateActiveNavLink() {
      const scrollY = window.pageYOffset + 150;
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();
}
