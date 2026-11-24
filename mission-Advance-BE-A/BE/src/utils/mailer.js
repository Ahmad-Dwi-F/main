import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 587,
  secure: Number(process.env.MAIL_PORT) === 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendMail({ to, subject, text, html }) {
  return transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to,
    subject,
    text,
    html,
  });
}

export async function sendVerificationEmail({ to, token }) {
  const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
  const verificationUrl = `${baseUrl}/api/auth/verifikasi-email?token=${encodeURIComponent(token)}`;

  return sendMail({
    to,
    subject: "Verifikasi Akun Email Kamu",
    text: `Token verifikasi akun kamu: ${token}\nLink verifikasi: ${verificationUrl}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>Verifikasi Akun</h2>
        <p>Terima kasih sudah mendaftar. Klik link berikut untuk verifikasi email kamu:</p>
        <p><a href="${verificationUrl}">Verifikasi Email Sekarang</a></p>
        <p>Token verifikasi: <code>${token}</code></p>
      </div>
    `,
  });
}
