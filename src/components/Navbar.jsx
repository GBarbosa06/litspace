import { NavLink } from "react-router-dom"
import { useAuthValue } from "../context/AuthContext"
import UserProfileCard from "./UserProfileCard";

const Navbar = () => {
    const { user } = useAuthValue();

    const styles = {
        isActive: "text-[#FFD369] font-bold",
    }

  return (
    <nav className="w-screen flex justify-between items-center bg-[#2d2d44] p-6 text-white font-['Work_Sans']">
        <NavLink to="/" className="text-xl">Lit <span className="font-bold ">Space</span></NavLink>
        <ul>
            <li className="inline-block mx-4">
                <NavLink to="/" className={({ isActive }) => (isActive ? styles.isActive : undefined)}>
                Home
                </NavLink>
            </li>

            {!user && <li className="inline-block mx-4">
                <NavLink to="/cadastro" className={({ isActive }) => (isActive ? styles.isActive : undefined)}>
                Cadastro
                </NavLink>
            </li>}

            {!user && <li className="inline-block mx-4">
                <NavLink to="/login" className={({ isActive }) => (isActive ? styles.isActive : undefined)}>
                Login
                </NavLink>
            </li>}

            {/* {user && <li className="inline-block mx-4">
                <NavLink to="/shelf" className={({ isActive }) => (isActive ? styles.isActive : undefined)}>
                Minha estante
                </NavLink>
            </li>} */}

            <li className="inline-block mx-4">
                <NavLink to="/about" className={({ isActive }) => (isActive ? styles.isActive : undefined)}>
                Sobre
                </NavLink>
            </li>
            {user && <li className="inline-block mx-4">
                <UserProfileCard />
            </li>}
        </ul>
    </nav>
  )
}

export default Navbar