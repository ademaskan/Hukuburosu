import Link from 'next/link';
import { Article } from '@/types';
import './blog.css';

async function getArticles(): Promise<Article[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
}

export const metadata = {
    title: 'Blog | Zeytin Hukuk',
    description: 'Hukuki gelismeler, makaleler ve bilgilendirici icerikler.',
};

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <main>
            <section className="blog-hero">
                <div className="container">
                    <h1>Hukuk Blogu</h1>
                    <p>Hukuki konularda bilgilendirici makaleler ve guncel gelismeler</p>
                </div>
            </section>

            <section className="blog-section">
                <div className="container">
                    {articles.length === 0 ? (
                        <div className="no-articles">
                            <h3>Henuz makale bulunmamaktadir</h3>
                            <p>Yakinda yeni icerikler eklenecektir.</p>
                        </div>
                    ) : (
                        <div className="blog-grid">
                            {articles.map((article) => (
                                <article key={article.id} className="blog-card">
                                    <div className="blog-card-image">
                                        {article.imageUrl ? (
                                            <img src={article.imageUrl} alt={article.title} />
                                        ) : (
                                            <span className="blog-card-image-placeholder">H</span>
                                        )}
                                    </div>
                                    <div className="blog-card-content">
                                        <div className="blog-card-meta">
                                            <span>{new Date(article.publishedAt).toLocaleDateString('tr-TR')}</span>
                                            <span>{article.author}</span>
                                        </div>
                                        <h3>{article.title}</h3>
                                        <p>{article.excerpt}</p>
                                        <Link href={`/blog/${article.slug}`} className="blog-card-link">
                                            Devamini Oku
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
