import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { name, email, message } = req.body;

        console.log("Requisição recebida:", { name, email, message });

        // Configuração do Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail", // Altere para o serviço que está usando
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

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email enviado com sucesso:", info.response);
            res.status(200).json({ message: "E-mail enviado com sucesso!" });
        } catch (error) {
            console.error("Erro ao enviar email:", error);
            res.status(500).json({ error: "Erro ao enviar email." });
        }
    } else {
        console.error("Método não permitido:", req.method);
        res.status(405).json({ error: "Method not allowed" });
    }
}