import "./NavBar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import {UserContext} from "../../Context/UserContext";
import { useContext } from "react";

const NavBar = () => {
  const {setCurrUser, setFavoriteDogs } = useContext(UserContext);


  const handleLogout = () => {
    console.log("logging out");
    setCurrUser(null)
    setFavoriteDogs(null)
    window.sessionStorage.removeItem("currUser");
  };
  return (
    <div className="navigation">
      <Link to="/">Home</Link>
      <hr />
      <Link to="/favorites">Favorites</Link>
      <hr />
      <Link to="/login" onClick={() => handleLogout()}>
        Log out
      </Link>
    </div>
  );
};

export default NavBar;
