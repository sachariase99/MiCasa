// Importing necessary modules from React Router and custom hooks
import { Link } from "react-router-dom"; // Link for navigation to estate detail pages
import useEstates from "../hooks/useEstates"; // Custom hook for fetching estate data

// Function to format the price to Danish currency format
const formatPrice = (price) => {
  // Using Intl.NumberFormat to format numbers according to Danish locale
  return new Intl.NumberFormat('da-DK', {
    minimumFractionDigits: 2, // Ensures two decimal places
    maximumFractionDigits: 2,
  }).format(price);
};

// Cards functional component, accepting maxItems and highlightMiddle as props
const Cards = ({ maxItems, highlightMiddle = false }) => {
  // Destructure estates, loading, and error from the useEstates hook
  const { estates, loading, error } = useEstates();

  // Conditions to handle loading and error states
  if (loading) return <div>Loading...</div>; // Displays loading text while fetching data
  if (error) return <div>Error: {error}</div>; // Displays error message if there was an issue

  // Using a condition to limit the number of displayed estates based on maxItems prop
  const limitedEstates = maxItems ? estates.slice(0, maxItems) : estates;

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-16 gap-16">
      {/* Iterating over limitedEstates to create a card for each estate */}
      {limitedEstates.map((estate, index) => (
        <Link to={`/estates/${estate.id}`} key={estate.id}> {/* Using Link to navigate to the estate detail page */}
          <div
            className={`relative transition-transform duration-500 ${
              highlightMiddle && index === Math.floor(maxItems / 2) ? "middle-card" : "" // Applying condition for middle card highlight
            }`}
          >
            <div className="bg-white p-4 rounded-lg shadow-lg text-lg">
              {/* Displaying estate image if available */}
              {estate.images.length > 0 && (
                <img
                  className="w-full h-auto aspect-video rounded-lg" // Setting image styles
                  src={estate.images[0]} // Displaying the first image
                  alt={`Image of estate ${estate.address}`} // Alt text for accessibility
                />
              )}
              <div className="flex justify-between text-2xl mt-6">
                <h2 className="font-semibold">{estate.address}</h2> {/* Displaying estate address */}
                {estate.energyLabel && (
                  <p className="bg-[#14C451] h-8 w-8 flex items-center justify-center text-white">
                    {estate.energyLabel} {/* Displaying energy label if available */}
                  </p>
                )}
              </div>
              {estate.city && (
                <p>
                  {estate.zipcode} {estate.city} {/* Displaying postal code and city */}
                </p>
              )}
              <p>{estate.estateType}</p> {/* Displaying estate type */}
              <p>
                {estate.num_rooms} værelser, {estate.floor_space} m2 {/* Displaying number of rooms and floor space */}
              </p>
              <p className="flex justify-end text-2xl font-bold">{formatPrice(estate.price)} DKK</p> {/* Displaying formatted price */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

// Exporting the Cards component as a module for use in other parts of the application
export default Cards;
