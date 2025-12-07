export default function Falha() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-red-600 to-red-800 text-white p-6">
      
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl w-full max-w-md text-center">
        
        <div className="flex justify-center mb-4">
          <div className="bg-white text-red-600 p-4 rounded-full shadow-lg">
            ✖
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Pagamento Não Aprovado
        </h1>

        <p className="text-lg text-white/90 mb-6">
          Ocorreu um erro ao processar seu pagamento.
        </p>

        <p className="text-md mb-6 text-white/80">
          Pode ter sido saldo insuficiente, dados incorretos ou falha na operadora.
        </p>

        <a
          href="/"
          className="inline-block bg-white text-red-700 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
        >
          Tentar Novamente
        </a>
      </div>

      <footer className="mt-10 text-white/70 text-sm">
        © {new Date().getFullYear()} — Todos os direitos reservados
      </footer>
    </div>
  );
}
