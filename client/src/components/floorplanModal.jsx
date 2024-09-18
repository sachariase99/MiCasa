import Modal from 'react-modal';

const FloorplanModal = ({ isOpen, onRequestClose, floorplan }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Floorplan"
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
        <img src={floorplan} alt="Floorplan" className="w-full h-full object-contain" />
      </div>
    </Modal>
  );
};

export default FloorplanModal;
