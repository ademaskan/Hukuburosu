export default function About() {
    return (
        <section id="about" className="section about">
            <div className="container about-container">
                <div className="about-content">
                    <h2 className="section-title">Hakkımızda</h2>
                    <p className="lead-text">20 yılı aşkın tecrübemizle hukukun üstünlüğüne inanıyor, müvekkillerimiz için en doğru stratejileri geliştiriyoruz.</p>
                    <p>Yasal Destek Hukuk Bürosu olarak, dürüstlük, şeffaflık ve gizlilik ilkeleri çerçevesinde hizmet veriyoruz. Uzman avukat kadromuz, her dosyanın kendine özgü dinamiklerini analiz ederek, kişiye ve kuruma özel çözümler üretmektedir.</p>
                    <ul className="about-features">
                        <li>✅ %98 Müvekkil Memnuniyeti</li>
                        <li>✅ 500+ Başarılı Dava</li>
                        <li>✅ 7/24 Erişilebilir Danışmanlık</li>
                    </ul>
                </div>
                <div className="about-stats">
                    <div className="stat-item">
                        <span className="stat-number">20+</span>
                        <span className="stat-label">Yıllık Tecrübe</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">15</span>
                        <span className="stat-label">Uzman Avukat</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
