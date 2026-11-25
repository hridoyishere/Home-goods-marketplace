import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="wordmark footer-wordmark" href="/">
            forma<span>.</span>
          </Link>
          <p>Thoughtful things for living.<br />Made to feel like home.</p>
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          <Link href="/search?sort=new">New arrivals</Link>
          <Link href="/search?category=Furniture">Furniture</Link>
          <Link href="/search?category=Kitchen">Kitchen & dining</Link>
          <Link href="/search?category=Textiles">Textiles</Link>
        </div>
        <div className="footer-column">
          <h3>Need a hand?</h3>
          <Link href="/profile">Your account</Link>
          <a href="mailto:hello@forma.example">Contact us</a>
          <a href="mailto:hello@forma.example">Shipping & returns</a>
          <a href="mailto:hello@forma.example">FAQs</a>
        </div>
        <div className="footer-newsletter">
          <h3>A little good in your inbox.</h3>
          <p>New finds, thoughtful notes, and 10% off your first order.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Forma Studio. Made for everyday living.</span>
        <span>Thoughtfully sourced · Considered design · Made to last</span>
      </div>
    </footer>
  );
}
