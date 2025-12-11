"use client";
import React, { FormEvent } from 'react';

export default function Contact() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');

        // Simple alert for demo purposes
        alert(`Teşekkürler Sayın ${name}, mesajınız alınmıştır. En kısa sürede size dönüş yapacağız.`);
        e.currentTarget.reset();
    };

    return (
        <section id="contact" className="section contact">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">İletişim</h2>
                    <p className="section-desc">Hukuki sorunlarınız için ücretsiz ön görüşme talep edebilirsiniz.</p>
                </div>
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <div className="contact-item">
                            <h3>Adres</h3>
                            <p>Plaza İş Merkezi, Kat: 12 No: 42<br />Çankaya, Ankara - Türkiye</p>
                        </div>
                        <div className="contact-item">
                            <h3>Telefon</h3>
                            <p><a href="tel:+903121234567">+90 (312) 123 45 67</a></p>
                            <p>Hafta İçi: 09:00 - 18:00</p>
                        </div>
                        <div className="contact-item">
                            <h3>E-posta</h3>
                            <p><a href="mailto:info@yasaldestek.com.tr">info@yasaldestek.com.tr</a></p>
                        </div>
                    </div>
                    <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Adınız Soyadınız</label>
                            <input type="text" id="name" name="name" required placeholder="Adınız Soyadınız" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-posta Adresiniz</label>
                            <input type="email" id="email" name="email" required placeholder="ornek@email.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Telefon Numaranız</label>
                            <input type="tel" id="phone" name="phone" placeholder="0555 555 55 55" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Mesajınız</label>
                            <textarea id="message" name="message" rows={5} required placeholder="Hukuki sorununuzu kısaca özetleyiniz..."></textarea>
                        </div>
                        <button type="submit" className="button button-primary full-width">Gönder</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
