export function LeadForm(formContent) {
  return `
    <section class="section section-accent" id="lead-form" aria-labelledby="lead-title">
      <div class="container lead-wrap">
        <div>
          <h2 id="lead-title">${formContent.title}</h2>
          <p>${formContent.subtitle}</p>
          <p class="hint">Поля со звездочкой обязательны.</p>
        </div>
        <form id="leadForm" class="lead-form" novalidate>
          <label for="name">Имя *</label>
          <input id="name" name="name" type="text" autocomplete="name" required minlength="2" maxlength="80" />

          <label for="email">Email *</label>
          <input id="email" name="email" type="email" autocomplete="email" required />

          <label for="phone">Телефон</label>
          <input id="phone" name="phone" type="tel" autocomplete="tel" maxlength="30" />

          <label for="message">Комментарий *</label>
          <textarea id="message" name="message" rows="4" required minlength="10" maxlength="2000"></textarea>

          <input id="captchaToken" name="captchaToken" type="hidden" value="" />

          <label class="consent">
            <input id="consent" name="consent" type="checkbox" required />
            <span>${formContent.consentText}</span>
          </label>

          <button class="button button-primary" type="submit">${formContent.submit}</button>
          <p id="formStatus" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;
}
