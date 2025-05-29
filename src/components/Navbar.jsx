import { NavLink } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import UserProfileCard from "./UserProfileCard";
import { useState } from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { user } = useAuthValue();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const styles = {
    isActive: "text-[#FFD369] font-bold",
  };

  return (
    <nav className="w-full bg-[#2d2d44] p-6 text-white font-['Work_Sans']">
      <div className="flex justify-between items-center">
        <NavLink to="/" className="text-xl">
          Lit <span className="font-bold">Space</span>
        </NavLink>
        <button
          className="md:hidden cursor-pointer text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu /> 
        </button>
      </div>
      <ul
        className={`md:flex md:items-center md:justify-end ${isMenuOpen ? "block" : "hidden"} mt-4 md:mt-0`}
      >
        <li className="inline-block mx-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.isActive : undefined
            }
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <li className="inline-block mx-4">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? styles.isActive : undefined
              }
            >
              Cadastro
            </NavLink>
          </li>
        )}
        {!user && (
          <li className="inline-block mx-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.isActive : undefined
              }
            >
              Login
            </NavLink>
          </li>
        )}
        <li className="inline-block mx-4">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.isActive : undefined
            }
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li className="inline-block mx-4">
            <UserProfileCard />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
