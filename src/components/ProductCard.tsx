import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link className="product-image-link" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <div className="product-image-wrap">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 25vw"
            className="product-image"
            unoptimized
          />
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <span className="product-quick-view">View details <Icon name="arrow-right" size={15} /></span>
        </div>
      </Link>
      <div className="product-info">
        <div>
          <p className="product-category">{product.category}</p>
          <Link className="product-name" href={`/products/${product.slug}`}>{product.name}</Link>
        </div>
        <span className="product-price">{formatPrice(product.price)}</span>
      </div>
      <div className="product-rating"><Icon name="star" size={13} /><span>{product.rating}</span><span className="review-count">({product.reviews})</span></div>
    </article>
  );
}
