import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/Icon";
import { categories, products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <section className="category-section section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A PLACE FOR EVERY LITTLE THING</p>
            <h2>Find your kind of <em>home.</em></h2>
          </div>
          <Link className="text-link" href="/search">Explore all <Icon name="arrow-right" size={16} /></Link>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link className="category-card" href={`/search?category=${encodeURIComponent(category.name)}`} key={category.name}>
              <div className="category-image-wrap">
                <Image src={category.image} alt={`${category.name} collection`} fill sizes="(max-width: 640px) 48vw, 25vw" unoptimized />
                <span className="category-number">0{index + 1}</span>
              </div>
              <div className="category-meta">
                <div><h3>{category.name}</h3><span>{category.count}</span></div>
                <Icon name="arrow-right" size={18} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bestsellers-section">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE GOOD THINGS, GONE GOOD</p>
              <h2>Little things we <em>love.</em></h2>
            </div>
            <Link className="text-link" href="/search?sort=popular">Shop bestsellers <Icon name="arrow-right" size={16} /></Link>
          </div>
          <div className="product-grid">
            {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="story-banner">
        <div className="story-image-wrap">
          <Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1500&q=85" alt="A quiet, warmly layered living room" fill sizes="(max-width: 800px) 100vw, 55vw" unoptimized />
        </div>
        <div className="story-copy">
          <p className="eyebrow">LESS, BUT A LITTLE BETTER</p>
          <h2>Good things take<br />their <em>time.</em></h2>
          <p>We believe a home is made in the small, everyday details. So we choose honest materials, thoughtful makers, and pieces you’ll want to keep around.</p>
          <Link className="button button-dark" href="/search?sort=new">A little about us <Icon name="arrow-right" size={17} /></Link>
        </div>
      </section>

      <section className="promise-strip">
        <span><Icon name="check" size={17} /> Thoughtfully sourced</span>
        <span><Icon name="check" size={17} /> Made to last</span>
        <span><Icon name="check" size={17} /> A little lighter on the planet</span>
      </section>
    </>
  );
}
