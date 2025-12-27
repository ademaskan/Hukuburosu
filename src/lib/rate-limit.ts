// Simple in-memory rate limiter for login attempts
// In production, consider using Redis for distributed rate limiting

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(identifier: string): { allowed: boolean; remainingAttempts: number; resetInSeconds: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(identifier);

    // Clean up expired entries periodically
    if (rateLimitStore.size > 1000) {
        for (const [key, value] of rateLimitStore.entries()) {
            if (now > value.resetTime) {
                rateLimitStore.delete(key);
            }
        }
    }

    if (!entry || now > entry.resetTime) {
        // First attempt or window expired
        rateLimitStore.set(identifier, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW_MS,
        });
        return {
            allowed: true,
            remainingAttempts: RATE_LIMIT_MAX_ATTEMPTS - 1,
            resetInSeconds: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000),
        };
    }

    if (entry.count >= RATE_LIMIT_MAX_ATTEMPTS) {
        return {
            allowed: false,
            remainingAttempts: 0,
            resetInSeconds: Math.ceil((entry.resetTime - now) / 1000),
        };
    }

    entry.count++;
    return {
        allowed: true,
        remainingAttempts: RATE_LIMIT_MAX_ATTEMPTS - entry.count,
        resetInSeconds: Math.ceil((entry.resetTime - now) / 1000),
    };
}

export function resetRateLimit(identifier: string): void {
    rateLimitStore.delete(identifier);
}
