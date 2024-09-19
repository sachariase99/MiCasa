// Importing necessary modules for routing and custom hooks
import { useLocation } from "react-router-dom"; // Module for accessing location information
import useEstates from "../hooks/useEstates"; // Custom module for fetching estates
import { Link } from "react-router-dom"; // Module for creating links

// Function to format the price with Danish currency formatting
const formatPrice = (price) => {
  // Using the Intl.NumberFormat API to format numbers
  return new Intl.NumberFormat('da-DK', {
    minimumFractionDigits: 2, // Minimum decimal places
    maximumFractionDigits: 2, // Maximum decimal places
  }).format(price); // Returns formatted price as a string
};

// Main component for displaying search results
const SearchResults = () => {
  // Using destructure assignment to extract 'location' from the router
  const location = useLocation(); // Hook to access the current location

  // Using URLSearchParams to retrieve the query parameter from the URL
  const query = new URLSearchParams(location.search).get("query") || ""; // Fallback to empty string if not found

  // Using a custom hook to fetch estates based on the query
  const { estates, loading, error } = useEstates(query); // Destructure values from the hook

  // Returning the JSX structure for the component
  return (
    <div className="mb-8 my-24">
      <h1 className="text-3xl font-semibold mb-6 mx-8 p-4">Search Results</h1> {/* Header for the results */}
      {loading ? ( // Conditional rendering based on loading state
        <p>Loading...</p> // Display loading message
      ) : error ? ( // Check if there's an error
        <p>Error: {error}</p> // Display error message
      ) : estates.length > 0 ? ( // Condition to check if there are estates
        <div className="relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-16 gap-16">
          {estates.map((estate) => ( // Iteration over estates array using map
            <Link to={`/estates/${estate.id}`} key={estate.id}> {/* Link to individual estate details */}
              <div className="relative transition-transform duration-500">
                <div className="bg-white p-4 rounded-lg shadow-lg text-lg">
                  {estate.images.length > 0 && ( // Check if images exist
                    <img
                      className="w-full h-auto aspect-video rounded-lg"
                      src={estate.images[0]} // Use spread operator to get the first image
                      alt={`Image of estate ${estate.address}`} // Template string for alt text
                    />
                  )}
                  <div className="flex justify-between text-2xl mt-6">
                    <h2 className="font-semibold">{estate.address}</h2> {/* Estate address */}
                    {estate.energyLabel && ( // Check if energy label exists
                      <p className="bg-[#14C451] h-8 w-8 flex items-center justify-center text-white">
                        {estate.energyLabel} {/* Display energy label */}
                      </p>
                    )}
                  </div>
                  {estate.city && ( // Condition to display city if it exists
                    <p>
                      {estate.zipcode} {estate.city} {/* Template string to display zipcode and city */}
                    </p>
                  )}
                  <p>{estate.estateType}</p> {/* Display estate type */}
                  <p>
                    {estate.num_rooms} værelser, {estate.floor_space} m2 {/* Template string for rooms and area */}
                  </p>
                  <p className="flex justify-end text-2xl font-bold">
                    {formatPrice(estate.price)} DKK {/* Format price using the function */}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : ( // If no estates are found
        <p>No results found for {query}.</p> // Display no results message
      )}
    </div>
  );
};

// Exporting the SearchResults component for use in other parts of the application
export default SearchResults;
