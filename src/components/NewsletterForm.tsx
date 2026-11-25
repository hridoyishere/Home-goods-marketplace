"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [message, setMessage] = useState("");

  return (
    <form
      className="newsletter-form"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("Newsletter sign-up is not connected yet.");
      }}
    >
      <label className="visually-hidden" htmlFor="newsletter-email">Your email address</label>
      <input id="newsletter-email" name="email" type="email" placeholder="Your email address" required />
      <button type="submit" aria-label="Subscribe">→</button>
      {message && <span className="form-status" role="status">{message}</span>}
    </form>
  );
}
