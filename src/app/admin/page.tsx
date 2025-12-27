'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Article } from '@/types';
import './admin.css';

export default function AdminPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await fetch('/api/articles');
            if (res.ok) {
                const data = await res.json();
                setArticles(data);
            }
        } catch (error) {
            console.error('Failed to fetch articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`"${title}" makalesini silmek istediğinize emin misiniz?`)) {
            return;
        }

        try {
            const res = await fetch(`/api/articles/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setArticles(articles.filter((a) => a.id !== id));
                setMessage({ type: 'success', text: 'Makale başarıyla silindi.' });
            } else {
                setMessage({ type: 'error', text: 'Makale silinirken bir hata oluştu.' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Makale silinirken bir hata oluştu.' });
        }

        setTimeout(() => setMessage(null), 3000);
    };

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <div className="admin-container">
            <div className="container">
                <header className="admin-header">
                    <h1>Makale Yonetimi</h1>
                    <div className="admin-header-actions">
                        <Link href="/admin/articles/new" className="admin-btn admin-btn-primary">
                            + Yeni Makale
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="admin-btn admin-btn-secondary"
                        >
                            Çıkış Yap
                        </button>
                    </div>
                </header>

                {message && (
                    <div className={`admin-message admin-message-${message.type}`}>
                        {message.text}
                    </div>
                )}

                {loading ? (
                    <div className="admin-loading">Yukleniyor...</div>
                ) : articles.length === 0 ? (
                    <div className="admin-empty">
                        <h3>Henuz makale bulunmamaktadir</h3>
                        <p>Yeni bir makale eklemek için yukaridaki butona tiklayin.</p>
                    </div>
                ) : (
                    <div className="admin-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Başlık</th>
                                    <th>Yazar</th>
                                    <th>Tarih</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article) => (
                                    <tr key={article.id}>
                                        <td>
                                            <strong>{article.title}</strong>
                                            <br />
                                            <small style={{ color: '#666' }}>{article.excerpt.substring(0, 60)}...</small>
                                        </td>
                                        <td>{article.author}</td>
                                        <td>{new Date(article.publishedAt).toLocaleDateString('tr-TR')}</td>
                                        <td>
                                            <div className="admin-table-actions">
                                                <Link
                                                    href={`/blog/${article.slug}`}
                                                    className="admin-btn admin-btn-secondary admin-btn-small"
                                                    target="_blank"
                                                >
                                                    Görüntüle
                                                </Link>
                                                <Link
                                                    href={`/admin/articles/${article.id}/edit`}
                                                    className="admin-btn admin-btn-primary admin-btn-small"
                                                >
                                                    Düzenle
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(article.id, article.title)}
                                                    className="admin-btn admin-btn-danger admin-btn-small"
                                                >
                                                    Sil
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
