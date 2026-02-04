export function Contact(contact) {
  return `
    <section class="section" id="contacts" aria-labelledby="contacts-title">
      <div class="container contact-grid">
        <div>
          <h2 id="contacts-title">${contact.title}</h2>
          <p><strong>Адрес:</strong> ${contact.address}</p>
          <p><strong>Телефон:</strong> <a href="tel:${contact.phone.replace(/\s+/g, "")}">${contact.phone}</a></p>
          <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
          <p><strong>Telegram:</strong> <a href="${contact.telegram}" target="_blank" rel="noopener noreferrer">Перейти в Telegram</a></p>
        </div>
        <div class="contact-note" role="note" aria-label="График">
          <h3>Режим работы</h3>
          <p>Пн-Пт: 09:00-19:00</p>
          <p>Сб: 10:00-16:00</p>
        </div>
      </div>
    </section>
  `;
}
