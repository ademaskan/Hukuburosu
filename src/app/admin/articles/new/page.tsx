'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../../admin.css';

export default function NewArticlePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: 'Av. Zeytin Hukuk',
        imageUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
            setError('Lütfen tüm zorunlu alanları doldurun.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                setError('Makale oluşturulurken bir hata oluştu.');
            }
        } catch {
            setError('Makale oluşturulurken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <div className="container">
                <Link href="/admin" className="admin-back-link">
                    Yonetim Paneline Don
                </Link>

                <div className="admin-form">
                    <h1 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)' }}>
                        Yeni Makale Oluştur
                    </h1>

                    {error && (
                        <div className="admin-message admin-message-error">{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="admin-form-group">
                            <label htmlFor="title">Başlık *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Makale başlığını girin"
                                required
                            />
                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="excerpt">Özet *</label>
                            <textarea
                                id="excerpt"
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder="Makalenin kısa özetini girin (liste sayfasında görünecek)"
                                style={{ minHeight: '80px' }}
                                required
                            />
                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="content">İçerik *</label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Makale içeriğini girin. Başlıklar için ## kullanabilirsiniz."
                                required
                            />
                            <p className="admin-hint">
                                İpucu: Alt başlıklar için satır başına ## yazın (örn: ## Başlık)
                            </p>
                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="author">Yazar</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Yazar adı"
                            />
                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="imageUrl">Görsel URL (Opsiyonel)</label>
                            <input
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="/blog/gorsel.jpg veya https://example.com/gorsel.jpg"
                            />
                        </div>

                        <div className="admin-form-actions">
                            <button
                                type="submit"
                                className="admin-btn admin-btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Kaydediliyor...' : 'Makaleyi Kaydet'}
                            </button>
                            <Link href="/admin" className="admin-btn admin-btn-secondary">
                                İptal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
