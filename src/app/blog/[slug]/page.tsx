import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { Article } from '@/types';
import '../blog.css';

async function getArticle(slug: string): Promise<Article | null> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

async function getArticles(): Promise<Article[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
}

export async function generateStaticParams() {
    const articles = await getArticles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) {
        return { title: 'Makale Bulunamadi | Zeytin Hukuk' };
    }
    return {
        title: `${article.title} | Zeytin Hukuk`,
        description: article.excerpt,
    };
}

function parseContent(content: string): React.ReactNode[] {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = () => {
        if (currentParagraph.length > 0) {
            elements.push(
                <p key={elements.length}>{currentParagraph.join(' ')}</p>
            );
            currentParagraph = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('## ')) {
            flushParagraph();
            elements.push(
                <h2 key={`h2-${index}`}>{trimmedLine.replace('## ', '')}</h2>
            );
        } else if (trimmedLine.startsWith('### ')) {
            flushParagraph();
            elements.push(
                <h3 key={`h3-${index}`}>{trimmedLine.replace('### ', '')}</h3>
            );
        } else if (trimmedLine === '') {
            flushParagraph();
        } else {
            currentParagraph.push(trimmedLine);
        }
    });

    flushParagraph();
    return elements;
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <main className="blog-detail">
            <div className="container">
                <Link href="/blog" className="back-link">
                    Blog&apos;a Don
                </Link>

                <article>
                    <header className="blog-detail-header">
                        <h1>{article.title}</h1>
                        <div className="blog-detail-meta">
                            <span>{new Date(article.publishedAt).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                            <span>{article.author}</span>
                        </div>
                    </header>

                    {article.imageUrl && (
                        <div className="blog-detail-image">
                            <img src={article.imageUrl} alt={article.title} />
                        </div>
                    )}

                    <div className="blog-detail-content">
                        {parseContent(article.content)}
                    </div>
                </article>
            </div>
        </main>
    );
}
