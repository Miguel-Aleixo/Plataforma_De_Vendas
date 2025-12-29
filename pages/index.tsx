"use client";

import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import {
  FaInstagram,
  FaTiktok,
  FaMoneyBillWave,
  FaArrowRight,
  FaGift,
} from "react-icons/fa";

export default function LinkBio() {
  useEffect(() => {
    const wakeBackend = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/ping`,
          { timeout: 10000 }
        );
      } catch (err) {
        // silêncio proposital
      }
    };

    wakeBackend();
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0B12] text-white relative overflow-hidden flex items-center justify-center px-6">

      {/* GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 blur-[160px]" />

      <section className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >

          {/* TÍTULO */}
          <h1 className="text-3xl font-extrabold leading-tight">
            Poste no digital sem travar.
          </h1>

          {/* SUB */}
          <p className="text-gray-400 text-sm leading-relaxed">
            Aqui estão os materiais que eu uso para criar conteúdo
            <br />
            mesmo sem ideias e sem aparecer.
          </p>

          {/* CTA GRATUITO */}
          <Link href="/conteudo_gratis">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="mt-6 flex items-center justify-center gap-4 py-5 rounded-2xl 
              bg-gradient-to-r from-emerald-500 to-green-600 
              font-bold text-lg shadow-[0_0_40px_rgba(16,185,129,0.45)]"
            >
              <FaGift className="text-xl" />
              <span>Acessar conteúdo gratuito</span>
              <FaArrowRight className="text-lg opacity-80" />
            </motion.div>
          </Link>

          {/* CTA PRINCIPAL */}
          <Link href="https://pay.kiwify.com.br/JDdfYqz">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex mt-4 items-center justify-center gap-4 py-5 rounded-2xl 
              bg-gradient-to-r from-purple-600 to-fuchsia-600 
              font-bold text-lg shadow-[0_0_40px_rgba(168,85,247,0.5)]"
            >
              <FaMoneyBillWave className="text-xl" />
              <span>Pack com 30 roteiros prontos</span>
              <FaArrowRight className="text-lg opacity-80" />
            </motion.div>
          </Link>

          {/* DIVISOR */}
          <div className="flex items-center gap-3 text-gray-600 text-xs mt-8">
            <span className="flex-1 h-px bg-gray-700" />
            redes sociais
            <span className="flex-1 h-px bg-gray-700" />
          </div>

          {/* REDES */}
          <div className="space-y-4">
            <a
              href="https://www.instagram.com/caminho.digital0/"
              target="_blank"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl 
              bg-white/5 border border-purple-500/20 hover:bg-white/10 transition"
            >
              <FaInstagram className="text-pink-400 text-xl" />
              <span>Instagram</span>
            </a>

            <a
              href="https://www.tiktok.com/@caminho.digital0"
              target="_blank"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl 
              bg-white/5 border border-purple-500/20 hover:bg-white/10 transition"
            >
              <FaTiktok className="text-white text-xl" />
              <span>TikTok</span>
            </a>
          </div>

          {/* FOOTER */}
          <p className="pt-8 text-[11px] text-gray-600">
            Conteúdo educacional • Resultados variam conforme execução
          </p>
        </motion.div>
      </section>
    </main>
  );
}
