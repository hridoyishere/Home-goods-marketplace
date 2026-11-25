"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import Icon from "@/components/Icon";

const EMAIL_STORAGE_KEY = "forma-profile-email";
const EMAIL_CHANGE_EVENT = "forma-profile-email-change";

function subscribeToEmail(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EMAIL_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EMAIL_CHANGE_EVENT, callback);
  };
}

function getStoredEmail() {
  return window.localStorage.getItem(EMAIL_STORAGE_KEY);
}

function getServerEmail() {
  return null;
}

function createDemoCode() {
  const digits = window.crypto.getRandomValues(new Uint32Array(10));
  return Array.from(digits, (digit) => String(digit % 10)).join("");
}

export default function ProfileSignInForm() {
  const savedEmail = useSyncExternalStore(
    subscribeToEmail,
    getStoredEmail,
    getServerEmail,
  );
  const [email, setEmail] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [code, setCode] = useState("");
  const [demoCode, setDemoCode] = useState("");
  const [error, setError] = useState("");

  const requestCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submittedEmail = String(formData.get("email") ?? "").trim().toLowerCase();
    if (!submittedEmail) return;

    setPendingEmail(submittedEmail);
    setDemoCode(createDemoCode());
    setCode("");
    setError("");
  };

  const verifyCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\d{10}$/.test(code)) {
      setError("Enter all 10 digits of the verification code.");
      return;
    }
    if (code !== demoCode) {
      setError("That code doesn’t match. Check it and try again.");
      return;
    }

    try {
      window.localStorage.setItem(EMAIL_STORAGE_KEY, pendingEmail);
      window.dispatchEvent(new Event(EMAIL_CHANGE_EVENT));
      setError("");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? `Could not save your profile: ${reason.message}`
          : "Could not save your profile in this browser.",
      );
    }
  };

  const signOut = () => {
    try {
      window.localStorage.removeItem(EMAIL_STORAGE_KEY);
      window.dispatchEvent(new Event(EMAIL_CHANGE_EVENT));
      setEmail("");
      setPendingEmail("");
      setDemoCode("");
      setCode("");
      setError("");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? `Could not sign out: ${reason.message}`
          : "Could not sign out in this browser.",
      );
    }
  };

  if (savedEmail) {
    return (
      <div className="account-dashboard">
        <div className="account-signed-in">
          <Icon name="check" size={16} />
          <span>You’re signed in</span>
        </div>
        <p className="account-email">{savedEmail}</p>
        <div className="account-links">
          <a href="/cart">Your shopping bag <Icon name="arrow-right" size={15} /></a>
          <a href="/search">Explore the collection <Icon name="arrow-right" size={15} /></a>
        </div>
        <button className="account-sign-out" type="button" onClick={signOut}>Sign out</button>
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
    );
  }

  if (demoCode) {
    return (
      <form className="profile-form" onSubmit={verifyCode}>
        <p className="otp-destination">Enter the 10-digit code for <strong>{pendingEmail}</strong>.</p>
        <div className="demo-code-notice" role="status">
          <strong>Demo mode</strong>
          <span>No email was sent. Use this test code:</span>
          <code>{demoCode}</code>
        </div>
        <label htmlFor="verification-code">10-digit verification code</label>
        <input
          id="verification-code"
          name="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]{10}"
          maxLength={10}
          placeholder="0000000000"
          value={code}
          onChange={(event) => {
            setCode(event.target.value.replace(/\D/g, "").slice(0, 10));
            setError("");
          }}
          required
        />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="button button-dark">Verify code <Icon name="arrow-right" size={17} /></button>
        <button
          className="otp-back-button"
          type="button"
          onClick={() => {
            setDemoCode("");
            setPendingEmail("");
            setCode("");
            setError("");
          }}
        >
          Use a different email
        </button>
      </form>
    );
  }

  return (
    <form className="profile-form" onSubmit={requestCode}>
      <label htmlFor="profile-email">Email address</label>
      <input
        id="profile-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" className="button button-dark">Continue with email <Icon name="arrow-right" size={17} /></button>
      <p className="demo-sign-in-note">Demo sign-in: a test code will appear on screen. No email is sent.</p>
    </form>
  );
}
