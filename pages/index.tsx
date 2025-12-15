import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaInstagram, FaTiktok } from "react-icons/fa";

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

// Dados dos Depoimentos
const testimonials = [
    {
        quote: "Eu estava completamente perdida, sem saber por onde começar a ganhar dinheiro online. O e-book me deu o mapa exato. Em uma semana, já estava aplicando as primeiras dicas e vendo resultados!",
        author: "Ana C. (Recife)"
    },
    {
        quote: "Sempre achei que era golpe, mas o 'Caminho Real' é direto ao ponto e mostra o que funciona. O investimento de R$ 9,90 se pagou no primeiro dia de aplicação. Um guia essencial!",
        author: "Bruno M. (São Paulo)"
    },
    {
        quote: "A linguagem é super acessível, e as estratégias são fáceis de implementar. Finalmente estou construindo minha renda extra sem sair de casa. Recomendo demais!",
        author: "Carla S. (Belo Horizonte)"
    },
    {
        quote: "O que mais gostei foi a mudança de mentalidade que o guia proporciona. Não é só sobre técnicas, é sobre como pensar como um empreendedor digital. Praticidade nota 10!",
        author: "Felipe G. (Porto Alegre)"
    },
    {
        quote: "Eu tinha medo de começar, mas a clareza do e-book me deu a confiança que faltava. É como ter um mentor te guiando a cada passo. Vale cada centavo!",
        author: "Juliana P. (Rio de Janeiro)"
    },
    {
        quote: "Economizei meses de pesquisa e muito dinheiro que gastaria em cursos caros e incompletos. Este e-book é o atalho que eu precisava para começar a ter lucro de verdade.",
        author: "Ricardo L. (Brasília)"
    },
];

// Lógica do Cronômetro
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

// Componente do Cronômetro
const CountdownTimer = () => {
    // Define a data final da promoção (Exemplo: 25 de Dezembro de 2025, 23:59:59)
    // ATENÇÃO: Ajuste o ano e o mês conforme a necessidade.
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
                        A PROMOÇÃO TERMINA EM:
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


export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para o carrossel
  const emailInputRef = useRef<HTMLInputElement>(null); // Ref para o campo de e-mail
  const isClient = useClientSide(); // Hook para o erro de hidratação

  // Lógica para o carrossel automático com fade
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        (prevSlide + 1) % testimonials.length
      );
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  const generateExternalReference = (): string => {
    // Gerar um ID único para o pedido
    // Formato: ORDER_timestamp_randomString
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
      // Validar e-mail
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Por favor, insira um e-mail válido.');
        setLoading(false);
        // Rola para o campo de e-mail se a validação falhar
        emailInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Gerar external_reference único
      const externalReference = generateExternalReference();
      console.log('External Reference gerado:', externalReference);

      // Chamar o backend para criar a preferência de pagamento
      // NOTA: O preço de R$9,90 deve ser configurado no backend para a promoção de Natal.
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

      // Redirecionar para o checkout do Mercado Pago
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

  // Função para rolar até o campo de e-mail
  const scrollToEmailInput = () => {
    emailInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center md:px-4 md:py-12 pb-24 md:pb-12"> {/* Adiciona padding extra no mobile para o botão fixo */}
      {/* Ajuste de largura: max-w-lg para mobile, e aumenta progressivamente para desktop */}
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white md:rounded-xl md:shadow-2xl p-8 sm:p-10 border-t-4 border-red-600">
        
        {/* Seção de Título e Gancho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
            PARE DE PERDER TEMPO!
          </h1>
          <p className="text-xl text-red-600 font-semibold mb-4">
            Desbloqueie o Segredo da Renda Online Ainda Neste Natal!
          </p>
          <h2 className="text-2xl leading-tight font-bold text-purple-700">
            "O Caminho Real para a Sua Renda Online"
          </h2>
        </div>

        {/* Seção de Preço e Urgência (Gatilho de Escassez e Contraste) */}
        <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg mb-6 text-center shadow-inner">
            <p className="text-sm font-medium text-gray-700 mb-1">
                <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full font-bold uppercase text-xs animate-pulse">
                    PROMOÇÃO RELÂMPAGO DE NATAL!
                </span>
            </p>
            <p className="text-lg text-gray-500 line-through">
                De R$ 23,90
            </p>
            <p className="text-4xl font-extrabold text-red-600">
                POR APENAS <span className="text-5xl">R$ 9,90</span>
            </p>
            <p className="text-sm font-medium text-red-700 mt-1">
                Economize mais de 58% - Oferta Válida Somente Até o Fim do Mês!
            </p>
        </div>

        {/* CRONÔMETRO DE CONTAGEM REGRESSIVA (Renderizado apenas no cliente) */}
        {isClient && <CountdownTimer />}
        {!isClient && (
            <div className="text-center mt-4 mb-6">
                <p className="text-lg font-bold text-red-600 mb-2">
                    A PROMOÇÃO TERMINA EM:
                </p>
                <div className="flex justify-center">
                    <div className="flex flex-col items-center mx-1 p-2 bg-red-700 rounded-lg shadow-md w-16 h-16 animate-pulse"></div>
                    <div className="flex flex-col items-center mx-1 p-2 bg-red-700 rounded-lg shadow-md w-16 h-16 animate-pulse"></div>
                    <div className="flex flex-col items-center mx-1 p-2 bg-red-700 rounded-lg shadow-md w-16 h-16 animate-pulse"></div>
                    <div className="flex flex-col items-center mx-1 p-2 bg-red-700 rounded-lg shadow-md w-16 h-16 animate-pulse"></div>
                </div>
            </div>
        )}

        {/* Seção de Benefícios (Gatilho de Razão) */}
        <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
                O que você vai conquistar com este Guia:
            </h3>
            <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <p>
                        <strong className="font-semibold">Clareza Total:</strong> Saiba exatamente por onde começar e o que evitar para não cair em golpes.
                    </p>
                </li>
                <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <p>
                        <strong className="font-semibold">Métodos Comprovados:</strong> Descubra as estratégias que realmente geram resultados, passo a passo.
                    </p>
                </li>
                <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <p>
                        <strong className="font-semibold">Liberdade Financeira:</strong> Comece a construir sua fonte de renda extra ou principal no conforto de casa.
                    </p>
                </li>
            </ul>
        </div>

        {/* Seção de Depoimentos (Carrossel Automático com Fade - Prova Social) */}
        <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-inner">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Quem Já Comprou Está Transformando a Vida!
            </h3>
            
            {/* Carrossel Container */}
            <div className="relative h-48"> {/* Altura fixa para evitar pulos de layout */}
                {testimonials.map((testimonial, index) => (
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
                {testimonials.map((_, index) => (
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

        {/* Formulário de Compra */}
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
              ref={emailInputRef} // Adiciona a ref ao input
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
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-4 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
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
              'SIM! Quero Meu E-book Agora por R$ 9,90'
            )}
          </button>
        </form>

        {/* Garantia e Informação Final (Gatilho de Segurança) */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            <strong className="text-purple-700">Compra 100% Segura.</strong> Seu acesso ao guia completo para começar sua jornada rumo à renda online será enviado imediatamente para o e-mail cadastrado após a confirmação do pagamento.
          </p>
        </div>

        {/* Seção de Redes Sociais */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm font-semibold text-gray-600 mb-3">
                Siga-nos nas Redes Sociais:
            </p>
            <div className="flex justify-center space-x-6">
                <a 
                    href="https://www.instagram.com/caminho.digital0/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-pink-600 transition-colors"
                    aria-label="Instagram"
                >
                    <FaInstagram className="w-8 h-8" />
                </a>
                <a 
                    href="https://www.tiktok.com/@caminho.digital0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-black transition-colors"
                    aria-label="TikTok"
                >
                    <FaTiktok className="w-8 h-8" />
                </a>
            </div>
            <p className="text-xs text-gray-400 mt-4">
                © {new Date().getFullYear()} [Seu Nome/Empresa]. Todos os direitos reservados.
            </p>
        </div>
      </div>

    </div>
  );
}