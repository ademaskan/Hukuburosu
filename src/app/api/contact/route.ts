import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Ad, e-posta ve mesaj alanları zorunludur.' },
                { status: 400 }
            );
        }

        // Configure transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL_TO,
            subject: `Yeni İletişim Formu Mesajı: ${name}`,
            html: `
        <h3>Yeni İletişim Formu Mesajı</h3>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Belirtilmedi'}</p>
        <br>
        <p><strong>Mesaj:</strong></p>
        <p>${message}</p>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Mesajınız başarıyla gönderildi.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.' },
            { status: 500 }
        );
    }
}
