import { saveOrder } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, email } = body;

    if (!nome || !email) {
      return NextResponse.json({ error: "Nome ou email faltando" }, { status: 400 });
    }

    // Cria a preferência no Mercado Pago
    const mpResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
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
              id: email, // id temporário
            },
          ],
          back_urls: {
            success: "https://plataforma-de-vendas-liard.vercel.app/sucesso",
            failure: "https://plataforma-de-vendas-liard.vercel.app/erro",
          },
          auto_return: "approved",
        }),
      }
    );

    const data = await mpResponse.json();

    if (!data.init_point) {
      return NextResponse.json({ error: "Falha MP", detalhe: data }, { status: 500 });
    }

    // Salva pedido no Supabase
    await saveOrder(String(data.id), email, nome);

    return NextResponse.json({ url: data.init_point });
  } catch (e) {
    console.error("Erro checkout:", e);
    return NextResponse.json({ error: true, message: (e as any).message }, { status: 500 });
  }
}
