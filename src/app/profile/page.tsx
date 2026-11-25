import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import ProfileSignInForm from "@/components/ProfileSignInForm";

export const metadata: Metadata = { title: "Your account" };

export default function ProfilePage() {
  return (
    <div className="profile-page section-shell">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Your account</span></div>
      <div className="profile-card">
        <div className="profile-icon"><Icon name="user" size={25} /></div>
        <p className="eyebrow">WELCOME TO FORMA</p>
        <h1>A little space<br />that’s <em>just yours.</em></h1>
        <p>Sign in to keep track of the good things you’ve found and the orders on their way home.</p>
        <ProfileSignInForm />
        <span className="profile-footnote">Your profile is saved in this browser.</span>
      </div>
      <div className="profile-benefits">
        <div><span>01</span><h2>Your orders</h2><p>Keep an eye on everything coming your way.</p></div>
        <div><span>02</span><h2>Your saved pieces</h2><p>Keep all your future favourites in one place.</p></div>
        <div><span>03</span><h2>A little easier</h2><p>Faster checkout, thoughtful updates, no fuss.</p></div>
      </div>
    </div>
  );
}
