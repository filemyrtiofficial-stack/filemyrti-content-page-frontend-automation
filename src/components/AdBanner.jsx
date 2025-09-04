// src/components/AdBanner.jsx
import "./style/ad.css";
// import adImage from "../assets/Hero/1.avif"; // adjust path if 
// needed
import adImage from "../assets/Hero/1.avif"; // new ad image

export default function AdBanner() {
  return (
    <div className="ad-banner">
      <img src={adImage} alt="Ad Banner" />
    </div>
  );
}
