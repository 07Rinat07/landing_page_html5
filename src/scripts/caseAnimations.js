export function setupCaseAnimations() {
  const caseCards = document.querySelectorAll(".case-card");

  if (!caseCards.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    caseCards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.25,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  caseCards.forEach((card) => observer.observe(card));
}
