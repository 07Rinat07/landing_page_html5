export function Hero(hero) {
  return `
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">Green Atelier</p>
          <h1 id="hero-title">${hero.title}</h1>
          <p class="hero-description">${hero.description}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="${hero.primaryCta.href}">${hero.primaryCta.label}</a>
            <a class="button button-secondary" href="${hero.secondaryCta.href}">${hero.secondaryCta.label}</a>
          </div>
        </div>
        <div class="hero-card" role="presentation">
          <p>План запуска</p>
          <ol>
            <li>Аудит и измерения</li>
            <li>Проект и смета</li>
            <li>Реализация и контроль</li>
          </ol>
        </div>
      </div>
    </section>
  `;
}
