"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

export default function ProfileSignInForm() {
  const [message, setMessage] = useState("");

  return (
    <form
      className="profile-form"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("Account sign-in is not connected yet. Add an authentication provider to enable accounts.");
      }}
    >
      <label htmlFor="profile-email">Email address</label>
      <input id="profile-email" name="email" type="email" placeholder="you@example.com" required />
      <button type="submit" className="button button-dark">Continue with email <Icon name="arrow-right" size={17} /></button>
      {message && <p className="form-status" role="status">{message}</p>}
    </form>
  );
}
