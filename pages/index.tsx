import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaInstagram, FaTiktok, FaCheckCircle, FaRocket, FaShieldAlt, FaMoneyBillWave, FaPlane } from "react-icons/fa";

// =================================================================
// 1. DADOS ESTÁTICOS (Conteúdo da Página)
// =================================================================

// Conteúdo reescrito para maior persuasão e concisão
const PAGE_CONTENT = {
    header: {
        title: "CHEGA DE PERDER TEMPO E DINHEIRO!",
        subtitle: "O ÚNICO GUIA QUE TRANSFORMA SEU CELULAR EM UMA MÁQUINA DE RENDA EXTRA.",
        ebookTitle: "O Caminho Real para a Sua Renda Online",
        hook: "Cansado de promessas vazias? Descubra o método simples e direto que já gerou resultados para centenas de pessoas comuns. Seu futuro financeiro começa aqui, com um investimento menor que um lanche."
    },
    pricing: {
        promoTag: "OFERTA RELÂMPAGO: ÚLTIMAS HORAS!",
        originalPrice: "R$ 23,90",
        currentPrice: "R$ 9,90",
        savings: "Aproveite 58% de desconto. O preço voltará ao normal em breve!",
        urgencyTitle: "ESTA OFERTA EXCLUSIVA TERMINA EM:"
    },
    benefits: [
        {
            title: "Mapa Completo e Sem Enrolação",
            description: "Saiba exatamente o que fazer, passo a passo, para começar a lucrar online hoje. Zero teoria, 100% prática.",
            icon: FaRocket
        },
        {
            title: "Evite Golpes e Perdas",
            description: "Identifique e fuja dos métodos que só fazem você perder tempo e dinheiro. Foco apenas no que é comprovado.",
            icon: FaShieldAlt
        },
        {
            title: "Renda Extra Imediata",
            description: "Estratégias simples que você pode aplicar imediatamente para ver os primeiros resultados na sua conta.",
            icon: FaMoneyBillWave
        },
        {
            title: "Liberdade de Horário e Local",
            description: "Trabalhe de onde quiser, no seu próprio ritmo. O guia para construir sua independência financeira.",
            icon: FaPlane
        }
    ],
    testimonials: [
        {
            quote: "Em uma semana, já estava aplicando as primeiras dicas e vendo resultados! O e-book me deu o mapa exato.",
            author: "Ana C. (Recife)"
        },
        {
            quote: "O investimento de R$ 9,90 se pagou no primeiro dia de aplicação. É direto ao ponto e mostra o que funciona.",
            author: "Bruno M. (São Paulo)"
        },
        {
            quote: "A linguagem é super acessível, e as estratégias são fáceis de implementar. Finalmente estou construindo minha renda extra.",
            author: "Carla S. (Belo Horizonte)"
        },
        {
            quote: "Economizei meses de pesquisa e muito dinheiro. Este e-book é o atalho que eu precisava para começar a ter lucro de verdade.",
            author: "Ricardo L. (Brasília)"
        }
    ],
    cta: "QUERO MEU ACESSO IMEDIATO POR R$ 9,90",
    guarantee: "Compra 100% Segura. Seu acesso ao guia completo será enviado imediatamente para o e-mail cadastrado após a confirmação do pagamento. Comece a transformar sua vida financeira sem riscos.",
    social: {
        instagram: "https://www.instagram.com/caminho.digital0/",
        tiktok: "https://www.tiktok.com/@caminho.digital0"
    }
};

// =================================================================
// 2. COMPONENTES DE UTILIDADE (Mantidos e ajustados)
// =================================================================

// Hook para garantir que o componente só renderize no lado do cliente
const useClientSide = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient;
};

// Componente de Estrelas para Avaliação
const StarRating = () => (
    <div className="flex justify-center text-yellow-400 mb-2">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.917 1.48-8.279L.001 9.306l8.332-1.151L12 .587z"/>
            </svg>
        ))}
    </div>
);

// Lógica do Cronômetro (Mantida do original)
const calculateTimeLeft = (targetDate: Date) => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

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

// Componente do Cronômetro (Ajustado para usar o título de urgência do PAGE_CONTENT)
const CountdownTimer = () => {
    // Define a data final da promoção (Exemplo: 25 de Dezembro de 2025, 23:59:59)
    const targetDate = new Date('2025-12-25T23:59:59'); 
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents: JSX.Element[] = [];

    Object.keys(timeLeft).forEach((interval) => {
        const value = (timeLeft as any)[interval];
        if (!value && value !== 0) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="flex flex-col items-center mx-1 p-2 bg-red-700 rounded-lg shadow-md">
                <span className="text-2xl font-extrabold text-white leading-none">
                    {value < 10 ? `0${value}` : value}
                </span>
                <span className="text-xs font-medium text-red-200 uppercase mt-1">
                    {interval}
                </span>
            </div>
        );
    });

    return (
        <div className="text-center mt-4 mb-6">
            {timerComponents.length ? (
                <>
                    <p className="text-lg font-bold text-red-600 mb-2">
                        {PAGE_CONTENT.pricing.urgencyTitle}
                    </p>
                    <div className="flex justify-center">
                        {timerComponents}
                    </div>
                </>
            ) : (
                <p className="text-xl font-bold text-red-600">
                    A oferta expirou!
                </p>
            )}
        </div>
    );
};

// =================================================================
// 3. COMPONENTE PRINCIPAL (Refatorado V2 - Layout Otimizado)
// =================================================================

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0); 
  const emailInputRef = useRef<HTMLInputElement>(null); 
  const isClient = useClientSide(); 

  // Lógica para o carrossel automático com fade (Mantida)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        (prevSlide + 1) % PAGE_CONTENT.testimonials.length
      );
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  // Lógica de Pagamento (Mantida)
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
        emailInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const externalReference = generateExternalReference();
      console.log('External Reference gerado:', externalReference);

      // Chamar o backend para criar a preferência de pagamento
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create_preference`,
        { 
          buyer_email: email,
          external_reference: externalReference
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

  // Função para rolar até o campo de e-mail (Mantida)
  const scrollToEmailInput = () => {
    emailInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center md:px-4 md:py-12 pb-24 md:pb-12">
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white md:rounded-xl md:shadow-2xl p-8 sm:p-10 border-t-4 border-red-600">
        
        {/* Seção de Título e Gancho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
            {PAGE_CONTENT.header.title}
          </h1>
          <p className="text-xl text-red-600 font-semibold mb-4">
            {PAGE_CONTENT.header.subtitle}
          </p>
          <h2 className="text-2xl leading-tight font-bold text-purple-700 mb-4">
            "{PAGE_CONTENT.header.ebookTitle}"
          </h2>
          <p className="text-gray-600 italic max-w-xl mx-auto">
            {PAGE_CONTENT.header.hook}
          </p>
        </div>

        {/* Seção de Preço e Urgência (CRONÔMETRO SEPARADO E DESTAQUE) */}
        <div className="bg-red-50 border-2 border-red-300 p-6 rounded-lg mb-6 text-center shadow-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">
                <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-black uppercase text-sm animate-pulse">
                    {PAGE_CONTENT.pricing.promoTag}
                </span>
            </p>
            <p className="text-xl text-gray-500 line-through">
                De {PAGE_CONTENT.pricing.originalPrice}
            </p>
            <p className="text-5xl font-extrabold text-red-600 leading-none">
                POR APENAS <span className="text-6xl">R$ 9,90</span>
            </p>
            <p className="text-sm font-medium text-red-700 mt-2">
                {PAGE_CONTENT.pricing.savings}
            </p>
        </div>

        {/* CRONÔMETRO DE CONTAGEM REGRESSIVA (SEÇÃO SEPARADA PARA MAIOR DESTAQUE) */}
        <div className="mb-8 p-4 bg-red-100 rounded-lg border border-red-300">
            {isClient && <CountdownTimer />}
            {!isClient && (
                <div className="text-center">
                    <p className="text-lg font-bold text-red-600 mb-2">
                        {PAGE_CONTENT.pricing.urgencyTitle}
                    </p>
                    <div className="flex justify-center">
                        <div className="flex flex-col items-center mx-1 p-2 bg-red-700 rounded-lg shadow-md w-16 h-16 animate-pulse"></div>
                        <div className="flex flex-col items-center mx-1 p-2 bg-red-700 rounded-lg shadow-md w-16 h-16 animate-pulse"></div>
                        <div className="flex flex-col items-center mx-1 p-2 bg-red-700 rounded-lg shadow-md w-16 h-16 animate-pulse"></div>
                        <div className="flex flex-col items-center mx-1 p-2 bg-red-700 rounded-lg shadow-md w-16 h-16 animate-pulse"></div>
                    </div>
                </div>
            )}
        </div>

        {/* Seção de Benefícios (Melhor Escaneabilidade com Ícones) */}
        <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                O que você vai **CONQUISTAR** com este Guia:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PAGE_CONTENT.benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                        <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-md border-l-4 border-purple-500">
                            <Icon className="w-8 h-8 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="font-bold text-gray-900 block">{benefit.title}</strong>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Seção de Depoimentos (Carrossel Automático com Fade - Prova Social) */}
        <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-inner">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Quem Já Comprou Está Transformando a Vida!
            </h3>
            
            {/* Carrossel Container */}
            <div className="relative h-48">
                {PAGE_CONTENT.testimonials.map((testimonial, index) => (
                    <div 
                        key={index} 
                        className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ease-in-out ${
                            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                            <StarRating />
                            <p className="italic text-gray-700 mb-4 text-center">
                                "{testimonial.quote}"
                            </p>
                            <p className="text-sm font-semibold text-right text-purple-700">- {testimonial.author}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Indicadores de Slide (Dots) */}
            <div className="flex justify-center mt-20 md:mt-8 space-x-2">
                {PAGE_CONTENT.testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentSlide ? 'bg-purple-600' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Ir para o depoimento ${index + 1}`}
                    />
                ))}
            </div>
        </div>

        {/* Formulário de Compra (CTA DESTAQUE) */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              E-mail para Recebimento do E-book (Confirmação Imediata):
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.melhor.email@exemplo.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed text-lg"
              disabled={loading}
              required
              ref={emailInputRef}
            />
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
              <p className="text-green-800 font-medium">{success}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-2xl py-5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
            ) : (
              PAGE_CONTENT.cta
            )}
          </button>
        </form>

        {/* Garantia e Informação Final */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            <strong className="text-purple-700">Garantia Total.</strong> {PAGE_CONTENT.guarantee}
          </p>
        </div>

        {/* Seção de Redes Sociais */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm font-semibold text-gray-600 mb-3">
                Siga-nos nas Redes Sociais:
            </p>
            <div className="flex justify-center space-x-6">
                <a 
                    href={PAGE_CONTENT.social.instagram}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-pink-600 transition-colors"
                    aria-label="Instagram"
                >
                    <FaInstagram className="w-8 h-8" />
                </a>
                <a 
                    href={PAGE_CONTENT.social.tiktok}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-black transition-colors"
                    aria-label="TikTok"
                >
                    <FaTiktok className="w-8 h-8" />
                </a>
            </div>
            <p className="text-xs text-gray-400 mt-4">
                © {new Date().getFullYear()} Caminho Digital. Todos os direitos reservados.
            </p>
        </div>
      </div>
    </div>
  );
}
