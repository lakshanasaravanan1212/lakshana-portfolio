(function () {
  const deck = document.querySelector('.memory-deck');
  const panel = document.getElementById('podcast-panel');

  if (!deck || !panel) {
    return;
  }

  const cards = Array.from(deck.querySelectorAll('[data-memory-card]'));

  function showMemory(memory) {
    const showPodcast = memory === 'podcast';
    deck.dataset.activeMemory = showPodcast ? 'podcast' : 'ncc';

    cards.forEach(function (card) {
      card.setAttribute('aria-pressed', String(card.dataset.memoryCard === deck.dataset.activeMemory));
    });

    panel.classList.toggle('is-open', showPodcast);
    panel.setAttribute('aria-hidden', String(!showPodcast));
    panel.inert = !showPodcast;
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      showMemory(card.dataset.memoryCard);
    });
  });

  showMemory('ncc');
}());
