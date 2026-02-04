const JSON_HEADERS = {
  "Content-Type": "application/json"
};

export async function getPublicConfig() {
  const response = await fetch("/api/config", {
    headers: JSON_HEADERS,
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Не удалось загрузить конфигурацию клиента");
  }

  return response.json();
}

export async function getCsrfToken() {
  const response = await fetch("/api/csrf-token", {
    headers: JSON_HEADERS,
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Не удалось получить CSRF токен");
  }

  return response.json();
}

export async function sendLead(payload, csrfToken) {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: {
      ...JSON_HEADERS,
      "X-CSRF-Token": csrfToken
    },
    credentials: "include",
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = data?.errors?.map((error) => error.message).join("; ");
    throw new Error(detail || data.message || "Ошибка отправки заявки");
  }

  return data;
}
