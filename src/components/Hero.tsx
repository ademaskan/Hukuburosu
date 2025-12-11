import Link from 'next/link';

export default function Hero() {
    return (
        <section id="hero" className="hero">
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <h1 className="hero-title">Adalet İçin Güçlü Çözümler</h1>
                <p className="hero-subtitle">Deneyimli kadromuzla yanınızdayız. Hukuki süreçlerinizde profesyonel destek alın.</p>
                <div className="hero-buttons">
                    <Link href="#contact" className="button button-primary large">Randevu Alın</Link>
                    <Link href="#services" className="button button-secondary large">Hizmetlerimiz</Link>
                </div>
            </div>
        </section>
    );
}
