import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FeedbackPayload = {
  purpose?: string;
  details?: string;
  name?: string;
  contact?: string;
};

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

export async function POST(request: Request) {
  const payload = (await request.json()) as FeedbackPayload;
  const purpose = payload.purpose?.trim();
  const details = payload.details?.trim();
  const name = payload.name?.trim();
  const contact = payload.contact?.trim();

  if (!purpose || !details) {
    return NextResponse.json(
      { message: "目的と詳細は必須です。" },
      { status: 400 },
    );
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.FEEDBACK_TO || user;

  if (!user || !pass || !to) {
    return NextResponse.json(
      { message: "メール設定が未完了です。" },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  const subject = `【${purpose}】Tarot Journey フィードバック`;
  const lines = [
    `目的: ${purpose}`,
    `名前: ${name || "未入力"}`,
    `連絡先: ${contact || "未入力"}`,
    "",
    "詳細:",
    details,
  ];

  await transporter.sendMail({
    from: `"Tarot Journey" <${user}>`,
    to,
    subject,
    text: lines.join("\n"),
    replyTo: contact && isValidEmail(contact) ? contact : undefined,
  });

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
