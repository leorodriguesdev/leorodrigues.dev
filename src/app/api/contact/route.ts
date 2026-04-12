import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getApiCopy, resolveApiLocale } from "@/lib/apiLocale";

export async function POST(request: Request) {
  const locale = resolveApiLocale(request);
  const api = getApiCopy(locale);

  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_DESTINATION,
      subject: `Leorodrigues.dev - Contato de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    });

    return NextResponse.json(
      { message: api.contactSuccess },
      { status: 200, headers: { "Content-Language": locale } },
    );
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { error: api.contactError },
      { status: 500, headers: { "Content-Language": locale } },
    );
  }
}
