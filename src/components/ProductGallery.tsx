"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/products";

export default function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="gallery">
      <div className="gallery-main">
        <Image src={selectedImage} alt={product.name} fill priority loading="eager" sizes="(max-width: 800px) 100vw, 55vw" unoptimized />
      </div>
      <div className="gallery-thumbnails" aria-label="Product images">
        {product.images.map((image, index) => (
          <button
            className={`gallery-thumbnail${selectedImage === image ? " is-selected" : ""}`}
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(image)}
            aria-label={`View image ${index + 1} of ${product.name}`}
            aria-pressed={selectedImage === image}
          >
            <Image src={image} alt="" fill sizes="100px" unoptimized />
          </button>
        ))}
      </div>
    </div>
  );
}
