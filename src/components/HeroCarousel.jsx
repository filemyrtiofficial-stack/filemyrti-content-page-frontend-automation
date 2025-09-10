import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import "./Style/HeroCarousel.css";

// Skeleton Loader for carousel
const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-slide"></div>
    <div className="skeleton-slide"></div>
    <div className="skeleton-slide"></div>
  </div>
);

// Memoized Slide Component
const Slide = React.memo(({ slide, index, current }) => (
  <div className="slide" key={slide._id}>
    <div className="slide-img">
      <img
        src={slide.image}
        alt={slide.title}
        // ✅ First slide loads eagerly for LCP
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        // ✅ Prevent CLS
        width="1200"
        height="600"
        // ✅ Responsive images
        srcSet={`
          ${slide.image}?w=480 480w,
          ${slide.image}?w=768 768w,
          ${slide.image}?w=1200 1200w
        `}
        sizes="(max-width: 600px) 480px,
               (max-width: 1024px) 768px,
               1200px"
      />
    </div>
    <div className="slide-content">
      <h2>{slide.title}</h2>
      <p>
        {slide.description?.length > 150
          ? slide.description.substring(0, 150) + "..."
          : slide.description}
      </p>
      <Link to={`/blog/${slide.slug}`} aria-label={`Read more about ${slide.title}`}>
        <button className="cta-button">Continue Reading</button>
      </Link>
    </div>
  </div>
));

export default function HeroCarousel() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch blogs
  useEffect(() => {
    const fetchSlides = async () => {
      const cachedSlides = localStorage.getItem("heroSlides");
      if (cachedSlides) {
        setSlides(JSON.parse(cachedSlides));
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        const slidesData = res.data.slice(0, 3); // first 3 blogs
        setSlides(slidesData);
        localStorage.setItem("heroSlides", JSON.stringify(slidesData));
      } catch (err) {
        console.error("Error fetching blogs for hero carousel:", err);
      }
    };
    fetchSlides();
  }, []);

  // Auto Slide every 5s
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  // Touch events
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (distance > threshold) setCurrent((prev) => (prev + 1) % slides.length);
    else if (distance < -threshold) setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  if (slides.length === 0) return <SkeletonLoader />;

  return (
    <section
      className="carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slides" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, idx) => (
          <Slide key={slide._id} slide={slide} index={idx} current={current} />
        ))}
      </div>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={current === idx ? "active" : ""}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button className="arrow left" onClick={prevSlide} aria-label="Previous slide">
        &#10094;
      </button>
      <button className="arrow right" onClick={nextSlide} aria-label="Next slide">
        &#10095;
      </button>
    </section>
  );
}
