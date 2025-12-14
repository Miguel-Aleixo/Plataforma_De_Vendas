import React from 'react';
import Link from 'next/link';

export default function Failure() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-pink-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 border-t-4 border-red-500">
        <div className="text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pagamento Recusado
          </h1>
          
          <p className="text-lg text-gray-600 mb-4">
            Desculpe, seu pagamento não foi processado.
          </p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Verifique seus dados de pagamento e tente novamente. Se o problema
            persistir, entre em contato com seu banco.
          </p>

          <Link href="/">
            <a className="inline-block bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
              Tentar Novamente
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
