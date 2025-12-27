"use client";
import React, { FormEvent } from 'react';

export default function Contact() {
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = React.useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Bir hata oluştu');
            }

            setStatus('success');
            setMessage(`Teşekkürler Sayın ${data.name}, mesajınız alınmıştır. En kısa sürede size dönüş yapacağız.`);
            form.reset();
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Mesaj gönderilirken bir hata oluştu.');
        } finally {
            // Reset status after 5 seconds if success
            if (status === 'success') {
                setTimeout(() => {
                    setStatus('idle');
                    setMessage('');
                }, 5000);
            }
        }
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
                            <p>Güzelyalı Mah. Ener Sk. No: 29/3 <br />Pendik/İstanbul</p>
                        </div>
                        <div className="contact-item">
                            <h3>Telefon</h3>
                            <p><a href="tel:+905333007306">+90 533 300 7306</a></p>
                            <p>Hafta İçi: 09:00 - 18:00</p>
                        </div>
                        <div className="contact-item">
                            <h3>E-posta</h3>
                            <p><a href="mailto:av.orhanzeytin@gmail.com">av.orhanzeytin@gmail.com</a></p>
                        </div>
                    </div>
                    <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Adınız Soyadınız</label>
                            <input type="text" id="name" name="name" required placeholder="Adınız Soyadınız" disabled={status === 'loading'} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-posta Adresiniz</label>
                            <input type="email" id="email" name="email" required placeholder="ornek@email.com" disabled={status === 'loading'} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Telefon Numaranız</label>
                            <input type="tel" id="phone" name="phone" placeholder="0555 555 55 55" disabled={status === 'loading'} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Mesajınız</label>
                            <textarea id="message" name="message" rows={5} required placeholder="Hukuki sorununuzu kısaca özetleyiniz..." disabled={status === 'loading'}></textarea>
                        </div>

                        {message && (
                            <div style={{
                                padding: '10px',
                                marginBottom: '15px',
                                borderRadius: '4px',
                                backgroundColor: status === 'success' ? '#d4edda' : '#f8d7da',
                                color: status === 'success' ? '#155724' : '#721c24',
                                border: `1px solid ${status === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                            }}>
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="button button-primary full-width"
                            disabled={status === 'loading'}
                            style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                        >
                            {status === 'loading' ? 'Gönderiliyor...' : 'Gönder'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
