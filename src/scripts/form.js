import { getCsrfToken, sendLead } from "./api.js";

function toPayload(form, captchaToken) {
  const formData = new FormData(form);

  return {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    consent: Boolean(formData.get("consent")),
    captchaToken
  };
}

function setStatus(statusNode, text, isError = false) {
  statusNode.textContent = text;
  statusNode.classList.toggle("status-error", isError);
  statusNode.classList.toggle("status-success", !isError);
}

export function setupLeadForm({ successMessage, errorMessage, config }) {
  const form = document.getElementById("leadForm");
  const statusNode = document.getElementById("formStatus");
  const captchaInput = document.getElementById("captchaToken");

  if (!form || !statusNode || !captchaInput) {
    return;
  }

  if (config.captchaProvider === "mock") {
    captchaInput.value = config.captchaMockToken;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusNode.textContent = "";

    const submitButton = form.querySelector("button[type='submit']");
    submitButton?.setAttribute("disabled", "disabled");

    try {
      const { csrfToken } = await getCsrfToken();
      const payload = toPayload(form, captchaInput.value);
      await sendLead(payload, csrfToken);
      form.reset();
      if (config.captchaProvider === "mock") {
        captchaInput.value = config.captchaMockToken;
      }
      setStatus(statusNode, successMessage);
    } catch (error) {
      setStatus(statusNode, `${errorMessage}: ${error.message}`, true);
    } finally {
      submitButton?.removeAttribute("disabled");
    }
  });
}
