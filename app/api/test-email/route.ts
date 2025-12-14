import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Caminho do PDF
    const pdfPath = path.join(process.cwd(), "src/assets/ebook.pdf");

    console.log("📎 PDF existe?", fs.existsSync(pdfPath));

    const pdfBuffer = fs.readFileSync(pdfPath);

    await transporter.sendMail({
      from: `"Renda Digital Real" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // manda pra você mesmo
      subject: "TESTE – Envio de E-book 📘",
      html: `
        <h2>Teste de envio</h2>
        <p>Se você recebeu este e-mail com o PDF em anexo, está tudo certo.</p>
      `,
      attachments: [
        {
          filename: "ebook-teste.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ ok: true, message: "Email enviado com sucesso" });
  } catch (error: any) {
    console.error("❌ ERRO TESTE EMAIL:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
