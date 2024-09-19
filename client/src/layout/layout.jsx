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

  useEffect(() => {
    const setTitleForRoute = (pathname) => {
      const titles = {
        "/home": "Home - MiCasa",
        "/about": "About Us - MiCasa",
        "/contact": "Contact - MiCasa",
        "/estates": "Estates - MiCasa",
        "/search": "Search Results - MiCasa",
      };

      if (pathname.startsWith("/estates/")) {
        document.title = "Estate Details - MiCasa";
      } else {
        document.title = titles[pathname] || "MiCasa";
      }
    };

    setTitleForRoute(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10">
        <Nav />
      </header>

      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
