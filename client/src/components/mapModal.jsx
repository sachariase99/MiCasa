import { useEffect, useRef } from 'react';
import Modal from 'react-modal';

// Ensure that the modal is accessible
Modal.setAppElement('#root');

const MapModal = ({ isOpen, onRequestClose, latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Ensure latitude and longitude are valid numbers
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
  
      if (!isNaN(lat) && !isNaN(lng)) {
        const timer = setTimeout(() => {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 15,
          });
  
          new window.google.maps.Marker({
            position: { lat, lng },
            map,
          });
        }, 100); // Delay to ensure mapRef is available
  
        return () => clearTimeout(timer);
      } else {
        console.error('Invalid latitude or longitude');
      }
    }
  }, [isOpen, latitude, longitude]);
  
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Estate Map"
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-60 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 z-40"
    >
      <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-4xl h-[80vh] p-4 z-50">
        <button
          onClick={onRequestClose}
          className="absolute -top-3 right-0 text-5xl font-bold text-black hover:text-gray-800 z-50"
        >
          &times;
        </button>
        <div ref={mapRef} className="w-full h-full"></div>
      </div>
    </Modal>
  );
};

export default MapModal;
