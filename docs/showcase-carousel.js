document.querySelectorAll("[data-showcase-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".showcase-slide"));
  const slideRail = carousel.querySelector(".showcase-slides");
  const previousButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));

  if (!slideRail || slides.length === 0) return;

  let index = 0;
  let startX = null;

  const render = () => {
    slideRail.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    });
  };

  const moveTo = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    render();
  };

  previousButton?.addEventListener("click", () => moveTo(index - 1));
  nextButton?.addEventListener("click", () => moveTo(index + 1));

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => moveTo(dotIndex));
  });

  slideRail.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
  });

  slideRail.addEventListener("pointerup", (event) => {
    if (startX === null) return;

    const deltaX = event.clientX - startX;
    startX = null;

    if (Math.abs(deltaX) < 40) return;
    moveTo(deltaX < 0 ? index + 1 : index - 1);
  });

  slideRail.addEventListener("pointerleave", () => {
    startX = null;
  });

  render();
});
