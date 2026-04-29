(() => {
  const slider = document.querySelector('.reviews__slider');
  if (!slider) return;

  const track = slider.querySelector('.reviews__track');
  const slides = slider.querySelectorAll('.reviews__slide');
  const prev = slider.querySelector('.reviews__nav--prev');
  const next = slider.querySelector('.reviews__nav--next');
  if (!track || slides.length === 0 || !prev || !next) return;

  let index = 0;

  const update = () => {
    const slide = slides[index];
    track.style.transform = `translateX(-${slide.offsetLeft}px)`;
  };

  prev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });

  next.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });

  let startX = 0;
  let dragging = false;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    dragging = true;
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) {
      index = (index + 1) % slides.length;
    } else {
      index = (index - 1 + slides.length) % slides.length;
    }
    update();
  });
})();
