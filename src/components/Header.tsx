"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";

const links = [
  { label: "New arrivals", href: "/search?sort=new" },
  { label: "Furniture", href: "/search?category=Furniture" },
  { label: "Lighting", href: "/search?category=Lighting" },
  { label: "Home & living", href: "/search?category=Textiles" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name="menu" />
        </button>
        <Link className="wordmark" href="/" aria-label="Forma home">
          forma<span>.</span>
        </Link>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="header-action" href="/search" aria-label="Search products">
            <Icon name="search" />
            <span>Search</span>
          </Link>
          <Link className="icon-button" href="/profile" aria-label="Your profile">
            <Icon name="user" />
          </Link>
        </div>
      </div>
    </header>
  );
}
