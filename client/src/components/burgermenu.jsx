// Importing necessary modules from React and React Router
import { useState, useContext } from "react"; // Functions: useState and useContext are hooks for managing state and context
import { Link, useNavigate } from "react-router-dom"; // Link is used for navigation; useNavigate allows programmatic navigation
import { AuthContext } from "../context/authContext"; // Importing the authentication context for access to login state
import { FaSearch } from "react-icons/fa"; // Importing the search icon component

// Defining the BurgerMenu functional component
const BurgerMenu = () => {
  // State variables using const for immutable references
  const [isOpen, setIsOpen] = useState(false); // isOpen tracks if the menu is open or closed
  const { isLoggedIn } = useContext(AuthContext); // Destructure assignment to get the logged-in state from AuthContext
  const [searchQuery, setSearchQuery] = useState(""); // State for managing the search input
  const navigate = useNavigate(); // Function to navigate programmatically

  // Function to handle the search action
  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the default form submission
    // Condition to check if the search query is not just whitespace
    if (searchQuery.trim()) {
      // Using template strings to create the URL for navigation
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Navigate to the search results page
    }
  };

  return (
    <div className="lg:hidden">
      {" "}
      {/* Responsive design for mobile view */}
      {/* Condition to show the burger button if the menu is closed */}
      {!isOpen && (
        <button
          className="z-50 absolute top-8 right-8" // CSS classes for positioning
          onClick={() => setIsOpen(true)} // Using an arrow function to set the menu state
        >
          <svg
            className="w-8 h-8" // SVG for burger icon
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7" // SVG path for the icon
            />
          </svg>
        </button>
      )}
      {/* Menu */}
      <div
        className={`fixed top-0 right-0 w-3/4 h-full bg-[#1D1E2C] text-white transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full" // Using conditions to apply styles based on isOpen
        }`}
      >
        <div className="flex items-center justify-end p-6">
          <button className="p-2" onClick={() => setIsOpen(false)}>
            <svg
              className="w-8 h-8" // SVG for close icon
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" // SVG path for the icon
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6">
          {/* Links for navigation */}
          <Link className="text-2xl hover:text-[#AC9FBB]" to="/home">
            Forside
          </Link>
          <Link className="text-2xl hover:text-[#AC9FBB]" to="/estates">
            Boliger
          </Link>
          <Link className="text-2xl hover:text-[#AC9FBB]" to="/contact">
            Kontakt
          </Link>
          {/* Conditional rendering based on login state */}
          {isLoggedIn ? (
            <Link className="text-2xl hover:text-[#AC9FBB]" to="/user">
              Profil
            </Link>
          ) : (
            <Link className="text-2xl hover:text-[#AC9FBB]" to="/login">
              Login
            </Link>
          )}
          {/* Form for search functionality */}
          <form className="flex" onSubmit={handleSearch}>
            {/* Input for search query */}
            <input
              value={searchQuery} // Using controlled component pattern for the input
              onChange={(e) => setSearchQuery(e.target.value)} // Using an arrow function to update searchQuery
              className="rounded-l-md pl-2 text-lg text-gray-500 outline-none"
              type="text"
              placeholder="Indtast søgeord" // Placeholder text
            />
            {/* Search button with an icon */}
            <button
              type="submit"
              className="bg-[#59656F] h-8 w-8 flex items-center justify-center rounded-r-md cursor-pointer"
              aria-label="Search Button"
            >
              <FaSearch className="text-md" />{" "}
              {/* Using a search icon from the react-icons library */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Exporting the BurgerMenu component as a module for use in other parts of the application
export default BurgerMenu;
