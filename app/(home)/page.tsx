"use client";

import { useState } from "react";

export default function Home() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleComprar = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;

      const preferenceData = {
        items: [
          {
            title: "Ebook Definitivo",
            unit_price: 0.01,
            quantity: 1,
          },
        ],
        payer: {
          name: nome,
          email: email,
        },
        back_urls: {
          success: "https://caminhodigital.vercel.app/sucesso",
          failure: "https://caminhodigital.vercel.app/erro",
          pending: "https://caminhodigital.vercel.app/pendente",
        },
        auto_return: "approved",
      };

      const res = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${PUBLIC_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferenceData),
        }
      );

      const json = await res.json();

      if (json.id) {
        window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${json.id}`;
      } else {
        alert("Erro ao criar preferência");
        console.error(json);
      }
    } catch (err) {
      console.error("Erro no checkout:", err);
      alert("Erro no checkout, tente novamente.");
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-blue-200 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-10 border border-blue-100">

        {/* TÍTULO */}
        <h1 className="text-5xl font-extrabold text-center text-gray-900">
          Transforme sua Renda com o
          <span className="text-blue-600"> Ebook Definitivo </span>
        </h1>

        <p className="text-center text-gray-600 mt-4 text-lg">
          Aprenda formas reais e simples de ganhar renda extra mesmo começando do zero.
        </p>

        {/* PREÇO */}
        <div className="mt-10 text-center">
          <p className="text-xl text-gray-500 line-through">R$ 39,90</p>
          <p className="text-5xl font-extrabold text-green-600 drop-shadow">
            R$ 9,99
          </p>
          <p className="text-gray-500 mt-1">(por tempo limitado)</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleComprar}
          className="mt-10 bg-blue-50 p-6 rounded-2xl shadow-inner"
        >

          <label className="block text-gray-700 font-semibold mb-1">
            Seu nome
          </label>
          <input
            required
            name="nome"
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 rounded-lg text-black border focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            placeholder="Digite seu nome"
          />

          <label className="block text-gray-700 font-semibold mb-1">
            Seu e-mail
          </label>
          <input
            required
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg text-black border focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
            placeholder="email@gmail.com"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition-transform hover:scale-[1.02]"
          >
            Comprar Agora 🔥
          </button>
        </form>

        {/* GARANTIA */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Compra segura • Entrega imediata do ebook após confirmação
        </div>

      </div>
    </main>
  );
}
