// import type { Metadata } from "next";
// import Link from "next/link";
// import ProductCard from "@/components/ProductCard";
// import { categories, products } from "@/lib/products";

// export const metadata: Metadata = { title: "Search the collection" };

// type SearchParams = Promise<{ q?: string; category?: string; sort?: string; page?: string }>;

// const PRODUCTS_PER_PAGE = 4;

// export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
//   const params = await searchParams;
//   const query = params.q?.trim() ?? "";
//   const category = params.category?.trim() ?? "";
//   let results = products.filter((product) => {
//     const matchesCategory = !category || product.category.toLowerCase() === category.toLowerCase();
//     const searchable = `${product.name} ${product.category} ${product.description}`.toLowerCase();
//     return matchesCategory && (!query || searchable.includes(query.toLowerCase()));
//   });

//   if (params.sort === "new") results = [...results].reverse();
//   if (params.sort === "popular") results = [...results].sort((a, b) => b.reviews - a.reviews);

//   const pageCount = Math.max(1, Math.ceil(results.length / PRODUCTS_PER_PAGE));
//   const requestedPage = Number.parseInt(params.page ?? "1", 10);
//   const currentPage = Number.isSafeInteger(requestedPage)
//     ? Math.min(Math.max(requestedPage, 1), pageCount)
//     : 1;
//   const pageResults = results.slice(
//     (currentPage - 1) * PRODUCTS_PER_PAGE,
//     currentPage * PRODUCTS_PER_PAGE,
//   );
//   const pageHref = (page: number) => {
//     const search = new URLSearchParams();
//     if (query) search.set("q", query);
//     if (category) search.set("category", category);
//     if (params.sort) search.set("sort", params.sort);
//     search.set("page", String(page));
//     return `/search?${search.toString()}`;
//   };

//   const heading = query
//     ? `Results for “${query}”`
//     : category
//       ? category
//       : params.sort === "new"
//         ? "New arrivals"
//         : params.sort === "popular"
//           ? "Bestsellers"
//           : "The collection";

//   return (
//     <div className="search-page section-shell">
//       <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Search</span></div>
//       <div className="search-intro">
//         <p className="eyebrow">TAKE A LOOK AROUND</p>
//         <h1>{heading}</h1>
//         <p>Find something lovely for your everyday.</p>
//       </div>
//       <form className="search-form" action="/search" role="search">
//         <label className="visually-hidden" htmlFor="search-query">Search products</label>
//         <input id="search-query" type="search" name="q" placeholder="Try “lamp” or “linen”" defaultValue={query} />
//         {category && <input type="hidden" name="category" value={category} />}
//         <button type="submit">Search <span aria-hidden="true">→</span></button>
//       </form>
//       <div className="search-layout">
//         <aside className="search-filters">
//           <h2>Shop by category</h2>
//           <Link className={!category ? "filter-link is-active" : "filter-link"} href={query ? `/search?q=${encodeURIComponent(query)}` : "/search"}>All pieces</Link>
//           {categories.map((item) => (
//             <Link
//               className={category.toLowerCase() === item.name.toLowerCase() ? "filter-link is-active" : "filter-link"}
//               href={`/search?category=${encodeURIComponent(item.name)}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
//               key={item.name}
//             >
//               {item.name}<span>{products.filter((product) => product.category === item.name).length}</span>
//             </Link>
//           ))}
//           <Link className={category.toLowerCase() === "decor" ? "filter-link is-active" : "filter-link"} href="/search?category=Decor">Decor<span>1</span></Link>
//           <Link className={category.toLowerCase() === "accessories" ? "filter-link is-active" : "filter-link"} href="/search?category=Accessories">Accessories<span>1</span></Link>
//         </aside>
//         <section className="search-results" aria-label="Search results">
//           <div className="results-toolbar">
//             <span>{results.length} {results.length === 1 ? "piece" : "pieces"}{results.length > 0 && ` · Page ${currentPage} of ${pageCount}`}</span>
//             <Link href={`/search?${new URLSearchParams({
//               ...(query ? { q: query } : {}),
//               ...(category ? { category } : {}),
//               sort: "popular",
//             }).toString()}`}>Sort: Most loved</Link>
//           </div>
//           {results.length > 0 ? (
//             <>
//               <div className="product-grid">
//                 {pageResults.map((product) => <ProductCard key={product.id} product={product} />)}
//               </div>
//               {pageCount > 1 && (
//                 <nav className="pagination" aria-label="Search result pages">
//                   {currentPage > 1 ? (
//                     <Link className="pagination-arrow" href={pageHref(currentPage - 1)} aria-label="Previous page">← Previous</Link>
//                   ) : <span className="pagination-arrow is-disabled">← Previous</span>}
//                   <div className="pagination-pages">
//                     {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
//                       <Link
//                         key={page}
//                         className={`pagination-page${page === currentPage ? " is-current" : ""}`}
//                         href={pageHref(page)}
//                         aria-current={page === currentPage ? "page" : undefined}
//                       >
//                         {page}
//                       </Link>
//                     ))}
//                   </div>
//                   {currentPage < pageCount ? (
//                     <Link className="pagination-arrow" href={pageHref(currentPage + 1)} aria-label="Next page">Next →</Link>
//                   ) : <span className="pagination-arrow is-disabled">Next →</span>}
//                 </nav>
//               )}
//             </>
//           ) : (
//             <div className="empty-results">
//               <h2>Nothing just yet.</h2>
//               <p>We couldn’t find a match. Try another search or browse the whole collection.</p>
//               <Link className="button button-dark" href="/search">See all pieces</Link>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }









import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { ProductResponse } from "@/lib/products";

export const metadata: Metadata = {
  title: "Search the collection",
};

type SearchParams = Promise<{
  q?: string;
  category?: string;
  sort?: string;
  page?: string;
}>;

interface Category {
  name: string;
  count: number;
}

interface CategoryResponse {
  success: boolean;
  categories: Category[];
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const query = params.q?.trim() ?? "";
  const category = params.category?.trim() ?? "";
  const sort = params.sort ?? "new";

  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  // Build product API URL
  const apiParams = new URLSearchParams();

  apiParams.set("page", String(page));

  if (query) apiParams.set("search", query);
  if (category) apiParams.set("category", category);
  if (sort) apiParams.set("sort", sort);

  // Fetch products and categories
  let data: ProductResponse | null = null;
  let categories: Category[] = [];

  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch(`${API_URL}/api/products?${apiParams.toString()}`, {
        cache: "no-store",
      }),

      fetch(`${API_URL}/api/products/categories`, {
        cache: "no-store",
      }),
    ]);

    if (!productsResponse.ok) {
      throw new Error("Failed to fetch products");
    }

    data = await productsResponse.json();

    if (categoriesResponse.ok) {
      const categoryData: CategoryResponse =
        await categoriesResponse.json();

      categories = categoryData.categories ?? [];
    }
  } catch (error) {
    console.error("Search page API error:", error);
  }

  // Backend data
  const products = data?.products ?? [];
  const pagination = data?.pagination;

  const totalProducts = pagination?.totalProducts ?? 0;
  const totalPages = pagination?.totalPages ?? 0;
  const currentPage = pagination?.currentPage ?? page;

  // Preserve filters in pagination and sorting links
  const pageHref = (
    newPage: number,
    newSort = sort,
    newCategory = category,
  ) => {
    const search = new URLSearchParams();

    if (query) search.set("q", query);
    if (newCategory) search.set("category", newCategory);
    if (newSort) search.set("sort", newSort);

    search.set("page", String(newPage));

    return `/search?${search.toString()}`;
  };

  // Heading
  const heading = query
    ? `Results for “${query}”`
    : category
      ? category
      : sort === "new"
        ? "New arrivals"
        : sort === "popular"
          ? "Bestsellers"
          : "The collection";

  return (
    <div className="search-page section-shell">

      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Search</span>
      </div>

      <div className="search-intro">
        <p className="eyebrow">TAKE A LOOK AROUND</p>
        <h1>{heading}</h1>
        <p>Find something lovely for your everyday.</p>
      </div>

      <form className="search-form" action="/search" role="search">
        <label
          className="visually-hidden"
          htmlFor="search-query"
        >
          Search products
        </label>

        <input
          id="search-query"
          type="search"
          name="q"
          placeholder="Try “lamp” or “linen”"
          defaultValue={query}
        />

        {category && (
          <input
            type="hidden"
            name="category"
            value={category}
          />
        )}

        <button type="submit">
          Search <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="search-layout">

        <aside className="search-filters">
          <h2>Shop by category</h2>

          <Link
            className={
              !category
                ? "filter-link is-active"
                : "filter-link"
            }
            href={pageHref(1, sort, "")}
          >
            All pieces
          </Link>

          {categories.map((item) => (
            <Link
              className={
                category.toLowerCase() === item.name.toLowerCase()
                  ? "filter-link is-active"
                  : "filter-link"
              }
              href={pageHref(1, sort, item.name)}
              key={item.name}
            >
              {item.name}
              <span>{item.count}</span>
            </Link>
          ))}
        </aside>

        <section
          className="search-results"
          aria-label="Search results"
        >

          <div className="results-toolbar">
            <span>
              {totalProducts}{" "}
              {totalProducts === 1 ? "piece" : "pieces"}

              {totalProducts > 0 &&
                ` · Page ${currentPage} of ${totalPages}`}
            </span>

            <Link
              href={pageHref(
                1,
                sort === "popular" ? "new" : "popular",
              )}
            >
              Sort: Most loved
            </Link>
          </div>

          {data === null ? (
            <div className="empty-results">
              <h2>Unable to load products.</h2>
              <p>
                Please check your connection and try again later.
              </p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  className="pagination"
                  aria-label="Search result pages"
                >
                  {pagination?.hasPreviousPage ? (
                    <Link
                      className="pagination-arrow"
                      href={pageHref(currentPage - 1)}
                      aria-label="Previous page"
                    >
                      ← Previous
                    </Link>
                  ) : (
                    <span className="pagination-arrow is-disabled">
                      ← Previous
                    </span>
                  )}

                  <div className="pagination-pages">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((pageNumber) => (
                      <Link
                        key={pageNumber}
                        className={`pagination-page${
                          pageNumber === currentPage
                            ? " is-current"
                            : ""
                        }`}
                        href={pageHref(pageNumber)}
                        aria-current={
                          pageNumber === currentPage
                            ? "page"
                            : undefined
                        }
                      >
                        {pageNumber}
                      </Link>
                    ))}
                  </div>

                  {pagination?.hasNextPage ? (
                    <Link
                      className="pagination-arrow"
                      href={pageHref(currentPage + 1)}
                      aria-label="Next page"
                    >
                      Next →
                    </Link>
                  ) : (
                    <span className="pagination-arrow is-disabled">
                      Next →
                    </span>
                  )}
                </nav>
              )}
            </>
          ) : (
            <div className="empty-results">
              <h2>Nothing just yet.</h2>
              <p>
                We couldn’t find a match. Try another search or
                browse the whole collection.
              </p>

              <Link
                className="button button-dark"
                href="/search"
              >
                See all pieces
              </Link>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}
