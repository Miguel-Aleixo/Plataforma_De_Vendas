export default function Sucesso() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-emerald-700 text-white p-6">
      
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl w-full max-w-md text-center">
        
        <div className="flex justify-center mb-4">
          <div className="bg-white text-green-600 p-4 rounded-full shadow-lg">
            ✔
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Pagamento Confirmado!
        </h1>

        <p className="text-lg text-white/90 mb-6">
          Obrigado pela sua compra! Seu pagamento foi aprovado com sucesso.
        </p>

        <p className="text-md mb-6 text-white/80">
          Você receberá seu <strong>E-book</strong> no e-mail informado em poucos minutos.
        </p>

        <a
          href="/"
          className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
        >
          Voltar para o Início
        </a>
      </div>

      <footer className="mt-10 text-white/70 text-sm">
        © {new Date().getFullYear()} — Todos os direitos reservados
      </footer>
    </div>
  );
}
