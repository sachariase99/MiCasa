import { useLocation } from "react-router-dom";
import useEstates from "../hooks/useEstates";
import { Link } from "react-router-dom";

const formatPrice = (price) => {
  return new Intl.NumberFormat('da-DK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const { estates, loading, error } = useEstates(query);

  return (
    <div className="mb-8 my-24">
      <h1 className="text-3xl font-semibold mb-6 mx-8 p-4">Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : estates.length > 0 ? (
        <div className="relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-16 gap-16">
          {estates.map((estate, index) => (
            <Link to={`/estates/${estate.id}`} key={estate.id}>
              <div
                className="relative transition-transform duration-500"
              >
                <div className="bg-white p-4 rounded-lg shadow-lg text-lg">
                  {estate.images.length > 0 && (
                    <img
                      className="w-full h-auto aspect-video rounded-lg"
                      src={estate.images[0]}
                      alt={`Image of estate ${estate.address}`}
                    />
                  )}
                  <div className="flex justify-between text-2xl mt-6">
                    <h2 className="font-semibold">{estate.address}</h2>
                    {estate.energyLabel && (
                      <p className="bg-[#14C451] h-8 w-8 flex items-center justify-center text-white">
                        {estate.energyLabel}
                      </p>
                    )}
                  </div>
                  {estate.city && (
                    <p>
                      {estate.zipcode} {estate.city}
                    </p>
                  )}
                  <p>{estate.estateType}</p>
                  <p>
                    {estate.num_rooms} værelser, {estate.floor_space} m2
                  </p>
                  <p className="flex justify-end text-2xl font-bold">
                    {formatPrice(estate.price)} DKK
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;
