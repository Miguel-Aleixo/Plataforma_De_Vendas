// /app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function saveOrder(orderId: string, email: string, nome: string) {
  const { error } = await supabase
    .from("orders")
    .insert([{ order_id: orderId, email, nome }]);
  if (error) throw error;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const nome = form.get("nome")?.toString();
    const email = form.get("email")?.toString();

    if (!nome || !email) {
      return NextResponse.json(
        { error: "Nome ou email faltando" },
        { status: 400 }
      );
    }

    // Criar preferência no Mercado Pago
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
              unit_price: 0.2,
              id: email, // usar email como id temporário
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

    const data = await resposta.json();

    if (!data.init_point) {
      console.log("Erro Mercado Pago:", data);
      return NextResponse.json({ error: "Falha MP", detalhe: data }, { status: 500 });
    }

    // Salva no Supabase
    try {
      await saveOrder(String(data.id), email, nome);
    } catch (dbError: any) {
      console.log("Erro ao salvar no Supabase:", dbError);
      return NextResponse.json({ error: true, detalhe: dbError.message }, { status: 500 });
    }

    // Retorna a URL do checkout pro frontend
    return NextResponse.json({ url: data.init_point });
  } catch (e: any) {
    console.log("Erro geral do checkout:", e);
    return NextResponse.json({ error: true, detalhe: e.message }, { status: 500 });
  }
}
