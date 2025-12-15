import React from 'react';
import Link from 'next/link';

export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 border-t-4 border-green-500">
        <div className="text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pagamento Aprovado!
          </h1>
          
          <p className="text-lg text-gray-600 mb-4">
            Seu pagamento foi processado com sucesso.
          </p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Você receberá o arquivo PDF no seu e-mail em breve. Por favor, verifique sua
            caixa de entrada e, **principalmente**, a pasta de <span className="font-bold text-red-500">SPAM (Lixo Eletrônico)</span>.
          </p>

            <a href='/' className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
              Voltar para a Página Inicial
            </a>
        
        </div>
      </div>
    </div>
  );
}