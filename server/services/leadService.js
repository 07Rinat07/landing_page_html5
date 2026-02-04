import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const logsDir = path.resolve(process.cwd(), "logs");
const leadsFile = path.resolve(logsDir, "leads.log");

async function persistLead(lead) {
  await mkdir(logsDir, { recursive: true });
  const line = `${JSON.stringify(lead)}\n`;
  await appendFile(leadsFile, line, "utf8");
}

async function sendToCrm(lead, crmWebhookUrl, logger) {
  if (!crmWebhookUrl) {
    return;
  }

  const response = await fetch(crmWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(lead)
  });

  if (!response.ok) {
    logger.error({ status: response.status }, "CRM webhook вернул ошибку");
  }
}

export async function processLead({ lead, config, logger }) {
  await persistLead(lead);

  try {
    await sendToCrm(lead, config.integrations.crmWebhookUrl, logger);
  } catch (error) {
    logger.error({ err: error }, "Ошибка интеграции с CRM webhook");
  }
}
