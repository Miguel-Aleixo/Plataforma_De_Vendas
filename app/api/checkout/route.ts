import { saveOrder } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const nome = form.get("nome")?.toString();
    const email = form.get("email")?.toString();

    if (!nome || !email) {
      return NextResponse.json({ error: "Nome ou email faltando" }, { status: 400 });
    }

    // Cria o checkout no Mercado Pago
    const resposta = await fetch(
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
              unit_price: 0.01,
              id: email, // usamos email como id temporário
            },
          ],
          back_urls: {
            success: "https://caminhodigital.vercel.app/sucesso",
            failure: "https://caminhodigital.vercel.app/erro",
          },
          auto_return: "approved",
        }),
      }
    );

    const data = await resposta.json();

    if (!data.init_point) {
      return NextResponse.json({ error: "Falha MP", detalhe: data }, { status: 500 });
    }

    if (!data.id) {
      console.log("MP não retornou id:", data);
    } else {
      await saveOrder(String(data.id), email, nome);
    }

    // Redireciona direto pro checkout do MP
    return NextResponse.redirect(data.init_point);
  } catch (e) {
    console.log("ERRO CHECKOUT:", e);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
