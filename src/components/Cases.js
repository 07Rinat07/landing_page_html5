export function Cases(casesSection) {
  const fallbackVisual = {
    type: "generic",
    label: "Ландшафтный проект",
    metric: "План работ под ключ"
  };

  const iconByType = {
    cottage: `
      <svg viewBox="0 0 128 128" fill="none">
        <path d="M20 66L64 30L108 66" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M30 58V102H98V58" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M56 102V78H72V102" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M17 102H42" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M25 102V82" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 82C18 74 24 69 31 69C38 69 44 74 46 82" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `,
    business: `
      <svg viewBox="0 0 128 128" fill="none">
        <path d="M20 102H108" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M30 102V34H78V102" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M78 102V52H98V102" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M42 48H52" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" />
        <path d="M42 62H52" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" />
        <path d="M42 76H52" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" />
        <path d="M60 48H70" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" />
        <path d="M60 62H70" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" />
        <path d="M60 76H70" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" />
      </svg>
    `,
    urban: `
      <svg viewBox="0 0 128 128" fill="none">
        <path d="M18 102H110" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M30 102V84H78V102" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M30 90H78" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M88 102V78" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M98 102V78" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M77 74C79 65 86 58 94 58C102 58 109 65 111 74" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M44 66H56" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M50 66V54" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `,
    generic: `
      <svg viewBox="0 0 128 128" fill="none">
        <path d="M20 102H108" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M26 84L46 64L60 76L82 50L102 70" stroke="#ECFFF3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="46" cy="38" r="10" stroke="#ECFFF3" stroke-width="6" />
      </svg>
    `
  };

  const cards = casesSection.items
    .map((item) => {
      const visual = {
        ...fallbackVisual,
        ...item.visual
      };
      const iconMarkup = iconByType[visual.type] ?? iconByType.generic;

      return `
        <article class="case-card">
          <div class="case-media case-media--${visual.type}" role="img" aria-label="${item.name}">
            <div class="case-icon" aria-hidden="true">${iconMarkup}</div>
            <div class="case-media-meta">
              <span class="case-chip">${visual.label}</span>
              <strong class="case-metric">${visual.metric}</strong>
            </div>
          </div>
          <div class="case-card-content">
            <h3>${item.name}</h3>
            <p>${item.result}</p>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <section class="section section-muted" id="cases" aria-labelledby="cases-title">
      <div class="container">
        <h2 id="cases-title">${casesSection.title}</h2>
        <div class="cases-grid">${cards}</div>
      </div>
    </section>
  `;
}
