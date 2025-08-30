import { env } from "cloudflare:workers";

interface EmailParams {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailParams) {
  console.log("Dummy email sent:", { to, subject, html, text });
  return { messageId: "dummy-message-id" };
}
