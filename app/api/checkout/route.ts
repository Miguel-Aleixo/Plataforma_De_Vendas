import { saveOrder } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const nome = form.get("nome");
  const email = form.get("email");

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
            unit_price: 0.50,
          },
        ],
        back_urls: {
          success: "https://lore-unboiled-thusly.ngrok-free.dev/sucesso",
          failure: "https://lore-unboiled-thusly.ngrok-free.dev/erro",
        },
        auto_return: "approved",
      }),
    }
  );

  const data = await resposta.json();

  if (data.id) {
    saveOrder(String(data.id), String(email));
  }

  if (!data.init_point) {
    return NextResponse.json(
      { error: "Falha MP", detalhe: data },
      { status: 500 }
    );
  }

  return NextResponse.redirect(data.init_point);
}
