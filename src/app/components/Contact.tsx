// components/Contact.tsx
"use client";

import React from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula envio do formulário
    toast.success("Mensagem enviada com sucesso!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-4"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12 text-[var(--primary-color)]">
          Entre em Contato
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">
          Estou sempre aberto a novas oportunidades, colaborações e discussões
          sobre projetos interessantes. Vamos conversar!
        </p>

        <div className="max-w-xl mx-auto bg-[var(--bg-card)] rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-medium mb-2 text-left">Nome</label>
              <input
                type="text"
                id="name"
                className="p-4 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                placeholder="Seu Nome"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-medium mb-22 text-left">Email</label>
              <input
                type="email"
                id="email"
                className="p-4 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                placeholder="Seu Email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="text-lg font-medium mb-22 text-left">Mensagem</label>
              <textarea
                id="message"
                rows={5}
                className="p-4 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                placeholder="Sua Mensagem"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition duration-300"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>

        {/* Toast Container para mostrar as mensagens de sucesso */}
        <ToastContainer />

      </div>
    </section>
  );
};

export default Contact;
