// Importing the Modal component from the react-modal library for displaying modal windows
import Modal from 'react-modal'; // Modal for showing the floorplan

// FloorplanModal functional component accepting isOpen, onRequestClose, and floorplan as props
const FloorplanModal = ({ isOpen, onRequestClose, floorplan }) => {
  return (
    <Modal
      isOpen={isOpen} // Determines if the modal is open or closed
      onRequestClose={onRequestClose} // Function to close the modal when requested
      contentLabel="Floorplan" // Accessibility label for screen readers
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
        {/* Displaying the floorplan image */}
        <img src={floorplan} alt="Floorplan" className="w-full h-full object-contain" /> {/* Image of the floorplan */}
      </div>
    </Modal>
  );
};

// Exporting the FloorplanModal component as a module for use in other parts of the application
export default FloorplanModal;
