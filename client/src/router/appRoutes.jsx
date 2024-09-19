// Importing necessary modules from React Router for routing functionality
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing routing components
import Layout from "../layout/layout"; // Importing the layout component for consistent page structure
import LoginPage from "../pages/login"; // Importing the login page component
import UserPage from "../pages/user"; // Importing the user page component for user management
import RegisterPage from "../pages/register"; // Importing the registration page component
import Home from "../pages/home"; // Importing the home page component
import Estates from "../pages/estates"; // Importing the estates page component
import EstateDetails from "../pages/estateDetails"; // Importing the estate details page component
import Contact from "../pages/contact"; // Importing the contact page component
import SearchResults from "../pages/searchResults"; // Importing the search results page component

// Main AppRoutes component that defines the application's routing structure
const AppRoutes = () => {
  // Return the Router component to wrap the routes
  return (
    <Router>
      {/* Define the routes for the application */}
      <Routes>
        {/* The base route path, wrapped in Layout for consistent layout structure */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes for different pages */}
          <Route path="/login" element={<LoginPage />} /> {/* Route for login page */} 
          <Route path="/register" element={<RegisterPage />} /> {/* Route for registration page */} 
          <Route path="/user" element={<UserPage />} /> {/* Route for user management page */} 
          <Route path="/home" element={<Home />} /> {/* Route for home page */} 
          <Route path="/estates" element={<Estates />} /> {/* Route for estates overview page */} 
          <Route path="/estates/:id" element={<EstateDetails />} /> {/* Route for individual estate details */} 
          <Route path="/contact" element={<Contact />} /> {/* Route for contact page */} 
          <Route path="/search" element={<SearchResults />} /> {/* Route for search results page */} 
        </Route>
      </Routes>
    </Router>
  );
};

// Exporting the AppRoutes component for use in other parts of the application
export default AppRoutes;
