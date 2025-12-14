import React from 'react';
import Link from 'next/link';

export default function Pending() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-orange-500 to-orange-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 border-t-4 border-yellow-500">
        <div className="text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-yellow-500 mx-auto animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pagamento Pendente
          </h1>
          
          <p className="text-lg text-gray-600 mb-4">
            Seu pagamento está sendo processado.
          </p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Você receberá uma confirmação em breve. Verifique seu e-mail para
            atualizações sobre o status do seu pagamento.
          </p>

          <Link href="/">
            <a className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
              Voltar para a Página Inicial
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
