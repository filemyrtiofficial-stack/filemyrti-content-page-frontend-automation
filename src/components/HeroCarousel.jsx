import { useEffect, useState, useRef } from "react";
import "./Style/HeroCarousel.css";

// Import local images
import img1 from "../assets/Hero/1.jpg";
import img2 from "../assets/Hero/2.png";
import img3 from "../assets/Hero/3.png";

// Slide data
const slides = [
  {
    id: 1,
    img: img1,
    title: "Top 25 Constitution Judgments for CLAT PG 2026",
    desc: "If you’re preparing for CLAT PG, you simply cannot afford to skip these 25 constitutional judgments. They’re the ones examiners love to test again and again...",
    link: "#",
  },
  {
    id: 2,
    img: img2,
    title: "Landmark Criminal Law Cases",
    desc: "Review the most important criminal law judgments you must know for exams.",
    link: "#",
  },
  {
    id: 3,
    img: img3,
    title: "Important PIL & Human Rights Cases",
    desc: "Essential PIL and Human Rights cases that shaped Indian jurisprudence.",
    link: "#",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer); // Cleanup timer
  }, []);

  // Touch events for mobile
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (distance > threshold) setCurrent((prev) => (prev + 1) % slides.length);
    else if (distance < -threshold) setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Navigation for previous and next slides
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section
      className="carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slides" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide) => (
          <div className="slide" key={slide.id}>
            <div className="slide-img">
              {/* Alt text for accessibility and SEO */}
              <img src={slide.img} alt={slide.title} loading="lazy" />
            </div>
            <div className="slide-content">
              {/* Category - Add to SEO relevance if used */}
              {/* <span className="category">{slide.category}</span> */}
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
              {/* Button with link to detailed page */}
              <a href={slide.link} className="cta-button" title={`Read more about ${slide.title}`}>
                Continue Reading
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
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

      {/* Arrow Navigation */}
      <button className="arrow left" onClick={prevSlide} aria-label="Previous slide">
        &#10094;
      </button>
      <button className="arrow right" onClick={nextSlide} aria-label="Next slide">
        &#10095;
      </button>
    </section>
  );
}
