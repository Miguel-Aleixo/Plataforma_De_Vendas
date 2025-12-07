import { getEmailFromOrderId } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();

    console.log("📩 WEBHOOK RECEBIDO:", json);

    if (json.type !== "payment") {
      console.log("⚠️ NÃO É PAYMENT, IGNORADO");
      return NextResponse.json({ ok: true });
    }

    const paymentId = json.data.id;
    console.log("💳 paymentId recebido:", paymentId);

    const pagamento = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    ).then((r) => r.json());

    console.log("📘 PAGAMENTO COMPLETO:", pagamento);

    if (pagamento.status !== "approved") {
      console.log("⚠️ Pagamento não aprovado");
      return NextResponse.json({ ok: true });
    }

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

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.log("ERRO WEBHOOK:", e);
    return NextResponse.json({ erro: true }, { status: 500 });
  }
}
