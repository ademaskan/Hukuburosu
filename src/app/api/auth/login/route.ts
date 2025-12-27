import { NextResponse } from 'next/server';
import { signIn } from '@/auth';
import { checkRateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export async function POST(request: Request) {
    try {
        // Get client IP for rate limiting
        const headersList = await headers();
        const forwardedFor = headersList.get('x-forwarded-for');
        const ip = forwardedFor?.split(',')[0] || 'unknown';

        // Check rate limit
        const rateLimit = checkRateLimit(ip);
        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    error: 'Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.',
                    resetInSeconds: rateLimit.resetInSeconds
                },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Kullanıcı adı ve şifre gereklidir.' },
                { status: 400 }
            );
        }

        // Validate credentials
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            console.error('ADMIN_PASSWORD environment variable is not set');
            return NextResponse.json(
                { error: 'Sunucu yapılandırma hatası.' },
                { status: 500 }
            );
        }

        if (username === adminUsername && password === adminPassword) {
            // Credentials valid - let NextAuth handle the session
            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            {
                error: 'Geçersiz kullanıcı adı veya şifre.',
                remainingAttempts: rateLimit.remainingAttempts
            },
            { status: 401 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Giriş yapılırken bir hata oluştu.' },
            { status: 500 }
        );
    }
}
