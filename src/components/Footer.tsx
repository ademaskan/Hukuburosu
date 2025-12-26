import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Image src="/hukuklogo.png" alt="Zeytin Hukuk Logo" width={40} height={40} className="logo-icon" />
                        <span className="footer-logo-text">Zeytin Hukuk</span>
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
                    <p>&copy; 2024 Zeytin Hukuk Bürosu. Tüm hakları saklıdır.</p>
                    <p className="disclaimer">Bu site Türkiye Barolar Birliği Reklam Yasağı Yönetmeliği&apos;ne uygun olarak hazırlanmıştır.</p>
                </div>
            </div>
        </footer>
    );
}
