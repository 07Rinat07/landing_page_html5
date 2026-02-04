export function Features(features) {
  const items = features.items
    .map(
      (item) => `
        <article class="feature-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");

  return `
    <section class="section" id="features" aria-labelledby="features-title">
      <div class="container">
        <h2 id="features-title">${features.title}</h2>
        <div class="feature-grid">${items}</div>
      </div>
    </section>
  `;
}
