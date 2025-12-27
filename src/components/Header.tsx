"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="header">
            <div className="container header-container">
                <Link href="/" className="logo">
                    <Image src="/hukuklogo.png" alt="Zeytin Hukuk Logo" width={50} height={40} className="logo-icon" />
                    <span className="logo-text">Zeytin Hukuk</span>
                </Link>
                <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="nav-list">
                        <li><Link href="/#hero" className="nav-link" onClick={closeMenu}>Ana Sayfa</Link></li>
                        <li><Link href="/#services" className="nav-link" onClick={closeMenu}>Hizmetlerimiz</Link></li>
                        <li><Link href="/#about" className="nav-link" onClick={closeMenu}>Hakkımızda</Link></li>
                        <li><Link href="/blog" className="nav-link" onClick={closeMenu}>Blog</Link></li>
                        <li><Link href="/#contact" className="nav-link button-primary" onClick={closeMenu}>İletişime Geçin</Link></li>
                    </ul>
                </nav>
                <button
                    className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
                    aria-label="Menüyü Aç"
                    onClick={toggleMenu}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </header>
    );
}
