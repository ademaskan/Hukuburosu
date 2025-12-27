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

export async function GET() {
    try {
        const articles = getArticles();
        return NextResponse.json(articles);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const articles = getArticles();

        const newArticle: Article = {
            id: Date.now().toString(),
            title: body.title,
            slug: body.title
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
                .trim(),
            excerpt: body.excerpt,
            content: body.content,
            author: body.author || 'Av. Zeytin Hukuk',
            publishedAt: new Date().toISOString().split('T')[0],
            imageUrl: body.imageUrl,
        };

        articles.unshift(newArticle);
        saveArticles(articles);

        return NextResponse.json(newArticle, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}
