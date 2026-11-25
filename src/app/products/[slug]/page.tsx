import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchaseButton from "@/components/ProductPurchaseButton";
import { formatPrice, getProduct, products } from "@/lib/products";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .concat(products.filter((item) => item.category !== product.category && item.id !== product.id))
    .slice(0, 4);

  return (
    <div className="product-page section-shell">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href={`/search?category=${encodeURIComponent(product.category)}`}>{product.category}</Link><span>/</span><span>{product.name}</span></div>
      <div className="product-detail">
        <ProductGallery product={product} />
        <div className="product-detail-copy">
          <p className="eyebrow">{product.category.toUpperCase()}</p>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span><Icon name="star" size={15} /> {product.rating}</span><a href="#reviews">{product.reviews} thoughtful reviews</a></div>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="detail-description">{product.description}</p>
          <div className="product-options">
            <p>Colour <strong>Natural</strong></p>
            <div className="colour-swatch" aria-label="Natural colour selected" />
          </div>
          <ProductPurchaseButton price={product.price} />
          <p className="shipping-note"><Icon name="check" size={15} /> Complimentary shipping over $100</p>
          <div className="details-accordion">
            <details open>
              <summary>Why you’ll love it <Icon name="plus" size={17} /></summary>
              <p>{product.description}</p>
            </details>
            <details>
              <summary>Materials & care <Icon name="plus" size={17} /></summary>
              <ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </details>
            <details id="reviews">
              <summary>Reviews ({product.reviews}) <Icon name="plus" size={17} /></summary>
              <p>Our community gives this piece {product.rating} out of 5 stars. Thoughtfully chosen, and loved in real homes.</p>
            </details>
          </div>
        </div>
      </div>
      <section className="related-section">
        <div className="section-heading">
          <div><p className="eyebrow">GOOD COMPANY</p><h2>You might also <em>like.</em></h2></div>
          <Link className="text-link" href={`/search?category=${encodeURIComponent(product.category)}`}>More {product.category.toLowerCase()} <Icon name="arrow-right" size={16} /></Link>
        </div>
        <div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </section>
    </div>
  );
}
