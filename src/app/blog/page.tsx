import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { Article } from '@/types';
import './blog.css';

// Read articles directly from file
function getArticles(): Article[] {
    try {
        const dataFilePath = path.join(process.cwd(), 'src/data/articles.json');
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export const metadata = {
    title: 'Blog | Zeytin Hukuk',
    description: 'Hukuki gelişmeler, makaleler ve bilgilendirici içerikler.',
};

export default function BlogPage() {
    const articles = getArticles();

    return (
        <main>
            <section className="blog-hero">
                <div className="container">
                    <h1>Hukuk Blogu</h1>
                    <p>Hukuki konularda bilgilendirici makaleler ve güncel gelişmeler</p>
                </div>
            </section>

            <section className="blog-section">
                <div className="container">
                    {articles.length === 0 ? (
                        <div className="no-articles">
                            <h3>Henüz makale bulunmamaktadır</h3>
                            <p>Yakında yeni içerikler eklenecektir.</p>
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
                                            Devamını Oku
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

// Force dynamic rendering so new articles are visible without rebuild
export const dynamic = 'force-dynamic';
