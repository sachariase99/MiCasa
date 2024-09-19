// Importing necessary hooks and libraries
import { useEffect, useRef } from 'react'; // useEffect for side effects and useRef for referencing DOM elements
import Modal from 'react-modal'; // Modal component for displaying the map

// Ensure that the modal is accessible by setting the app element
Modal.setAppElement('#root');

// MapModal functional component definition
const MapModal = ({ isOpen, onRequestClose, latitude, longitude }) => {
  // Creating a ref to hold a reference to the map DOM element
  const mapRef = useRef(null);

  // Effect to initialize the map when the modal is open
  useEffect(() => {
    if (isOpen) {
      // Ensure latitude and longitude are valid numbers
      const lat = parseFloat(latitude); // Convert latitude to a float
      const lng = parseFloat(longitude); // Convert longitude to a float
  
      // Check if lat and lng are valid numbers
      if (!isNaN(lat) && !isNaN(lng)) {
        // Timer to delay map initialization until mapRef is available
        const timer = setTimeout(() => {
          // Create a new map instance centered on the given coordinates
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 15, // Set zoom level
          });
  
          // Add a marker on the map at the specified coordinates
          new window.google.maps.Marker({
            position: { lat, lng },
            map,
          });
        }, 100); // Delay in milliseconds
  
        // Cleanup function to clear the timer when component unmounts or isOpen changes
        return () => clearTimeout(timer);
      } else {
        // Log error if invalid coordinates are provided
        console.error('Invalid latitude or longitude');
      }
    }
  }, [isOpen, latitude, longitude]); // Dependencies: effect runs when isOpen, latitude, or longitude changes

  return (
    <Modal
      isOpen={isOpen} // Modal visibility controlled by isOpen prop
      onRequestClose={onRequestClose} // Function to call when modal requests to close
      contentLabel="Estate Map" // Accessibility label for screen readers
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-60 z-50" // Styling for modal content
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 z-40" // Styling for modal overlay
    >
      <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-4xl h-[80vh] p-4 z-50">
        {/* Button to close the modal */}
        <button
          onClick={onRequestClose}
          className="absolute -top-3 right-0 text-5xl font-bold text-black hover:text-gray-800 z-50"
        >
          &times; {/* Close icon */}
        </button>
        {/* Div where the map will be rendered */}
        <div ref={mapRef} className="w-full h-full"></div>
      </div>
    </Modal>
  );
};

// Exporting the MapModal component as a module for use in other parts of the application
export default MapModal;
