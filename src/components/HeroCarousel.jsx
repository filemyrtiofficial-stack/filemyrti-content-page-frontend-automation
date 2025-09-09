import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import "./Style/HeroCarousel.css";

export default function HeroCarousel() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch blogs instead of hero-slides
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        // You can filter or take only latest 3 if needed
        setSlides(res.data.slice(0, 5)); // take first 5 blogs as hero slides
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

  // Touch events (mobile swipe)
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (distance > threshold) setCurrent((prev) => (prev + 1) % slides.length);
    else if (distance < -threshold) setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Navigation
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  if (slides.length === 0) return <p>Loading...</p>;

  return (
    <section
      className="carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slides" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide) => (
          <div className="slide" key={slide._id}>
            <div className="slide-img">
              <img src={slide.image} alt={slide.title} loading="lazy" />
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
