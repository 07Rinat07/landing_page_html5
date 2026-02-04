import content from "./content/site.ru.json";
import { App } from "./components/App.js";
import { getPublicConfig } from "./scripts/api.js";
import { setupCaseAnimations } from "./scripts/caseAnimations.js";
import { setupLeadForm } from "./scripts/form.js";
import { setupNavigation } from "./scripts/navigation.js";
import "./styles/main.scss";

async function bootstrap() {
  const root = document.getElementById("app");

  if (!root) {
    return;
  }

  root.innerHTML = App(content);

  setupNavigation();
  setupCaseAnimations();

  try {
    const config = await getPublicConfig();
    setupLeadForm({
      successMessage: content.leadForm.success,
      errorMessage: content.leadForm.error,
      config
    });
  } catch (error) {
    const status = document.getElementById("formStatus");
    if (status) {
      status.textContent = `Инициализация формы не удалась: ${error.message}`;
      status.classList.add("status-error");
    }
  }
}

bootstrap();
