// Importing necessary hooks and components
import { useState } from 'react'; // useState hook for managing state
import Modal from 'react-modal'; // Modal for displaying the gallery

// GalleryModal functional component accepting isOpen, onRequestClose, and images as props
const GalleryModal = ({ isOpen, onRequestClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // State for tracking the currently displayed image index

  // Early return if there are no images to display
  if (!images || images.length === 0) return null; // Condition to check if images are available

  // Function to go to the next image in the gallery
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1 // Loop back to the first image if at the end
    );
  };

  // Function to go to the previous image in the gallery
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1 // Loop back to the last image if at the beginning
    );
  };

  return (
    <Modal
      isOpen={isOpen} // Controls whether the modal is open
      onRequestClose={onRequestClose} // Function to close the modal
      contentLabel="Gallery" // Accessibility label for screen readers
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-60 z-50" // Styles for the modal content
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 z-40" // Styles for the modal overlay
    >
      <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-4xl h-[80vh] p-4 z-50">
        {/* Close button to hide the modal */}
        <button
          onClick={onRequestClose} // Close the modal on button click
          className="absolute -top-3 right-0 text-5xl font-bold text-black hover:text-gray-800 z-50" // Styles for the close button
        >
          &times; {/* Close icon */}
        </button>
        {/* Button to go to the previous image */}
        <button
          onClick={prevImage} // Navigate to the previous image
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-6xl font-bold text-gray-500 hover:text-gray-800" // Styles for the previous button
        >
          &lt; {/* Left arrow */}
        </button>
        {/* Button to go to the next image */}
        <button
          onClick={nextImage} // Navigate to the next image
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-6xl font-bold text-gray-500 hover:text-gray-800" // Styles for the next button
        >
          &gt; {/* Right arrow */}
        </button>
        {/* Displaying the currently selected image */}
        <img
          src={images[currentIndex]} // Current image source based on the index
          alt={`Gallery image ${currentIndex + 1}`} // Alt text for accessibility
          className="w-full h-full object-contain" // Styles for the image
        />
      </div>
    </Modal>
  );
};

// Exporting the GalleryModal component as a module for use in other parts of the application
export default GalleryModal;
