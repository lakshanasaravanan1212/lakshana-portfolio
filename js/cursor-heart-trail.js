const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canHover && !prefersReducedMotion) {
  const trail = document.createElement('div');
  trail.className = 'cursor-heart-trail';
  trail.setAttribute('aria-hidden', 'true');

  const hearts = Array.from({ length: 5 }, () => {
    const heart = document.createElement('span');
    heart.className = 'cursor-heart';
    heart.textContent = '♥';
    trail.append(heart);
    return heart;
  });

  document.body.append(trail);

  let nextHeart = 0;
  let lastSpawnedAt = 0;
  let lastX = 0;
  let lastY = 0;

  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') {
      return;
    }

    const now = performance.now();
    if (now - lastSpawnedAt < 75 || Math.hypot(event.clientX - lastX, event.clientY - lastY) < 10) {
      return;
    }

    lastSpawnedAt = now;
    lastX = event.clientX;
    lastY = event.clientY;

    const heart = hearts[nextHeart];
    nextHeart = (nextHeart + 1) % hearts.length;
    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;
    heart.classList.remove('is-active');
    void heart.offsetWidth;
    heart.classList.add('is-active');
  }, { passive: true });
}
