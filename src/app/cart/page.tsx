"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useCart } from "@/context/CartContext";
import { formatPrice, getProduct } from "@/lib/products";

export default function CartPage() {
  const { items, hydrated, storageError, setQuantity, removeItem } = useCart();
  const cartItems = items.flatMap((item) => {
    const product = getProduct(item.slug);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (!hydrated) {
    return (
      <div className="cart-page section-shell">
        <p className="eyebrow">YOUR LITTLE FINDS</p>
        <h1>Your bag</h1>
        <p className="cart-loading">Loading your saved cart…</p>
      </div>
    );
  }

  return (
    <div className="cart-page section-shell">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Your bag</span></div>
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR LITTLE FINDS</p>
          <h1>Your bag <em>{cartItems.length > 0 && `(${items.reduce((sum, item) => sum + item.quantity, 0)})`}</em></h1>
        </div>
        <Link className="text-link" href="/search">Keep exploring <Icon name="arrow-right" size={16} /></Link>
      </div>

      {storageError && <p className="cart-error" role="alert">{storageError}</p>}

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="profile-icon"><Icon name="bag" size={24} /></div>
          <h2>A little room for something lovely.</h2>
          <p>Your bag is empty for now. Take a look around and find something you love.</p>
          <Link className="button button-dark" href="/search">Explore the collection <Icon name="arrow-right" size={16} /></Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your cart">
            {cartItems.map(({ product, quantity }) => (
              <article className="cart-item" key={product.slug}>
                <Link className="cart-item-image" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                  <Image src={product.image} alt={product.name} fill sizes="130px" unoptimized />
                </Link>
                <div className="cart-item-info">
                  <p className="product-category">{product.category}</p>
                  <Link className="cart-item-name" href={`/products/${product.slug}`}>{product.name}</Link>
                  <p className="cart-item-price">{formatPrice(product.price)}</p>
                  <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                    <button type="button" onClick={() => setQuantity(product.slug, quantity - 1)} aria-label={`Decrease ${product.name} quantity`}>−</button>
                    <span aria-live="polite">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(product.slug, quantity + 1)} aria-label={`Increase ${product.name} quantity`}>+</button>
                  </div>
                </div>
                <div className="cart-item-end">
                  <strong>{formatPrice(product.price * quantity)}</strong>
                  <button className="remove-item" type="button" onClick={() => removeItem(product.slug)} aria-label={`Remove ${product.name}`}>Remove</button>
                </div>
              </article>
            ))}
          </section>
          <aside className="cart-summary">
            <h2>A little summary</h2>
            <div><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div><span>Shipping</span><span>{subtotal >= 100 ? "Complimentary" : "Calculated at checkout"}</span></div>
            <p>Taxes calculated at checkout.</p>
            <button className="button button-dark checkout-button" type="button" onClick={() => window.alert("Checkout is not connected yet.")}>Continue to checkout <Icon name="arrow-right" size={16} /></button>
            <span className="secure-note"><Icon name="check" size={14} /> Thoughtful things, sent with care</span>
          </aside>
        </div>
      )}
    </div>
  );
}
