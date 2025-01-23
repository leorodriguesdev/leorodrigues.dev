// src/app/api/contact/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// No App Router, a função de rota é exportada como POST, GET, etc.:
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    console.log("Requisição recebida:", { name, email, message });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_DESTINATION,
      subject: `Leorodrigues.dev - Contato de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado com sucesso:", info.response);

    // Retorna um JSON com status 200
    return NextResponse.json({ message: "E-mail enviado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json({ error: "Erro ao enviar email." }, { status: 500 });
  }
}
