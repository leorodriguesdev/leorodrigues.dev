"use client";

import React, { useState } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o estado de carregamento

    const formData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      message: (document.getElementById("message") as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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

        // Limpa os campos do formulário
        (document.getElementById("name") as HTMLInputElement).value = "";
        (document.getElementById("email") as HTMLInputElement).value = "";
        (document.getElementById("message") as HTMLTextAreaElement).value = "";
      } else {
        toast.error("Erro ao enviar mensagem. Tente novamente mais tarde.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Erro ao enviar mensagem. Tente novamente mais tarde.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  const handleWhatsappSend = () => {
    const whatsappUrl = `https://wa.me/555180281270?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-4"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12 text-[var(--primary-color)] font-audiowide">
          Entre em Contato
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">
          Estou sempre aberto a novas oportunidades, colaborações e discussões
          sobre projetos interessantes. Vamos conversar!
        </p>

        {/* Tabs de E-mail e WhatsApp */}
        <div className="flex justify-center space-x-6 mb-6">
          <button
            onClick={() => handleTabChange("email")}
            className={`min-w-[150px] px-6 py-2 rounded-lg font-bold ${
              activeTab === "email"
                ? "bg-[var(--primary-color)] text-white"
                : "bg-[var(--bg-card)] text-[var(--text-color)]"
            }`}
          >
            <FaEnvelope className="inline mr-2" />
            E-mail
          </button>
          <button
            onClick={() => handleTabChange("whatsapp")}
            className={`px-6 py-2 rounded-lg font-bold ${
              activeTab === "whatsapp"
                ? "bg-[var(--primary-color)] text-white"
                : "bg-[var(--bg-card)] text-[var(--text-color)]"
            }`}
          >
            <FaWhatsapp className="inline mr-2" />
            WhatsApp
          </button>
        </div>

        {/* Conteúdo das Abas */}
        <div className="max-w-xl mx-auto bg-[var(--bg-card)] rounded-xl shadow-lg p-8">
          {activeTab === "email" ? (
            <form className="space-y-6" onSubmit={handleSubmitEmail}>
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
                <label htmlFor="email" className="text-lg font-medium mb-2 text-left">Email</label>
                <input
                  type="email"
                  id="email"
                  className="p-4 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                  placeholder="Seu Email"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-lg font-medium mb-2 text-left">Mensagem</label>
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
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-bold transition duration-300 ${
                  isLoading
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-[var(--primary-color)] text-white hover:bg-opacity-90"
                }`}
              >
                {isLoading ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="whatsappMessage" className="text-lg font-medium mb-2 text-left">Mensagem via WhatsApp</label>
                <textarea
                  id="whatsappMessage"
                  rows={3}
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  className="p-4 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                  placeholder="Digite sua mensagem"
                ></textarea>
              </div>
              <button
                onClick={handleWhatsappSend}
                className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition duration-300"
              >
                Enviar pelo WhatsApp
              </button>
            </div>
          )}
        </div>

        {/* Toast Container para mostrar as mensagens de sucesso */}
        <ToastContainer />
      </div>
    </section>
  );
};

export default Contact;
