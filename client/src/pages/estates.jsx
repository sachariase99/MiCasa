import { useState } from 'react'; // Importing React and useState for state management
import Cards from '../components/cards'; // Importing the Cards component to display estates

// Main component for displaying estates for sale
const Estates = () => {
  const [filter, setFilter] = useState(''); // State for managing the selected filter
  const [sort, setSort] = useState(''); // State for managing the selected sort option

  // Function to handle changes in the filter dropdown
  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update the filter state with the selected value
  };

  // Function to handle changes in the sort dropdown
  const handleSortChange = (e) => {
    setSort(e.target.value); // Update the sort state with the selected value
  };

  return (
    <div className="mt-28">
      <div className="flex justify-between mx-16 mb-4">
        <h2 className="text-4xl font-semibold">Boliger til salg</h2> {/* Header for the estate listings */}
        <div className="flex gap-4">
          {/* Dropdown for filtering estates */}
          <select
            value={filter} // Bind the dropdown to the filter state
            onChange={handleFilterChange} // Handle changes with the defined function
            className="border border-gray-300 rounded-md p-2 cursor-pointer"
          >
            <option value="">Vælg filter</option> {/* Default option */}
            <option value="villa">Villa</option> {/* Filter option for Villa */}
            <option value="ejerlejlighed">Ejerlejlighed</option> {/* Filter option for Ejerlejlighed */}
            <option value="andelsbolig">Andelsbolig</option> {/* Filter option for Andelsbolig */}
          </select>
          {/* Dropdown for sorting estates */}
          <select
            value={sort} // Bind the dropdown to the sort state
            onChange={handleSortChange} // Handle changes with the defined function
            className="border border-gray-300 rounded-md p-2 cursor-pointer"
          >
            <option value="">Sorter efter</option> {/* Default option */}
            <option value="price_asc">Pris - Stigende</option> {/* Sort option for ascending price */}
            <option value="price_desc">Pris - Faldende</option> {/* Sort option for descending price */}
            <option value="size">Antal kvadratmeter</option> {/* Sort option for size */}
            <option value="days_desc">Liggetid - Faldende</option> {/* Sort option for descending days on market */}
          </select>
        </div>
      </div>
      <Cards filter={filter} sort={sort} /> {/* Pass the filter and sort states to the Cards component */}
    </div>
  );
};

export default Estates; // Exporting the component for use in other parts of the application
