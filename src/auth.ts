import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Kullanıcı Adı", type: "text" },
                password: { label: "Şifre", type: "password" },
            },
            async authorize(credentials) {
                const adminUsername = process.env.ADMIN_USERNAME || "admin";
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (!adminPassword) {
                    console.error("ADMIN_PASSWORD environment variable is not set");
                    return null;
                }

                if (
                    credentials?.username === adminUsername &&
                    credentials?.password === adminPassword
                ) {
                    return {
                        id: "1",
                        name: "Admin",
                        email: "admin@zeytinhukuk.com",
                    };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isOnLogin = nextUrl.pathname === "/admin/login";

            if (isOnAdmin && !isOnLogin) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            }

            if (isOnLogin && isLoggedIn) {
                return Response.redirect(new URL("/admin", nextUrl));
            }

            return true;
        },
    },
});
