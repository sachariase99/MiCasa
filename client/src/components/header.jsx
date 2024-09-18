import { useState, useEffect } from "react";
import SlideOne from "../assets/Slideshow/slide-1.jpg";
import SlideTwo from "../assets/Slideshow/slide-2.jpg";
import SlideThree from "../assets/Slideshow/slide-3.jpg";
import SlideFour from "../assets/Slideshow/slide-4.jpg";
import SlideFive from "../assets/Slideshow/slide-5.jpg";
import SlideSix from "../assets/Slideshow/slide-6.jpg";

const Header = () => {
  const slides = [
    SlideOne,
    SlideTwo,
    SlideThree,
    SlideFour,
    SlideFive,
    SlideSix,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      <div className="absolute top-0 w-full -z-10">
        <img
          className="w-full h-[1000px] hidden xl:block"
          src={slides[currentSlide]}
          alt="Header Image"
        />
      </div>
    </div>
  );
};

export default Header;
