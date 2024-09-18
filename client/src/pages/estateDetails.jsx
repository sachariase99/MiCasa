import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useEstates from "../hooks/useEstates";
import camera from "../assets/camera.png";
import floorplan from "../assets/floorplan.png";
import location from "../assets/location.png";
import heart from "../assets/heart.png";
import MapModal from "../components/MapModal";
import FloorplanModal from "../components/floorplanModal";
import GalleryModal from "../components/galleryModal";

const formatPrice = (price) => {
  return new Intl.NumberFormat("da-DK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const calculateDaysSincePosted = (created_at) => {
  const createdDate = new Date(created_at);
  const today = new Date();
  const differenceInTime = today - createdDate;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};

const EstateDetails = () => {
  const { id } = useParams();
  const { estates, loading, error } = useEstates();

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isFloorplanModalOpen, setIsFloorplanModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const estate = estates.find((estate) => String(estate.id) === id);

  if (!estate) return <div>Estate not found</div>;

  const openMapModal = () => {
    if (estate.latitude && estate.longitude) {
      setMapCoordinates({
        latitude: parseFloat(estate.latitude),
        longitude: parseFloat(estate.longitude),
      });
      setIsMapModalOpen(true);
    } else {
      console.error("Estate coordinates are not defined");
    }
  };

  const openFloorplanModal = () => {
    if (estate.floorplan) {
      setIsFloorplanModalOpen(true);
    } else {
      console.error("Floorplan not available");
    }
  };

  const openGalleryModal = () => {
    if (estate.images.length > 0) {
      setIsGalleryModalOpen(true);
    } else {
      console.error("No images available");
    }
  };

  return (
    <div className="mx-auto">
      {estate.images.length > 0 && (
        <img
          className="w-full h-[800px] object-cover absolute top-0 -z-10"
          src={estate.images[0]}
          alt={`Image of estate ${estate.address}`}
        />
      )}
      <span className="bg-[#1D1E2C] h-10 w-full block mt-[736px]"></span>
      <div className="px-16 py-8 bg-white bg-opacity-90 w-5/6 mx-auto -mt-60 z-10 rounded-lg text-lg shadow-2xl">
        <div className="grid grid-cols-1 xl:grid-cols-3">
          <div>
            <h1 className="text-4xl font-semibold mb-4">{estate.address}</h1>
            <div className="flex gap-1">
              <p>{estate.zipcode}</p>
              <p>{estate.city}</p>
            </div>
            <div className="flex gap-4">
              <p className="border-r-[1px] pr-4 border-black">
                {estate.estateType}
              </p>
              <p>{estate.floor_space} m2</p>
              <p className="border-l-[1px] pl-4 border-black">
                {estate.num_rooms} vær
              </p>
            </div>
            <p>Set {estate.num_clicks} gange</p>
          </div>
          <div className="flex mt-8 xl:mt-0 xl:justify-center gap-4">
            <span
              onClick={openGalleryModal}
              className="h-14 w-14 border border-black flex justify-center items-center rounded-full cursor-pointer hover:bg-[#AC9FBB]"
            >
              <img src={camera} alt="" />
            </span>
            <span
              onClick={openFloorplanModal}
              className="h-14 w-14 border border-black flex justify-center items-center rounded-full cursor-pointer hover:bg-[#AC9FBB]"
            >
              <img src={floorplan} alt="" />
            </span>
            <span
              onClick={openMapModal}
              className="h-14 w-14 border border-black flex justify-center items-center rounded-full cursor-pointer hover:bg-[#AC9FBB]"
            >
              <img src={location} alt="" />
            </span>
            <span className="h-14 w-14 border border-black flex justify-center items-center rounded-full cursor-pointer hover:bg-[#AC9FBB]">
              <img src={heart} alt="" />
            </span>
          </div>
          <div className="mt-8 xl:mt-0 xl:text-end">
            <p className="text-xl">
              Kontantpris:{" "}
              <span className="text-2xl font-semibold pl-2">
                {formatPrice(estate.price)}
              </span>
            </p>
            <p>
              Udbetaling: <span>{formatPrice(estate.payout)}</span>
            </p>
            <p>
              Ejerudgift per måned: <span>{formatPrice(estate.cost)}</span>
            </p>
          </div>
        </div>
        <div className="mt-8 xl:mt-20 border-t border-black xl:border-none pt-8 grid grid-cols-1 xl:grid-cols-3 ">
          <div className="flex flex-col">
            <p className="flex justify-between w-64">
              Sagsnr. <span>{estate.id}</span>
            </p>
            <p className="flex justify-between w-64">
              Boligareal <span>{estate.floor_space} m2</span>
            </p>
            <p className="flex justify-between w-64">
              Grundareal <span>{estate.ground_space} m2</span>
            </p>
            <p className="flex justify-between w-64">
              Antal rum <span>{estate.num_rooms}</span>
            </p>
            <p className="flex justify-between w-64">
              Antal plan <span>{estate.num_floors}</span>
            </p>
          </div>
          <div className="flex flex-col xl:items-center mt-8 xl:mt-0">
            <p className="flex justify-between w-64">
              Kælder <span>{estate.basement_space} m2</span>
            </p>
            <p className="flex justify-between w-64">
              Byggeår <span>{estate.year_construction}</span>
            </p>
            <p className="flex justify-between w-64">
              Ombygget <span>{estate.year_rebuilt}</span>
            </p>
            <p className="flex justify-between w-64">
              Energimærke <span>{estate.energyLabel}</span>
            </p>
            <p className="flex justify-between w-64">
              Liggetid{" "}
              <span>{calculateDaysSincePosted(estate.created_at)} dage</span>
            </p>
          </div>
          <div className="flex flex-col xl:items-end mt-8 xl:mt-0">
            <p className="flex justify-between w-64">
              Kontantpris <span>{formatPrice(estate.price)}</span>
            </p>
            <p className="flex justify-between w-64">
              Udbetaling <span>{formatPrice(estate.payout)}</span>
            </p>
            <p className="flex justify-between w-64">
              Brutto ex. ejerudgift <span>{formatPrice(estate.gross)}</span>
            </p>
            <p className="flex justify-between w-64">
              Netto ex. ejerudgift <span>{formatPrice(estate.net)}</span>
            </p>
            <p className="flex justify-between w-64">
              Ejerudgift <span>{formatPrice(estate.cost)}</span>
            </p>
          </div>
        </div>
        <div className="mt-8 xl:mt-20 border-t border-black xl:border-none pt-8 grid grid-cols-1 xl:grid-cols-3">
          <div className="xl:col-span-2 whitespace-pre-line order-2 xl:order-1 mt-16 xl:mt-0">
            <p>{estate.description}</p>
          </div>
          <div className="xl:col-span-1 flex flex-col w-64 xl:ml-auto text-sm order-1 xl:order-2">
            <p className="text-2xl font-semibold">Kontakt</p>
            <img
              className="my-4"
              src={estate.employee.image_url}
              alt={estate.employee.firstname}
            />
            <p className="font-bold">
              {estate.employee.firstname} {estate.employee.lastname}
            </p>
            <p>{estate.employee.position}</p>
            <p>Mobil: {estate.employee.phone}</p>
            <p>Email: {estate.employee.email}</p>
          </div>
        </div>
      </div>
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

export default EstateDetails;
