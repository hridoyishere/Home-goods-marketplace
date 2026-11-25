export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
};

const image = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const products: Product[] = [
  {
    id: "p01",
    slug: "arc-lounge-chair",
    name: "Arc Lounge Chair",
    category: "Furniture",
    price: 489,
    rating: 4.9,
    reviews: 38,
    badge: "Bestseller",
    image: image("photo-1598300056393-4aac492f4344"),
    images: [
      image("photo-1598300056393-4aac492f4344", 1200),
      image("photo-1567538096630-e0c55bd6374c", 1200),
      image("photo-1505693416388-ac5ce068fe85", 1200),
    ],
    description:
      "A quiet statement piece designed for slow mornings and long conversations. The sculpted silhouette pairs a solid oak frame with a softly textured, natural linen seat.",
    details: ["Solid oak frame", "Natural linen upholstery", "Made for everyday living"],
  },
  {
    id: "p02",
    slug: "stoneware-table-lamp",
    name: "Stoneware Table Lamp",
    category: "Lighting",
    price: 168,
    rating: 4.8,
    reviews: 24,
    badge: "Loved",
    image: image("photo-1507473885765-e6ed057f782c"),
    images: [
      image("photo-1507473885765-e6ed057f782c", 1200),
      image("photo-1507473885765-e6ed057f782c", 900),
      image("photo-1513506003901-1e6a229e2d15", 1200),
    ],
    description:
      "Hand-finished stoneware and a softly pleated shade bring a warm, gentle glow to the corners you love most.",
    details: ["Hand-finished ceramic base", "Warm white linen shade", "Compatible with LED bulbs"],
  },
  {
    id: "p03",
    slug: "everyday-canvas-tote",
    name: "Everyday Canvas Tote",
    category: "Accessories",
    price: 42,
    rating: 4.7,
    reviews: 61,
    image: image("photo-1544816155-12df9643f363"),
    images: [
      image("photo-1544816155-12df9643f363", 1200),
      image("photo-1590874103328-eac38a683ce7", 1200),
      image("photo-1548036328-c9fa89d128fa", 1200),
    ],
    description:
      "Your everyday carry-all, made from sturdy organic cotton canvas with just enough room for everything that matters.",
    details: ["100% organic cotton canvas", "Interior slip pocket", "Responsibly made"],
  },
  {
    id: "p04",
    slug: "ribbed-glass-carafe",
    name: "Ribbed Glass Carafe",
    category: "Kitchen",
    price: 56,
    rating: 4.9,
    reviews: 17,
    badge: "New",
    image: image("photo-1544787219-7f47ccb76574"),
    images: [
      image("photo-1544787219-7f47ccb76574", 1200),
      image("photo-1514228742587-6b1558fcca3d", 1200),
      image("photo-1511920170033-f8396924c348", 1200),
    ],
    description:
      "A gently ribbed glass carafe that makes even a glass of water feel like a small ritual. Hand-blown from clear recycled glass.",
    details: ["Recycled borosilicate glass", "750 ml capacity", "Dishwasher safe"],
  },
  {
    id: "p05",
    slug: "soft-knit-throw",
    name: "Soft Knit Throw",
    category: "Textiles",
    price: 124,
    rating: 4.8,
    reviews: 29,
    image: image("photo-1600210492486-724fe5c67fb0"),
    images: [
      image("photo-1600210492486-724fe5c67fb0", 1200),
      image("photo-1616486338812-3dadae4b4ace", 1200),
      image("photo-1618221195710-dd6b41faaea6", 1200),
    ],
    description:
      "A soft, breathable throw with a relaxed knit texture. Made for draping over your favourite chair or taking outside at dusk.",
    details: ["Responsibly sourced cotton blend", "Generous 130 × 180 cm size", "Machine washable"],
  },
  {
    id: "p06",
    slug: "sculptural-ceramic-vase",
    name: "Sculptural Ceramic Vase",
    category: "Decor",
    price: 74,
    rating: 4.9,
    reviews: 12,
    badge: "New",
    image: image("photo-1578500494198-246f612d3b3d"),
    images: [
      image("photo-1578500494198-246f612d3b3d", 1200),
      image("photo-1578749556568-bc2c40e68b61", 1200),
      image("photo-1490312278390-ab64016e0aa9", 1200),
    ],
    description:
      "An organic silhouette, a tactile matte glaze, and the kind of shape that looks lovely with or without flowers.",
    details: ["Hand-glazed stoneware", "Each piece is one of a kind", "Water-tight interior"],
  },
  {
    id: "p07",
    slug: "oak-side-table",
    name: "Oak Side Table",
    category: "Furniture",
    price: 245,
    rating: 4.8,
    reviews: 19,
    image: image("photo-1499933374294-4584851497cc"),
    images: [
      image("photo-1499933374294-4584851497cc", 1200),
      image("photo-1494438639946-1ebd1d20bf85", 1200),
      image("photo-1497366754035-f200968a6e72", 1200),
    ],
    description:
      "Thoughtful proportions and a softly rounded edge make this solid oak side table an easy fit beside a sofa or bed.",
    details: ["FSC-certified solid oak", "Natural oil finish", "Tool-free assembly"],
  },
  {
    id: "p08",
    slug: "linen-cushion-cover",
    name: "Linen Cushion Cover",
    category: "Textiles",
    price: 48,
    rating: 4.7,
    reviews: 33,
    image: image("photo-1616486338812-3dadae4b4ace"),
    images: [
      image("photo-1616486338812-3dadae4b4ace", 1200),
      image("photo-1618221195710-dd6b41faaea6", 1200),
      image("photo-1600210492486-724fe5c67fb0", 1200),
    ],
    description:
      "Relaxed, lived-in linen in a versatile natural tone. A simple way to bring a little more texture to your favourite spot.",
    details: ["European flax linen", "Hidden coconut-shell button closure", "Cover only; insert sold separately"],
  },
];

export const categories = [
  {
    name: "Furniture",
    count: "12 pieces",
    image: image("photo-1616486338812-3dadae4b4ace", 700),
  },
  {
    name: "Lighting",
    count: "08 pieces",
    image: image("photo-1507473885765-e6ed057f782c", 700),
  },
  {
    name: "Kitchen",
    count: "16 pieces",
    image: image("photo-1499933374294-4584851497cc", 700),
  },
  {
    name: "Textiles",
    count: "11 pieces",
    image: image("photo-1600210492486-724fe5c67fb0", 700),
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}


const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function getProductBySlug(slug: string) {
  try {
    const response = await fetch(
      `${API_URL}/api/products/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    console.log(data.product)

    // Adjust this if your backend wraps the product in { product: ... }
    return data.product;
  } catch (error) {
    console.error("Product fetching error:", error);
    return null
  }
}