// Import necessary hooks and libraries
import { useState, useContext } from "react"; // useState for managing state, useContext for accessing context
import { Link, useNavigate } from "react-router-dom"; // Link for navigation, useNavigate for programmatic navigation
import { AuthContext } from "../context/authContext"; // Importing AuthContext to access authentication status
import Logo from "../assets/Logo.png"; // Logo image import
import BurgerMenu from "./burgermenu"; // Importing the burger menu component
import { FaSearch } from "react-icons/fa"; // Importing search icon

const Nav = () => {
  // Accessing the authentication status from AuthContext
  const { isLoggedIn } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for managing the search query
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle search submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (searchQuery.trim()) { // Check if the search query is not just whitespace
      // Navigate to the search results page with the query as a URL parameter
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative z-10">
      {/* Background shape for the navigation */}
      <div
        className="absolute w-full h-24 bg-[#1D1E2C] -z-10"
        style={{
          clipPath: "polygon(0% 100%, 30% 64px, 70% 85px, 100% 100%, 100% 0%, 0% 0%)",
        }}
      ></div>

      <div className="flex items-center justify-between py-6">
        {/* Logo link */}
        <Link to="/home">
          <img className="pl-10" src={Logo} alt="Logo" />
        </Link>
        
        {/* Navigation links and search form for larger screens */}
        <div className="hidden lg:flex items-center pr-10 -mt-20 text-white text-2xl gap-5">
          <Link className="hover:text-[#AC9FBB]" to="/home">Forside</Link>
          <Link className="hover:text-[#AC9FBB]" to="/estates">Boliger</Link>
          <Link className="hover:text-[#AC9FBB]" to="/contact">Kontakt</Link>
          {/* Conditional rendering based on login status */}
          {isLoggedIn ? (
            <Link className="hover:text-[#AC9FBB]" to="/user">Profil</Link>
          ) : (
            <Link className="hover:text-[#AC9FBB]" to="/login">Login</Link>
          )}
          
          {/* Search form */}
          <form onSubmit={handleSearch} className="flex">
            <input
              value={searchQuery} // Controlled input for search query
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
              className="rounded-l-md pl-2 text-lg text-gray-500 outline-none"
              type="text"
              placeholder="Indtast søgeord"
            />
            <button
              type="submit" // Submit button for the search form
              className="bg-[#59656F] h-8 w-8 flex items-center justify-center rounded-r-md cursor-pointer"
            >
              <FaSearch className="text-md" /> {/* Search icon */}
            </button>
          </form>
        </div>
        
        {/* Burger menu for mobile screens */}
        <BurgerMenu />
      </div>
    </div>
  );
};

// Exporting the Nav component as a module for use in other parts of the application
export default Nav;
