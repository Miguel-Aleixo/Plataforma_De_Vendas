import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getEmailFromOrderId } from "@/app/lib/db";
import path from "path";
import fs from "fs";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_APP_PASSWORD!,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 WEBHOOK RECEBIDO:", body);

    if (!body?.data?.id) {
      return NextResponse.json({ ok: true });
    }

    const paymentId = body.data.id;

    const pagamento = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    ).then((r) => r.json());

    if (pagamento.status !== "approved") {
      return NextResponse.json({ ok: true });
    }

    // 🔑 ID correto do pedido
    const orderId = pagamento.external_reference;

    if (!orderId) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 400 });
    }

    const email = await getEmailFromOrderId(orderId);

    if (!email) {
      return NextResponse.json({ error: "E-mail não encontrado" }, { status: 404 });
    }

    const pdfPath = path.join(process.cwd(), "public", "ebook.pdf");
    const pdfBuffer = fs.readFileSync(pdfPath);

    await transporter.sendMail({
      from: `"E-book - O Caminho Real Para Sua Renda Online" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Seu e-book chegou 📘",
      html: `
    <h2>Obrigado pela compra!</h2>
    <p>Seu e-book está em anexo neste e-mail.</p>
    <p>Desejamos bons estudos 🚀</p>
  `,
      attachments: [
        {
          filename: "ebook.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("ERRO WEBHOOK:", err);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
