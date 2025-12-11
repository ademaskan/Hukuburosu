import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <span className="logo-icon">⚖️</span>
                        <span className="footer-logo-text">Yasal Destek</span>
                        <p>Adalet arayışınızda güvenilir çözüm ortağınız.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Hızlı Bağlantılar</h4>
                        <ul>
                            <li><Link href="#hero">Ana Sayfa</Link></li>
                            <li><Link href="#services">Hizmetlerimiz</Link></li>
                            <li><Link href="#about">Hakkımızda</Link></li>
                            <li><Link href="#contact">İletişim</Link></li>
                        </ul>
                    </div>
                    <div className="footer-legal">
                        <h4>Yasal</h4>
                        <ul>
                            <li><Link href="#">KVKK Aydınlatma Metni</Link></li>
                            <li><Link href="#">Gizlilik Politikası</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Yasal Destek Hukuk Bürosu. Tüm hakları saklıdır.</p>
                    <p className="disclaimer">Bu site Türkiye Barolar Birliği Reklam Yasağı Yönetmeliği&apos;ne uygun olarak hazırlanmıştır.</p>
                </div>
            </div>
        </footer>
    );
}
