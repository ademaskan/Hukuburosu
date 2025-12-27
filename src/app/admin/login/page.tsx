'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '../admin.css';

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            // First check rate limit via our API
            const checkRes = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const checkData = await checkRes.json();

            if (checkRes.status === 429) {
                const minutes = Math.ceil(checkData.resetInSeconds / 60);
                setError(`Çok fazla başarısız giriş denemesi. ${minutes} dakika sonra tekrar deneyin.`);
                return;
            }

            if (!checkRes.ok) {
                setError(checkData.error || 'Geçersiz kullanıcı adı veya şifre');
                if (checkData.remainingAttempts !== undefined) {
                    setRemainingAttempts(checkData.remainingAttempts);
                }
                return;
            }

            // Credentials valid, now sign in with NextAuth
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Giriş yapılamadı. Lütfen tekrar deneyin.');
            } else {
                router.push('/admin');
                router.refresh();
            }
        } catch {
            setError('Giriş yapılırken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Admin Girişi</h1>
                    <p>Yönetim paneline erişmek için giriş yapın</p>
                </div>

                {error && (
                    <div className="admin-message admin-message-error">
                        {error}
                        {remainingAttempts !== null && remainingAttempts > 0 && (
                            <div className="remaining-attempts">
                                Kalan deneme hakki: {remainingAttempts}
                            </div>
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="admin-form-group">
                        <label htmlFor="username">Kullanıcı Adı</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Kullanıcı adınızı girin"
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="password">Şifre</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Şifrenizi girin"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="admin-btn admin-btn-primary login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </button>
                </form>
            </div>
        </div>
    );
}
