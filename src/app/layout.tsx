import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Forma — Thoughtful things for living",
    template: "%s | Forma",
  },
  description:
    "Discover considered homewares, everyday essentials, and pieces made to last.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <CartProvider>
          <div className="announcement">
            Complimentary shipping on orders over $100
          </div>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
