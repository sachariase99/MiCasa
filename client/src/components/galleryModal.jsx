import { useState } from 'react';
import Modal from 'react-modal';

const GalleryModal = ({ isOpen, onRequestClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Gallery"
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
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-6xl font-bold text-gray-500 hover:text-gray-800"
        >
          &lt;
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-6xl font-bold text-gray-500 hover:text-gray-800"
        >
          &gt;
        </button>
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
      </div>
    </Modal>
  );
};

export default GalleryModal;
