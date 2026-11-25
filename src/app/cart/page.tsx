"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";

type CartItem = {
  product: Product;
  quantity: number;
};

export default function CartPage() {
  const { refreshCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart after component mounts
  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

      setCartItems(savedCart);
      setLoading(false);
    };

    loadCart();

    // Listen for cart changes in the same tab
    window.addEventListener("cart-updated", loadCart);

    return () => {
      window.removeEventListener("cart-updated", loadCart);
    };
  }, []);

  // Update quantity
  const updateQuantity = (productSlug: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) => {
      if (item.product.slug === productSlug) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }

      return item;
    });

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove product
  const RemoveItem = (productSlug: string) => {
    const updatedCart = cartItems.filter(
      (item) => item.product.slug !== productSlug,
    );

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    refreshCart();

  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (loading) {
    return (
      <div className="cart-page section-shell">
        <p className="cart-loading">Loading your bag...</p>
      </div>
    );
  }

  return (
    <div className="cart-page section-shell">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Your bag</span>
      </div>

      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR LITTLE FINDS</p>
          <h1>Your bag</h1>
        </div>

        <Link className="text-link" href="/search">
          Keep exploring
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="profile-icon">
            <Icon name="bag" size={24} />
          </div>

          <h2>A little room for something lovely.</h2>

          <p>
            Your bag is empty for now. Take a look around and find something you
            love.
          </p>

          <Link className="button button-dark" href="/search">
            Explore the collection
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your cart">
            {cartItems.map(({ product, quantity }) => (
              <article className="cart-item" key={product.slug}>
                <Link
                  className="cart-item-image"
                  href={`/products/${product.slug}`}
                  aria-label={`View ${product.name}`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="130px"
                    unoptimized
                  />
                </Link>

                <div className="cart-item-info">
                  <p className="product-category">{product.category}</p>

                  <Link
                    className="cart-item-name"
                    href={`/products/${product.slug}`}
                  >
                    {product.name}
                  </Link>

                  <p className="cart-item-price">
                    {formatPrice(product.price)}
                  </p>

                  <div
                    className="quantity-control"
                    aria-label={`Quantity for ${product.name}`}
                  >
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.slug, quantity - 1)}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span aria-live="polite">{quantity}</span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(product.slug, quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-end">
                  <strong>{formatPrice(product.price * quantity)}</strong>

                  <button
                    className="remove-item"
                    type="button"
                    onClick={() => RemoveItem(product.slug)}
                    aria-label={`Remove ${product.name}`}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <h2>A little summary</h2>

            <div>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div>
              <span>Shipping</span>
              <span>
                {subtotal >= 100 ? "Complimentary" : "Calculated at checkout"}
              </span>
            </div>

            <p>Taxes calculated at checkout.</p>

            <button
              className="button button-dark checkout-button"
              type="button"
              onClick={() => window.alert("Checkout is not connected yet.")}
            >
              Continue to checkout
              <Icon name="arrow-right" size={16} />
            </button>

            <span className="secure-note">
              <Icon name="check" size={14} />
              Thoughtful things, sent with care
            </span>
          </aside>
        </div>
      )}
    </div>
  );
}
