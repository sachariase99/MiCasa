import { useState } from "react"; // Importing React and useState for managing component state
import { useParams } from "react-router-dom"; // Importing useParams to access route parameters
import useEstates from "../hooks/useEstates"; // Custom hook to fetch estate data
import camera from "../assets/camera.png"; // Importing assets for UI
import floorplan from "../assets/floorplan.png";
import location from "../assets/location.png";
import heart from "../assets/heart.png";
import MapModal from "../components/MapModal"; // Modal component for displaying map
import FloorplanModal from "../components/floorplanModal"; // Modal for displaying floor plans
import GalleryModal from "../components/galleryModal"; // Modal for displaying image gallery

// Function to format price in Danish format
const formatPrice = (price) => {
  return new Intl.NumberFormat("da-DK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// Function to calculate the number of days since the estate was posted
const calculateDaysSincePosted = (created_at) => {
  const createdDate = new Date(created_at); // Convert created_at string to Date object
  const today = new Date();
  const differenceInTime = today - createdDate; // Calculate the time difference
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convert time difference to days
  return differenceInDays; // Return the number of days
};

// Main component for displaying estate details
const EstateDetails = () => {
  const { id } = useParams(); // Get the estate ID from the route parameters
  const { estates, loading, error } = useEstates(); // Fetch estates data using the custom hook

  // State variables for managing modal visibility and map coordinates
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isFloorplanModalOpen, setIsFloorplanModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  // Handling loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Find the specific estate by ID
  const estate = estates.find((estate) => String(estate.id) === id);

  // Handling case where estate is not found
  if (!estate) return <div>Estate not found</div>;

  // Function to open the map modal with coordinates
  const openMapModal = () => {
    if (estate.latitude && estate.longitude) {
      setMapCoordinates({
        latitude: parseFloat(estate.latitude), // Parse latitude to float
        longitude: parseFloat(estate.longitude), // Parse longitude to float
      });
      setIsMapModalOpen(true); // Open the map modal
    } else {
      console.error("Estate coordinates are not defined");
    }
  };

  // Function to open the floorplan modal
  const openFloorplanModal = () => {
    if (estate.floorplan) {
      setIsFloorplanModalOpen(true); // Open the floorplan modal
    } else {
      console.error("Floorplan not available");
    }
  };

  // Function to open the gallery modal
  const openGalleryModal = () => {
    if (estate.images.length > 0) {
      setIsGalleryModalOpen(true); // Open the gallery modal
    } else {
      console.error("No images available");
    }
  };

  return (
    <div className="mx-auto">
      {estate.images.length > 0 && (
        <img
          className="w-full h-[800px] object-cover absolute top-0 -z-10"
          src={estate.images[0]} // Display the first image of the estate
          alt={`Image of estate ${estate.address}`} // Alt text for accessibility
        />
      )}
      <span className="bg-[#1D1E2C] h-10 w-full block mt-[736px]"></span> {/* Decorative span */}
      <div className="px-16 py-8 bg-white bg-opacity-90 w-5/6 mx-auto -mt-60 z-10 rounded-lg text-lg shadow-2xl">
        <div className="grid grid-cols-1 xl:grid-cols-3">
          <div>
            <h1 className="text-4xl font-semibold mb-4">{estate.address}</h1> {/* Estate address */}
            <div className="flex gap-1">
              <p>{estate.zipcode}</p> {/* Estate zipcode */}
              <p>{estate.city}</p> {/* Estate city */}
            </div>
            <div className="flex gap-4">
              <p className="border-r-[1px] pr-4 border-black">{estate.estateType}</p> {/* Estate type */}
              <p>{estate.floor_space} m2</p> {/* Floor space */}
              <p className="border-l-[1px] pl-4 border-black">{estate.num_rooms} vær</p> {/* Number of rooms */}
            </div>
            <p>Set {estate.num_clicks} gange</p> {/* Number of views */}
          </div>
          <div className="flex mt-8 xl:mt-0 xl:justify-center gap-4">
            <span
              onClick={openGalleryModal} // Open gallery modal on click
              className="h-14 w-14 border border-black flex justify-center items-center rounded-full cursor-pointer hover:bg-[#AC9FBB]"
            >
              <img src={camera} alt="" />
            </span>
            <span
              onClick={openFloorplanModal} // Open floorplan modal on click
              className="h-14 w-14 border border-black flex justify-center items-center rounded-full cursor-pointer hover:bg-[#AC9FBB]"
            >
              <img src={floorplan} alt="" />
            </span>
            <span
              onClick={openMapModal} // Open map modal on click
              className="h-14 w-14 border border-black flex justify-center items-center rounded-full cursor-pointer hover:bg-[#AC9FBB]"
            >
              <img src={location} alt="" />
            </span>
            <span className="h-14 w-14 border border-black flex justify-center items-center rounded-full cursor-pointer hover:bg-[#AC9FBB]">
              <img src={heart} alt="" /> {/* Heart icon for favorites */}
            </span>
          </div>
          <div className="mt-8 xl:mt-0 xl:text-end">
            <p className="text-xl">
              Kontantpris:{" "}
              <span className="text-2xl font-semibold pl-2">
                {formatPrice(estate.price)} {/* Display formatted price */}
              </span>
            </p>
            <p>
              Udbetaling: <span>{formatPrice(estate.payout)}</span> {/* Display payout */}
            </p>
            <p>
              Ejerudgift per måned: <span>{formatPrice(estate.cost)}</span> {/* Display monthly cost */}
            </p>
          </div>
        </div>
        <div className="mt-8 xl:mt-20 border-t border-black xl:border-none pt-8 grid grid-cols-1 xl:grid-cols-3 ">
          <div className="flex flex-col">
            <p className="flex justify-between w-64">
              Sagsnr. <span>{estate.id}</span> {/* Estate ID */}
            </p>
            <p className="flex justify-between w-64">
              Boligareal <span>{estate.floor_space} m2</span> {/* Living area */}
            </p>
            <p className="flex justify-between w-64">
              Grundareal <span>{estate.ground_space} m2</span> {/* Ground area */}
            </p>
            <p className="flex justify-between w-64">
              Antal rum <span>{estate.num_rooms}</span> {/* Number of rooms */}
            </p>
            <p className="flex justify-between w-64">
              Antal plan <span>{estate.num_floors}</span> {/* Number of floors */}
            </p>
          </div>
          <div className="flex flex-col xl:items-center mt-8 xl:mt-0">
            <p className="flex justify-between w-64">
              Kælder <span>{estate.basement_space} m2</span> {/* Basement area */}
            </p>
            <p className="flex justify-between w-64">
              Byggeår <span>{estate.year_construction}</span> {/* Year of construction */}
            </p>
            <p className="flex justify-between w-64">
              Ombygget <span>{estate.year_rebuilt}</span> {/* Year rebuilt */}
            </p>
            <p className="flex justify-between w-64">
              Energimærke <span>{estate.energyLabel}</span> {/* Energy label */}
            </p>
            <p className="flex justify-between w-64">
              Liggetid{" "}
              <span>{calculateDaysSincePosted(estate.created_at)} dage</span> {/* Days since posted */}
            </p>
          </div>
          <div className="flex flex-col xl:items-end mt-8 xl:mt-0">
            <p className="flex justify-between w-64">
              Kontantpris <span>{formatPrice(estate.price)}</span> {/* Display price */}
            </p>
            <p className="flex justify-between w-64">
              Udbetaling <span>{formatPrice(estate.payout)}</span> {/* Display payout */}
            </p>
            <p className="flex justify-between w-64">
              Brutto ex. ejerudgift <span>{formatPrice(estate.gross)}</span> {/* Gross cost */}
            </p>
            <p className="flex justify-between w-64">
              Netto ex. ejerudgift <span>{formatPrice(estate.net)}</span> {/* Net cost */}
            </p>
            <p className="flex justify-between w-64">
              Ejerudgift <span>{formatPrice(estate.cost)}</span> {/* Display monthly cost */}
            </p>
          </div>
        </div>
        <div className="mt-8 xl:mt-20 border-t border-black xl:border-none pt-8 grid grid-cols-1 xl:grid-cols-3">
          <div className="xl:col-span-2 whitespace-pre-line order-2 xl:order-1 mt-16 xl:mt-0">
            <p>{estate.description}</p> {/* Estate description */}
          </div>
          <div className="xl:col-span-1 flex flex-col w-64 xl:ml-auto text-sm order-1 xl:order-2">
            <p className="text-2xl font-semibold">Kontakt</p>
            <img
              className="my-4"
              src={estate.employee.image_url} // Employee image
              alt={estate.employee.firstname} // Alt text for accessibility
            />
            <p className="font-bold">
              {estate.employee.firstname} {estate.employee.lastname} {/* Employee name */}
            </p>
            <p>{estate.employee.position}</p> {/* Employee position */}
            <p>Mobil: {estate.employee.phone}</p> {/* Employee phone */}
            <p>Email: {estate.employee.email}</p> {/* Employee email */}
          </div>
        </div>
      </div>
      {/* Modal components for displaying maps, floor plans, and galleries */}
      <MapModal
        isOpen={isMapModalOpen}
        onRequestClose={() => setIsMapModalOpen(false)}
        latitude={mapCoordinates.latitude}
        longitude={mapCoordinates.longitude}
      />
      <FloorplanModal
        isOpen={isFloorplanModalOpen}
        onRequestClose={() => setIsFloorplanModalOpen(false)}
        floorplan={estate.floorplan}
      />
      <GalleryModal
        isOpen={isGalleryModalOpen}
        onRequestClose={() => setIsGalleryModalOpen(false)}
        images={estate.images}
      />
    </div>
  );
};

export default EstateDetails; // Exporting the component
