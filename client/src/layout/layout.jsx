import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/nav";
import Footer from "../components/footer";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky navbar */}
      <header className="fixed top-0 left-0 w-full z-10">
        <Nav />
      </header>

      {/* Main content area */}
      <main className="flex-grow pt-16">
        {" "}
        {/* Adjust padding-top as needed */}
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
