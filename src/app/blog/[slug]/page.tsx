import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { Article } from '@/types';
import fs from 'fs';
import path from 'path';
import '../blog.css';

// Read articles directly from file for static generation
function getArticlesFromFile(): Article[] {
    try {
        const dataFilePath = path.join(process.cwd(), 'src/data/articles.json');
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function getArticleBySlug(slug: string): Article | null {
    const articles = getArticlesFromFile();
    return articles.find((a) => a.slug === slug || a.id === slug) || null;
}

export async function generateStaticParams() {
    const articles = getArticlesFromFile();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article) {
        return { title: 'Makale Bulunamadı | Zeytin Hukuk' };
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
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    return (
        <main className="blog-detail">
            <div className="container">
                <Link href="/blog" className="back-link">
                    Blog&apos;a Dön
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

// Force dynamic rendering so new articles are visible without rebuild
export const dynamic = 'force-dynamic';
