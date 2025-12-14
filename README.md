# Frontend de Integração com Mercado Pago (Next.js + Tailwind CSS)

Este é um frontend moderno em Next.js com Tailwind CSS para integração com o Mercado Pago. Ele permite que os usuários insiram seu e-mail e realizem o pagamento de um produto digital.

## Pré-requisitos

*   Node.js (versão 14 ou superior)
*   npm ou yarn

## Instalação

1.  **Instale as dependências:**
    \`\`\`bash
    npm install
    \`\`\`

2.  **Configure as Variáveis de Ambiente:**
    O arquivo `.env.local` já foi criado. Edite-o com a URL do seu backend.

    \`\`\`
    # Arquivo: .env.local
    NEXT_PUBLIC_API_URL=http://localhost:3000
    \`\`\`

    Após o deploy do backend, substitua `http://localhost:3000` pela URL real do seu backend.

## Como Rodar

Para iniciar o servidor de desenvolvimento:

\`\`\`bash
npm run dev
\`\`\`

O frontend será iniciado em `http://localhost:3000`.

## Estrutura do Projeto

*   **`pages/`**: Contém as páginas da aplicação.
    *   **`index.tsx`**: Página inicial com o formulário de pagamento.
    *   **`feedback/success.tsx`**: Página exibida após um pagamento bem-sucedido.
    *   **`feedback/failure.tsx`**: Página exibida após um pagamento recusado.
    *   **`feedback/pending.tsx`**: Página exibida quando o pagamento está pendente.

*   **`styles/`**: Contém os arquivos CSS.
    *   **`globals.css`**: Estilos globais com diretivas do Tailwind CSS.

*   **`.env.local`**: Variáveis de ambiente.

*   **`tailwind.config.js`**: Configuração do Tailwind CSS.

*   **`postcss.config.js`**: Configuração do PostCSS para o Tailwind CSS.

## Fluxo de Funcionamento

1.  O usuário acessa a página inicial.
2.  Insere seu e-mail no formulário.
3.  Clica no botão "Ir para o Pagamento".
4.  O frontend envia uma requisição `POST` para `/create_preference` no backend.
5.  O backend retorna o `init_point` (URL de checkout do Mercado Pago).
6.  O usuário é redirecionado para o checkout do Mercado Pago.
7.  Após o pagamento, o Mercado Pago redireciona o usuário para uma das páginas de feedback (sucesso, falha ou pendente).
8.  Se o pagamento for aprovado, o webhook do backend envia o PDF para o e-mail do usuário.

## Tecnologias Utilizadas

*   **Next.js**: Framework React para produção
*   **React**: Biblioteca para construir interfaces de usuário
*   **Tailwind CSS**: Framework CSS utilitário para estilização rápida
*   **Axios**: Cliente HTTP para fazer requisições ao backend
*   **TypeScript**: Superset tipado do JavaScript

## Build para Produção

Para criar uma versão otimizada para produção:

\`\`\`bash
npm run build
npm run start
\`\`\`

## Recursos do Frontend

*   ✨ Design moderno e responsivo com Tailwind CSS
*   🎨 Gradientes de cor para melhor aparência visual
*   ⚡ Validação de e-mail no frontend
*   🔄 Spinner de carregamento durante o processamento
*   📱 Totalmente responsivo para dispositivos móveis
*   🎯 Páginas de feedback com ícones e cores distintas
*   🚀 Integração suave com o backend e Mercado Pago

---
*Desenvolvido por Manus AI*
