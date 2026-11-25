# Forma — thoughtful things for living

A responsive e-commerce storefront built with Next.js App Router, React, and TypeScript. The project is a front-end starter: products are sample data, and accounts, payments, inventory, and newsletter subscriptions are not connected to a backend.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run `npm run lint` and `npm run build` to validate the project.

## Routes

- `/` — rotating hero, category links, bestsellers, and store story
- `/search` — product search and category filters; category links pre-filter the results
- `/cart` — locally saved cart with quantity controls and subtotal
- `/products/[slug]` — product gallery, details, and related products
- `/profile` — account sign-in page UI

## Project structure

```text
src/
  app/
    layout.tsx              Shared announcement bar, navigation, and footer
    page.tsx                Storefront home page
    search/page.tsx         Search and category results
    cart/page.tsx           Persisted shopping cart
    products/[slug]/page.tsx Product detail route
    profile/page.tsx        Profile page
    globals.css             Shared responsive styles
  components/               Reusable navigation, gallery, carousel, cart, and cards
  context/CartContext.tsx   Shared cart state persisted in localStorage
  lib/products.ts           Typed sample catalog and category data
```

Product and category photography currently uses Unsplash image URLs. Replace the sample catalog in `src/lib/products.ts` and connect the account and checkout flows to your chosen services when adding a backend. The profile uses a local demo verification code and stores the email in the current browser; it does not send email or authenticate the address.
