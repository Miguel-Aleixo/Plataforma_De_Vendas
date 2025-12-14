import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
        return;
      }

      // Chamar o backend para criar a preferência de pagamento
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create_preference`,
        { buyer_email: email },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Compre seu Produto Digital
          </h1>
          <p className="text-lg text-gray-600">
            "O Caminho Real para a Sua Renda Online"
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Seu E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
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
              'Ir para o Pagamento'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Sobre o Produto</h2>
          <p className="text-gray-600 leading-relaxed">
            Acesse o guia completo para começar sua jornada rumo à renda online. 
            Após o pagamento, você receberá o PDF no seu e-mail.
          </p>
        </div>
      </div>
    </div>
  );
}
