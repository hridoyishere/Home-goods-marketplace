import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export const metadata: Metadata = { title: "Search the collection" };

type SearchParams = Promise<{ q?: string; category?: string; sort?: string }>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const category = params.category?.trim() ?? "";
  let results = products.filter((product) => {
    const matchesCategory = !category || product.category.toLowerCase() === category.toLowerCase();
    const searchable = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return matchesCategory && (!query || searchable.includes(query.toLowerCase()));
  });

  if (params.sort === "new") results = [...results].reverse();
  if (params.sort === "popular") results = [...results].sort((a, b) => b.reviews - a.reviews);

  const heading = query
    ? `Results for “${query}”`
    : category
      ? category
      : params.sort === "new"
        ? "New arrivals"
        : params.sort === "popular"
          ? "Bestsellers"
          : "The collection";

  return (
    <div className="search-page section-shell">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Search</span></div>
      <div className="search-intro">
        <p className="eyebrow">TAKE A LOOK AROUND</p>
        <h1>{heading}</h1>
        <p>Find something lovely for your everyday.</p>
      </div>
      <form className="search-form" action="/search" role="search">
        <label className="visually-hidden" htmlFor="search-query">Search products</label>
        <input id="search-query" type="search" name="q" placeholder="Try “lamp” or “linen”" defaultValue={query} />
        {category && <input type="hidden" name="category" value={category} />}
        <button type="submit">Search <span aria-hidden="true">→</span></button>
      </form>
      <div className="search-layout">
        <aside className="search-filters">
          <h2>Shop by category</h2>
          <Link className={!category ? "filter-link is-active" : "filter-link"} href={query ? `/search?q=${encodeURIComponent(query)}` : "/search"}>All pieces</Link>
          {categories.map((item) => (
            <Link
              className={category.toLowerCase() === item.name.toLowerCase() ? "filter-link is-active" : "filter-link"}
              href={`/search?category=${encodeURIComponent(item.name)}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
              key={item.name}
            >
              {item.name}<span>{products.filter((product) => product.category === item.name).length}</span>
            </Link>
          ))}
          <Link className={category.toLowerCase() === "decor" ? "filter-link is-active" : "filter-link"} href="/search?category=Decor">Decor<span>1</span></Link>
          <Link className={category.toLowerCase() === "accessories" ? "filter-link is-active" : "filter-link"} href="/search?category=Accessories">Accessories<span>1</span></Link>
        </aside>
        <section className="search-results" aria-label="Search results">
          <div className="results-toolbar">
            <span>{results.length} {results.length === 1 ? "piece" : "pieces"}</span>
            <Link href="/search?sort=popular">Sort: Most loved</Link>
          </div>
          {results.length > 0 ? (
            <div className="product-grid">
              {results.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="empty-results">
              <h2>Nothing just yet.</h2>
              <p>We couldn’t find a match. Try another search or browse the whole collection.</p>
              <Link className="button button-dark" href="/search">See all pieces</Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
