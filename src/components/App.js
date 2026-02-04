import { Cases } from "./Cases.js";
import { Contact } from "./Contact.js";
import { Features } from "./Features.js";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import { Hero } from "./Hero.js";
import { LeadForm } from "./LeadForm.js";

export function App(content) {
  return `
    ${Header(content.brand)}
    <main id="main-content">
      ${Hero(content.hero)}
      ${Features(content.features)}
      ${Cases(content.cases)}
      ${Contact(content.contact)}
      ${LeadForm(content.leadForm)}
    </main>
    ${Footer(content.footer)}
  `;
}
