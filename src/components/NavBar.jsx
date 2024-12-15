import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../hooks/use-auth.js";
import Image from "../img/LogoImg.jpg.png";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

  return (
    <div>
      <nav>
      <img 
          src={Image}
          alt="logo" 
          className="logo-image" 
        />
        <Link to="/">HOME</Link>
        {auth.token ? (
            <Link to="/" onClick={handleLogout}>
                LOGOUT
            </Link>
            ) : (
            <Link to="/login">LOGIN</Link>
        )}
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
      </nav>
      {/* React Router will pass components into the <Outlet /> based on the path */}
      <Outlet />
    </div>
  );
}

export default NavBar;