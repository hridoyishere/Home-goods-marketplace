
"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import {Product} from "@/lib/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


interface Pagination {
  currentPage: number;
  limit: number;
  totalProducts: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function HomeProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/products?page=${currentPage}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);
        setPagination(data.pagination);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, [currentPage]);

  if (loading) {
    return (
      <div
        className="product-grid product-grid-skeleton"
        role="status"
        aria-label="Loading products"
      >
        {Array.from({ length: 4 }, (_, index) => (
          <div className="product-skeleton-card" key={index} aria-hidden="true">
            <div className="product-skeleton-image product-skeleton-block" />
            <div className="product-skeleton-info">
              <div className="product-skeleton-category product-skeleton-block" />
              <div className="product-skeleton-name product-skeleton-block" />
              <div className="product-skeleton-rating product-skeleton-block" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="product-grid" aria-live="polite">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <nav
          className="pagination home-pagination"
          aria-label="Bestseller pages"
        >
          <button
            className="pagination-arrow"
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={!pagination.hasPreviousPage}
          >
            ← Previous
          </button>

          <div className="pagination-pages">
            {Array.from(
              { length: pagination.totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                className={`pagination-page${
                  page === currentPage ? " is-current" : ""
                }`}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="pagination-arrow"
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next →
          </button>
        </nav>
      )}
    </>
  );
}
