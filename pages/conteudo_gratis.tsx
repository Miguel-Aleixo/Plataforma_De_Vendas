"use client";

import React, { useState } from "react";
import {
  FaInstagram,
  FaTiktok,
  FaGift,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

/* =======================
   CONTEÚDO FREE
======================= */
const PAGE_CONTENT = {
  header: {
    title: "LIBERADO: CONTEÚDO GRATUITO",
    subtitle:
      "Um material direto, sem enrolação, para você sair do zero.",
    hook:
      "Esse é o mesmo ponto de partida que eu usaria se estivesse começando hoje, sem dinheiro e sem audiência.",
  },
  benefits: [
    "Como evitar as armadilhas mais comuns",
    "Onde focar para não perder tempo",
    "O erro que faz 90% desistir",
    "Como evoluir para o próximo nível",
  ],
  cta: "QUERO ACESSAR GRATUITAMENTE",
  upsellTitle: "Quer ir além?",
  upsellText:
    "O conteúdo gratuito abre sua mente. O método completo te mostra o caminho passo a passo.",
};

/* =======================
   COMPONENTE
======================= */
export default function ConteudoGratis() {
  const [liberado, setLiberado] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B0B12] text-white relative overflow-hidden">
      {/* GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/30 blur-[160px]" />

      <section className="max-w-3xl mx-auto px-6 pb-20 pt-14">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
            🎁 Conteúdo gratuito
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {PAGE_CONTENT.header.title}
          </h1>

          <p className="mt-4 text-emerald-400 font-semibold">
            {PAGE_CONTENT.header.subtitle}
          </p>

          <p className="mt-4 text-gray-400">
            {PAGE_CONTENT.header.hook}
          </p>
        </motion.div>

        {/* BENEFÍCIOS */}
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {PAGE_CONTENT.benefits.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-white/5 border border-emerald-500/20"
            >
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-emerald-400" />
                <p className="text-gray-300 text-sm">{item}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA FREE */}
        {!liberado ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={() => setLiberado(true)}
            className="mt-14 w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 font-bold text-lg shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2"
          >
            <FaGift />
            {PAGE_CONTENT.cta}
            <FaArrowRight />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-14 p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
          >
            <p className="text-emerald-400 font-semibold mb-2">
              ✅ Acesso liberado
            </p>

            <p className="text-gray-400 text-sm mb-8">
              Informação sem ação não gera resultado.
            </p>

            <a
              href="/7-Passos-Para-Sua-Renda-Online.pdf"
              download
              className="mt-6 w-full py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 font-bold shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              Baixar conteúdo gratuito
            </a>

            <p className="mt-8 text-xs text-yellow-400">
              ⚠️ Está no Instagram ou TikTok?
              <br />
              Toque nos <b>três pontinhos (⋮)</b> e selecione
              <b className="underline ml-1">“Abrir no navegador”</b> para conseguir baixar.
            </p>

          </motion.div>
        )}

        {/* UPSELL */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-16 p-6 rounded-2xl bg-white/5 border border-purple-500/20 text-center"
        >
          <h3 className="text-xl font-bold mb-2">
            {PAGE_CONTENT.upsellTitle}
          </h3>

          <p className="text-gray-400 text-sm mb-4">
            {PAGE_CONTENT.upsellText}
          </p>

          <Link href="/metodo">
            <span className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 font-semibold shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              Acessar método completo
            </span>
          </Link>
        </motion.div>

        {/* SOCIAL */}
        <div className="flex justify-center gap-6 mt-10 text-gray-400">
          <a
            href="https://www.instagram.com/caminho.digital0/"
            target="_blank"
          >
            <FaInstagram size={26} />
          </a>
          <a
            href="https://www.tiktok.com/@caminho.digital0"
            target="_blank"
          >
            <FaTiktok size={26} />
          </a>
        </div>
      </section>
    </main>
  );
}
