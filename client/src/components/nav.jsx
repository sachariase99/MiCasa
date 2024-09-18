import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../assets/Logo.png";
import BurgerMenu from "./burgermenu";
import { FaSearch } from "react-icons/fa";

const Nav = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="relative z-10">
      <div
        className="absolute w-full h-24 bg-[#1D1E2C] -z-10"
        style={{
          clipPath:
            "polygon(0% 100%, 30% 64px, 70% 85px, 100% 100%, 100% 0%, 0% 0%)",
        }}
      ></div>

      <div className="flex items-center justify-between py-6">
        <Link to="/home">
          <img className="pl-10" src={Logo} alt="Logo" />
        </Link>
        <div className="hidden lg:flex items-center pr-10 -mt-20 text-white text-2xl gap-5">
          <Link className="hover:text-[#AC9FBB]" to="/home">
            Forside
          </Link>
          <Link className="hover:text-[#AC9FBB]" to="/estates">
            Boliger
          </Link>
          <Link className="hover:text-[#AC9FBB]" to="/contact">
            Kontakt
          </Link>
          {isLoggedIn ? (
            <Link className="hover:text-[#AC9FBB]" to="/user">
              Profil
            </Link>
          ) : (
            <Link className="hover:text-[#AC9FBB]" to="/login">
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
        <BurgerMenu />
      </div>
    </div>
  );
};

export default Nav;
