(function () {
  const switcher = document.getElementById('theme-switcher');
  const toggle = document.getElementById('theme-toggle');
  const menu = document.getElementById('theme-menu');
  const themeOptions = Array.from(document.querySelectorAll('[data-theme-value]'));
  const validThemes = ['blush', 'midnight', 'sage', 'ocean'];

  if (!switcher || !toggle || !menu || themeOptions.length === 0) {
    return;
  }

  function setTheme(theme, persist) {
    if (!validThemes.includes(theme)) {
      return;
    }

    document.documentElement.dataset.theme = theme;
    themeOptions.forEach(function (option) {
      option.setAttribute('aria-pressed', String(option.dataset.themeValue === theme));
    });

    if (persist) {
      try {
        localStorage.setItem('lakshana-portfolio-theme', theme);
      } catch (error) {
        console.warn('Theme selected for this visit, but could not be saved in browser storage.', error);
      }
    }
  }

  function closeMenu(returnFocus) {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) {
      toggle.focus();
    }
  }

  const initialTheme = validThemes.includes(document.documentElement.dataset.theme)
    ? document.documentElement.dataset.theme
    : 'blush';
  setTheme(initialTheme, false);
  document.documentElement.classList.add('theme-transition-ready');

  toggle.addEventListener('click', function () {
    const isOpening = menu.hidden;
    menu.hidden = !isOpening;
    toggle.setAttribute('aria-expanded', String(isOpening));
    if (isOpening) {
      const selectedOption = themeOptions.find(function (option) {
        return option.getAttribute('aria-pressed') === 'true';
      });
      if (selectedOption) {
        selectedOption.focus();
      }
    }
  });

  themeOptions.forEach(function (option, index) {
    option.addEventListener('click', function () {
      setTheme(option.dataset.themeValue, true);
      closeMenu(true);
    });

    option.addEventListener('keydown', function (event) {
      let nextIndex = -1;
      if (event.key === 'ArrowDown') {
        nextIndex = (index + 1) % themeOptions.length;
      } else if (event.key === 'ArrowUp') {
        nextIndex = (index - 1 + themeOptions.length) % themeOptions.length;
      }

      if (nextIndex !== -1) {
        event.preventDefault();
        themeOptions[nextIndex].focus();
      }
    });
  });

  document.addEventListener('pointerdown', function (event) {
    if (!switcher.contains(event.target) && !menu.hidden) {
      closeMenu(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !menu.hidden) {
      closeMenu(true);
    }
  });
}());
