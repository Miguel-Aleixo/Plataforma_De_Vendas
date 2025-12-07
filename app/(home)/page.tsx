export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-10 border border-blue-100">
        
        {/* TÍTULO */}
        <h1 className="text-5xl font-extrabold text-center text-gray-900">
          Transforme sua Renda com o  
          <span className="text-blue-600"> Ebook Definitivo </span>
        </h1>

        <p className="text-center text-gray-600 mt-4 text-lg">
          Aprenda formas reais e simples de ganhar renda extra mesmo começando do zero.
        </p>

        {/* PREÇO */}
        <div className="mt-10 text-center">
          <p className="text-xl text-gray-500 line-through">R$ 39,90</p>
          <p className="text-5xl font-extrabold text-green-600 drop-shadow">
            R$ 9,99
          </p>
          <p className="text-gray-500 mt-1">(por tempo limitado)</p>
        </div>

        {/* FORM */}
        <form
          action="/api/checkout"
          method="POST"
          className="mt-10 bg-blue-50 p-6 rounded-2xl shadow-inner"
        >
          <label className="block text-gray-700 font-semibold mb-1">
            Seu nome
          </label>
          <input
            required
            name="nome"
            className="w-full p-3 rounded-lg text-black border focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            placeholder="Digite seu nome"
          />

          <label className="block text-gray-700 font-semibold mb-1">
            Seu e-mail
          </label>
          <input
            required
            type="email"
            name="email"
            className="w-full p-3 rounded-lg text-black border focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
            placeholder="email@gmail.com"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition-transform hover:scale-[1.02]"
          >
            Comprar Agora 🔥
          </button>
        </form>

        {/* GARANTIA */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Compra segura • Entrega imediata do ebook após confirmação
        </div>

      </div>
    </main>
  );
}
