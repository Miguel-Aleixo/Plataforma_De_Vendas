"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaInstagram,
  FaTiktok,
  FaRocket,
  FaShieldAlt,
  FaMoneyBillWave,
  FaPlane,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* =======================
   CONTEÚDO (INALTERADO)
======================= */
const PAGE_CONTENT = {
  header: {
    title: "CHEGA DE PERDER TEMPO E DINHEIRO!",
    subtitle:
      "O ÚNICO GUIA QUE TRANSFORMA SEU CELULAR EM UMA MÁQUINA DE RENDA EXTRA.",
    ebookTitle: "O Caminho Real para a Sua Renda Online",
    hook:
      "Cansado de promessas vazias? Descubra o método simples e direto que já gerou resultados para centenas de pessoas comuns.",
  },
  pricing: {
    promoTag: "OFERTA ESPECIAL DE NATAL 🎄",
    originalPrice: "R$ 23,90",
    currentPrice: "R$ 9,90",
    savings: "Desconto exclusivo válido apenas até o Natal",
    urgencyTitle: "ESSA OFERTA TERMINA EM:",
  },
  benefits: [
    {
      title: "Mapa Completo e Sem Enrolação",
      description: "Passo a passo prático, direto ao ponto.",
      icon: FaRocket,
    },
    {
      title: "Evite Golpes",
      description: "Foco apenas no que realmente funciona.",
      icon: FaShieldAlt,
    },
    {
      title: "Renda Extra Imediata",
      description: "Estratégias simples para aplicar hoje.",
      icon: FaMoneyBillWave,
    },
    {
      title: "Liberdade Total",
      description: "Trabalhe de onde quiser.",
      icon: FaPlane,
    },
  ],
  testimonials: [
    {
      quote:
        "Em poucos dias já vi resultado. O guia é direto e honesto.",
      author: "Ana C.",
    },
    {
      quote:
        "Valeu cada centavo. Extremamente claro.",
      author: "Bruno M.",
    },
  ],
  cta: "QUERO MEU ACESSO IMEDIATO POR R$ 9,90",
  guarantee: "Garantia incondicional de 7 dias. Se não gostar, devolvemos seu dinheiro.",
  social: {
    instagram: "https://www.instagram.com/caminho.digital0/",
    tiktok: "https://www.tiktok.com/@caminho.digital0",
  },
};

/* =======================
   TIMER (INALTERADO)
======================= */
const calculateTimeLeft = (targetDate: Date) => {
  const difference = +targetDate - +new Date();
  let timeLeft: any = {};
  if (difference > 0) {
    timeLeft = {
      dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
      horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((difference / 1000 / 60) % 60),
      segundos: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

const CountdownTimer = () => {
  const targetDate = new Date("2025-12-25T23:59:59");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex justify-center gap-3 mt-4">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="px-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 text-center shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        >
          <p className="text-2xl font-bold text-white">{value as number}</p>
          <p className="text-xs text-purple-300 uppercase">{label}</p>
        </div>
      ))}
    </div>
  );
};

/* =======================
   COMPONENTE PRINCIPAL
======================= */
export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);

  const generateExternalReference = (): string => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 11);
    return `ORDER_${timestamp}_${randomString}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Por favor, insira um e-mail válido.');
        setLoading(false);
        emailInputRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        return;
      }

      const externalReference = generateExternalReference();
      console.log('External Reference gerado:', externalReference);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create_preference`,
        {
          buyer_email: email,
          external_reference: externalReference,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.init_point) {
        setSuccess('Redirecionando para o checkout...');
        window.location.href = response.data.init_point;
      } else if (response.data.sandbox_init_point) {
        setSuccess('Redirecionando para o checkout (Sandbox)...');
        window.location.href = response.data.sandbox_init_point;
      } else {
        setError('Erro ao obter o link de checkout. Tente novamente.');
      }
    } catch (err: any) {
      console.error('Erro ao criar preferência:', err);
      setError(
        err.response?.data?.message ||
        'Erro ao processar o pagamento. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0B12] text-white relative overflow-hidden">
      {/* GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/30 blur-[160px]" />

      <section className="max-w-3xl mx-auto px-6 pb-20 pt-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
            🎄 Promoção de Natal
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {PAGE_CONTENT.header.title}
          </h1>

          <p className="mt-4 text-purple-300 font-semibold">
            {PAGE_CONTENT.header.subtitle}
          </p>

          <p className="mt-4 text-gray-400">
            {PAGE_CONTENT.header.hook}
          </p>
        </motion.div>

        {/* PREÇO */}
        <div className="mt-10 text-center ">
          <p className="line-through text-gray-500">
            {PAGE_CONTENT.pricing.originalPrice}
          </p>
          <p className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
            R$ 9,90
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {PAGE_CONTENT.pricing.savings}
          </p>
          <CountdownTimer />
        </div>

        {/* BENEFÍCIOS */}
        <div className="grid md:grid-cols-2 gap-6 mt-14 text-center md:text-left">
          {PAGE_CONTENT.benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="p-6 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur"
              >
                <div className="flex flex-col items-center">
                  <div className="flex flex-row gap-2">
                    <Icon className="text-purple-400 text-2xl mb-3" />
                    <h3 className="font-bold">{b.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{b.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* GARANTIA 7 DIAS */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="mt-6 p-5 rounded-2xl bg-white/5 border border-purple-500/20 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaShieldAlt className="text-purple-400 text-xl" />
            <span className="font-semibold">Garantia de 7 dias</span>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Você pode testar o conteúdo por 7 dias.
            Se não for para você, basta solicitar o reembolso — simples e sem perguntas.
          </p>
        </motion.div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-14 space-y-4"
        >
          <input
            ref={emailRef}
            type="email"
            required
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-purple-500"
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 font-bold text-lg shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-[1.02] transition"
          >
            {loading ? "Processando..." : PAGE_CONTENT.cta}
          </button>
        </form>

        {/* GARANTIA */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          {PAGE_CONTENT.guarantee}
        </p>

        {/* SOCIAL */}
        <div className="flex justify-center gap-6 mt-6 text-gray-400">
          <a href={PAGE_CONTENT.social.instagram} target="_blank">
            <FaInstagram size={26} />
          </a>
          <a href={PAGE_CONTENT.social.tiktok} target="_blank">
            <FaTiktok size={26} />
          </a>
        </div>
      </section>
    </main>
  );
}
