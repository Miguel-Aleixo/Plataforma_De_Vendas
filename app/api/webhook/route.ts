import { getEmailFromOrderId } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const json = await req.json();

    console.log("📩 WEBHOOK RECEBIDO:", json);

    // Só processa se for pagamento
    if (json.type !== "payment") {
      console.log("⚠️ NÃO É PAYMENT, IGNORADO");
      return NextResponse.json({ ok: true });
    }

    const paymentId = json.data.id;
    console.log("💳 paymentId recebido:", paymentId);

    // Buscar pagamento real no MercadoPago
    const pagamento = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    ).then((r) => r.json());

    console.log("📘 PAGAMENTO COMPLETO:", pagamento);

    // Só envia se estiver APROVADO
    if (pagamento.status !== "approved") {
      console.log("⚠️ Pagamento não aprovado");
      return NextResponse.json({ ok: true });
    }

    // ID usado para achar o email no order.json
    const preferenceId =
      pagamento.additional_info?.items?.[0]?.id ||
      pagamento.order?.id;

    console.log("🆔 preferenceId:", preferenceId);

    const email = getEmailFromOrderId(String(preferenceId));

    if (!email) {
      console.log("⚠️ E-mail não encontrado no JSON!");
      return NextResponse.json({ erro: "sem email" });
    }

    console.log("📩 Enviando e-book para:", email);

    // 💥 ENVIA O EMAIL DE VERDADE
    await resend.emails.send({
      from: "E-book <noreply@rendaextra.dev>",
      to: email,
      subject: "Seu e-book chegou!",
      html: `
        <h2>Obrigado pela compra!</h2>
        <p>Clique no link abaixo para baixar seu e-book:</p>
        <a href="https://plataforma-de-vendas-liard.vercel.app/ebook.pdf">Baixar E-book</a>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.log("ERRO WEBHOOK:", e);
    return NextResponse.json({ erro: true }, { status: 500 });
  }
}
