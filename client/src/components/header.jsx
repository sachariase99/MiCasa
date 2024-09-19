// Importing necessary hooks and images
import { useState, useEffect } from "react"; // useState for managing slide state and useEffect for side effects
import SlideOne from "../assets/Slideshow/slide-1.jpg"; // Importing slideshow images
import SlideTwo from "../assets/Slideshow/slide-2.jpg";
import SlideThree from "../assets/Slideshow/slide-3.jpg";
import SlideFour from "../assets/Slideshow/slide-4.jpg";
import SlideFive from "../assets/Slideshow/slide-5.jpg";
import SlideSix from "../assets/Slideshow/slide-6.jpg";

// Header functional component
const Header = () => {
  // Array of slides (images) for the slideshow
  const slides = [
    SlideOne,
    SlideTwo,
    SlideThree,
    SlideFour,
    SlideFive,
    SlideSix,
  ];

  // State to track the current slide index
  // Initialized to 0, indicating the first slide
  const [currentSlide, setCurrentSlide] = useState(0); 

  // Effect to manage automatic slide transitions
  useEffect(() => {
    // Set up an interval to change the slide every 10 seconds
    const interval = setInterval(() => {
      // Update the currentSlide to the next one, looping back to the first slide
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000); // Time interval in milliseconds (10000ms = 10 seconds)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval); 
  }, [slides.length]); // Dependency array: effect runs when slides.length changes

  return (
    <div>
      {/* Container for the header image */}
      <div className="absolute top-0 w-full -z-10">
        {/* Image displayed as the header background */}
        <img
          className="w-full h-[1000px] hidden xl:block" // Image styling: full width, hidden on small screens, visible on extra-large screens
          src={slides[currentSlide]} // Source is the current slide based on the state
          alt="Header Image" // Alt text for accessibility
        />
      </div>
    </div>
  );
};

// Exporting the Header component as a module for use in other parts of the application
export default Header;
