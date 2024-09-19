// Import necessary hooks and components
import { useEffect } from "react"; // Import useEffect for side effects
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // Import routing hooks and Outlet for rendering child routes
import Nav from "../components/nav"; // Import navigation component
import Footer from "../components/footer"; // Import footer component

// Layout component that defines the overall structure of the application
const Layout = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const location = useLocation(); // Hook to get the current location (pathname)

  // Effect to redirect from the root path to the home page
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home"); // Navigate to '/home' if the current path is '/'
    }
  }, [location, navigate]); // Dependencies: rerun effect if location or navigate changes

  // Effect to set the document title based on the current route
  useEffect(() => {
    const setTitleForRoute = (pathname) => {
      // Mapping of pathnames to titles
      const titles = {
        "/home": "Home - MiCasa",
        "/about": "About Us - MiCasa",
        "/contact": "Contact - MiCasa",
        "/estates": "Estates - MiCasa",
        "/search": "Search Results - MiCasa",
      };

      // Set title for specific estate detail pages
      if (pathname.startsWith("/estates/")) {
        document.title = "Estate Details - MiCasa"; // Title for estate detail pages
      } else {
        document.title = titles[pathname] || "MiCasa"; // Default title if no specific title is found
      }
    };

    setTitleForRoute(location.pathname); // Call function to set title based on current pathname
  }, [location.pathname]); // Dependencies: rerun effect if pathname changes

  return (
    <div className="flex flex-col min-h-screen"> {/* Main layout container with flexbox styling */}
      <header className="fixed top-0 left-0 w-full z-10"> {/* Fixed header with navigation */}
        <Nav /> {/* Render navigation component */}
      </header>

      <main className="flex-grow pt-16"> {/* Main content area with padding at the top */}
        <Outlet /> {/* Render child routes here */}
      </main>

      <footer className="mt-auto"> {/* Footer that stays at the bottom */}
        <Footer /> {/* Render footer component */}
      </footer>
    </div>
  );
};

// Exporting the Layout component for use in the application
export default Layout;
