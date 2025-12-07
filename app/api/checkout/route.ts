import { saveOrder } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // agora JSON
    const { nome, email } = body;

    if (!nome || !email) {
      return NextResponse.json({ error: "Nome ou email faltando" }, { status: 400 });
    }

    // cria preferência no Mercado Pago
    const resposta = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            title: "E-book Renda Extra",
            quantity: 1,
            currency_id: "BRL",
            unit_price: 0.20,
            id: email, // usamos email como id temporário
          },
        ],
        back_urls: {
          success: "https://plataforma-de-vendas-liard.vercel.app/sucesso",
          failure: "https://plataforma-de-vendas-liard.vercel.app/erro",
        },
        auto_return: "approved",
      }),
    });

    const data = await resposta.json();
    console.log("Resposta MP:", data);

    if (!data.init_point) {
      return NextResponse.json({ error: "Falha MP", detalhe: data }, { status: 500 });
    }

    // salva no Supabase
    await saveOrder(String(data.id), email, nome);

    return NextResponse.json({ checkoutUrl: data.init_point });
  } catch (e) {
    console.error("ERRO CHECKOUT:", e);
    return NextResponse.json({ error: true, message: e instanceof Error ? e.message : e }, { status: 500 });
  }
}
