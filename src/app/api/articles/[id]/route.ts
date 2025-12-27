import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Article } from '@/types';

const dataFilePath = path.join(process.cwd(), 'src/data/articles.json');

function getArticles(): Article[] {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
}

function saveArticles(articles: Article[]): void {
    fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2));
}

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const articles = getArticles();
        const article = articles.find((a) => a.id === id || a.slug === id);

        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const articles = getArticles();
        const index = articles.findIndex((a) => a.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        const updatedArticle: Article = {
            ...articles[index],
            title: body.title || articles[index].title,
            slug: body.title
                ? body.title
                    .toLowerCase()
                    .replace(/ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/ş/g, 's')
                    .replace(/ı/g, 'i')
                    .replace(/ö/g, 'o')
                    .replace(/ç/g, 'c')
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim()
                : articles[index].slug,
            excerpt: body.excerpt || articles[index].excerpt,
            content: body.content || articles[index].content,
            author: body.author || articles[index].author,
            imageUrl: body.imageUrl !== undefined ? body.imageUrl : articles[index].imageUrl,
        };

        articles[index] = updatedArticle;
        saveArticles(articles);

        return NextResponse.json(updatedArticle);
    } catch {
        return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const articles = getArticles();
        const index = articles.findIndex((a) => a.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        articles.splice(index, 1);
        saveArticles(articles);

        return NextResponse.json({ message: 'Article deleted successfully' });
    } catch {
        return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
    }
}
