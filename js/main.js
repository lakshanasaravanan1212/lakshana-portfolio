import { initNavigation } from './navigation.js';
import { initScrollEffects } from './scroll-effects.js';
import { initInteractions } from './interactions.js';
import { initAnimations } from './animations.js';

function initializePortfolio() {
  initNavigation();
  initScrollEffects();
  initInteractions();
  initAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolio, { once: true });
} else {
  initializePortfolio();
}
