export function Footer(footer) {
  return `
    <footer class="site-footer">
      <div class="container footer-inner">
        <p>${footer.copyright}</p>
        <a href="/privacy.html">${footer.privacy}</a>
      </div>
    </footer>
  `;
}
