
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

type Props = {
  product: Product;
};

export default function ProductPurchaseButton({ product }: Props) {

  const {refreshCart} = useCart();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const checkCart = () => {
      const cart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setIsInCart(
        cart.some(
          (item: { product: Product }) =>
            item.product?.slug === product.slug
        )
      );
    };

    checkCart();

    window.addEventListener("cart-updated", checkCart);

    return () => {
      window.removeEventListener("cart-updated", checkCart);
    };
  }, [product.slug]);

  const addItems = () => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingItemIndex = cart.findIndex(
      (item: { product: Product }) =>
        item.product?.slug === product.slug
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
      refreshCart();
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <div className="purchase-actions">
      {isInCart ? (
        <Link className="button button-dark add-to-bag" href="/cart">
          Added to your bag ✓ · View bag
        </Link>
      ) : (
        <button
          className="button button-dark add-to-bag"
          type="button"
          onClick={addItems}
        >
          Add to bag
        </button>
      )}
    </div>
  );
}
