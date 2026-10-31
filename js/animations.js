export function initAnimations() {
  initFloatingDoodles();

  if (!('IntersectionObserver' in window)) {
    return;
  }

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
  document.documentElement.classList.add('js-reveal-ready');
}

function initFloatingDoodles() {
  const doodleSvg = {
    heart: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 40S6 29 6 17C6 7 19 4 24 15 29 4 42 7 42 17c0 12-18 23-18 23Z"/></svg>',
    sparkle: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4c2.4 12.1 7.9 17.6 20 20-12.1 2.4-17.6 7.9-20 20-2.4-12.1-7.9-17.6-20-20C16.1 21.6 21.6 16.1 24 4Z"/></svg>',
    flower: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 18c-6-12 5-16 8-8 2 5-2 8-8 8Zm6 4c12-6 16 5 8 8-5 2-8-2-8-8Zm-6 6c6 12-5 16-8 8-2-5 2-8 8-8Zm-6-6c-12 6-16-5-8-8 5-2 8 2 8 8Z"/><circle cx="24" cy="24" r="4"/></svg>',
    butterfly: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M23 23C10 4 3 12 9 23c3 5 9 5 14 2Zm2 0c13-19 20-11 14 0-3 5-9 5-14 2Zm-2 3C10 45 4 37 10 29c3-4 8-4 13-1Zm2 0c13 19 19 11 13 3-3-4-8-4-13-1Z"/><path d="M24 19v12m0-12-4-5m4 5 4-5"/></svg>',
    arrow: '<svg viewBox="0 0 56 48" aria-hidden="true"><path d="M5 38C13 15 33 8 47 17M37 9l11 8-10 8"/></svg>',
    dots: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17"/></svg>',
    strokes: '<svg viewBox="0 0 56 48" aria-hidden="true"><path d="M6 17c10-8 21-10 33-7M10 26c11-7 22-8 37-5M15 35c9-4 17-5 27-4"/></svg>'
  };

  const sectionDoodles = [
    {
      selector: '#hero',
      doodles: [
        ['sparkle', 'hero-sparkle', 0],
        ['heart', 'hero-heart', 6],
        ['flower', 'hero-flower', 0]
      ]
    },
    {
      selector: '#about',
      doodles: [
        ['heart', 'about-heart', 5],
        ['butterfly', 'about-butterfly', 0],
        ['sparkle', 'about-sparkle', 0]
      ]
    },
    {
      selector: '#resume',
      doodles: [
        ['dots', 'resume-dots', 4],
        ['strokes', 'resume-strokes', 0],
        ['flower', 'resume-flower', 0]
      ]
    },
    {
      selector: '#projects',
      doodles: [
        ['sparkle', 'projects-sparkle', 5],
        ['butterfly', 'projects-butterfly', 0],
        ['arrow', 'projects-arrow', 0],
        ['heart', 'projects-heart', 0]
      ]
    },
    {
      selector: '#contact',
      doodles: [
        ['flower', 'contact-flower', 4],
        ['dots', 'contact-dots', 0],
        ['heart', 'contact-heart', 0]
      ]
    }
  ];

  const doodleElements = [];

  sectionDoodles.forEach(({ selector, doodles }) => {
    const section = document.querySelector(selector);
    if (!section) {
      return;
    }

    const layer = document.createElement('div');
    layer.className = 'floating-doodle-layer';
    layer.setAttribute('aria-hidden', 'true');

    doodles.forEach(([shape, placement, depth], index) => {
      const doodle = document.createElement('span');
      doodle.className = `floating-doodle floating-doodle--${placement} floating-doodle--motion-${index % 3}`;
      doodle.innerHTML = doodleSvg[shape];
      doodle.dataset.depth = String(depth);
      doodle.style.setProperty('--doodle-delay', `${-(index * 1.7 + doodleElements.length * 0.43)}s`);
      layer.append(doodle);
      doodleElements.push(doodle);
    });

    section.prepend(layer);
  });

  const canParallax = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canParallax || prefersReducedMotion) {
    return;
  }

  const parallaxElements = doodleElements.filter(element => Number(element.dataset.depth) > 0);
  let animationFrame = 0;
  let pointerX = 0;
  let pointerY = 0;

  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') {
      return;
    }

    pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 2;

    if (animationFrame) {
      return;
    }

    animationFrame = window.requestAnimationFrame(() => {
      parallaxElements.forEach(element => {
        const depth = Number(element.dataset.depth);
        element.style.setProperty('--doodle-x', `${pointerX * depth}px`);
        element.style.setProperty('--doodle-y', `${pointerY * depth}px`);
      });
      animationFrame = 0;
    });
  }, { passive: true });
}
