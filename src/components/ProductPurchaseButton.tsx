"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/products";

export default function ProductPurchaseButton({
  price,
}: {
  price: number;
}) {
  const [added, setAdded] = useState(false);

  return (
    <button
      className="button button-dark add-to-bag"
      type="button"
      onClick={() => {
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1800);
      }}
      aria-live="polite"
    >
      {added ? "Added to your bag ✓" : `Add to bag — ${formatPrice(price)}`}
    </button>
  );
}
