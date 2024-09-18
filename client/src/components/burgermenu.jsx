import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FaSearch } from "react-icons/fa";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="lg:hidden">
      {!isOpen && (
        <button
          className="z-50 absolute top-8 right-8"
          onClick={() => setIsOpen(true)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      )}

      {/* Menu */}
      <div
        className={`fixed top-0 right-0 w-3/4 h-full bg-[#1D1E2C] text-white transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end p-6">
          <button
            className="p-2"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <Link className="text-2xl hover:text-[#AC9FBB]" to="/home">
            Forside
          </Link>
          <Link className="text-2xl hover:text-[#AC9FBB]" to="/estates">
            Boliger
          </Link>
          <Link className="text-2xl hover:text-[#AC9FBB]" to="/contact">
            Kontakt
          </Link>
          {isLoggedIn ? (
            <Link className="text-2xl hover:text-[#AC9FBB]" to="/user">
              Profil
            </Link>
          ) : (
            <Link className="text-2xl hover:text-[#AC9FBB]" to="/login">
              Login
            </Link>
          )}
          <div className="flex">
            <input
              className="rounded-l-md placeholder:pl-2 text-lg"
              type="text"
              placeholder="Indtast søgeord"
            />
            <div className="bg-[#59656F] h-8 w-8 flex items-center justify-center rounded-r-md cursor-pointer">
              <FaSearch className="text-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
