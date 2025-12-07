import { getEmailFromOrderId } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const json = await req.json();
    console.log("📩 WEBHOOK RECEBIDO:", json);

    // só processa pagamentos
    if (json.type !== "payment") return NextResponse.json({ ok: true });

    const paymentId = json.data.id;

    const pagamento = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    }).then(r => r.json());

    console.log("Pagamento detalhado:", pagamento);

    if (pagamento.status !== "approved") return NextResponse.json({ ok: true });

    const preferenceId = pagamento.additional_info?.items?.[0]?.id || pagamento.order?.id;
    if (!preferenceId) return NextResponse.json({ error: "ID da ordem não encontrado" }, { status: 404 });

    const email = await getEmailFromOrderId(String(preferenceId));
    if (!email) return NextResponse.json({ error: "E-mail não encontrado" }, { status: 404 });

    console.log("📩 Enviando e-book para:", email);

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
    console.error("ERRO WEBHOOK:", e);
    return NextResponse.json({ error: true, message: e instanceof Error ? e.message : e }, { status: 500 });
  }
}
