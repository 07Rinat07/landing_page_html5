export function Header(brand) {
  return `
    <header class="site-header" id="top">
      <div class="container header-inner">
        <a class="brand" href="#top" aria-label="На главную">${brand.name}</a>
        <nav class="main-nav" aria-label="Основная навигация">
          <a href="#features">Преимущества</a>
          <a href="#cases">Кейсы</a>
          <a href="#contacts">Контакты</a>
          <a class="nav-cta" href="#lead-form">Оставить заявку</a>
        </nav>
      </div>
    </header>
  `;
}
