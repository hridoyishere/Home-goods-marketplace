"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

const slides = [
  {
    eyebrow: "THE EVERYDAY EDIT",
    title: <>A softer side<br />of <em>everyday.</em></>,
    copy: "Thoughtfully made pieces for the little moments that make a home.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=88",
    alt: "Calm, sunlit living room with thoughtful natural furnishings",
    link: "/search",
    linkLabel: "Explore the collection",
    note: "Spaces to slow down in",
  },
  {
    eyebrow: "MADE TO GATHER",
    title: <>Make room<br />for <em>together.</em></>,
    copy: "Natural materials and considered details, made to be part of your story.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88",
    alt: "Warm contemporary living space with a soft neutral palette",
    link: "/search?category=Furniture",
    linkLabel: "Find your feeling",
    note: "A place for everyone",
  },
  {
    eyebrow: "A LITTLE MORE LIGHT",
    title: <>Find your<br /><em>quiet glow.</em></>,
    copy: "The finishing touch that turns a room into your favourite place.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1800&q=88",
    alt: "Sculptural table lamp bringing a warm glow to a room",
    link: "/search?category=Lighting",
    linkLabel: "Shop lighting",
    note: "Light for slower evenings",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  const changeSlide = (direction: number) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section className="hero" aria-label="Featured collections">
      <div className="hero-track" style={{ transform: `translateX(-${active * 100}%)` }}>
        {slides.map((slide, index) => (
          <article className="hero-slide" key={slide.eyebrow} aria-hidden={active !== index}>
            <Image className="hero-image" src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="100vw" unoptimized />
            <div className="hero-shade" />
            <div className="hero-content">
              <p className="eyebrow hero-eyebrow">{slide.eyebrow}</p>
              <h1>{slide.title}</h1>
              <p className="hero-copy">{slide.copy}</p>
              <Link className="button button-light" href={slide.link}>
                {slide.linkLabel}<Icon name="arrow-right" size={17} />
              </Link>
            </div>
            <span className="hero-note">{slide.note}</span>
          </article>
        ))}
      </div>
      <div className="hero-controls">
        <div className="hero-dots" aria-label="Choose a slide">
          {slides.map((slide, index) => (
            <button
              key={slide.eyebrow}
              className={`hero-dot${active === index ? " is-active" : ""}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={active === index}
            />
          ))}
        </div>
        <div className="hero-arrows">
          <button type="button" className="hero-arrow" onClick={() => changeSlide(-1)} aria-label="Previous slide"><Icon name="arrow-left" /></button>
          <button type="button" className="hero-arrow" onClick={() => changeSlide(1)} aria-label="Next slide"><Icon name="arrow-right" /></button>
        </div>
      </div>
    </section>
  );
}
