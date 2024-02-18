import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRole, setToken, setUsername } from "../../features/userAuth/userAuthSlice";
import { Link, useNavigate } from "react-router-dom";
import carLogo from "../../assets/car-rent-logo.jpg";
import "./Navbar.css";
import toast from "react-hot-toast";
import { baseUrl } from "../../assets/baseUrl";

const Navbar = () => {
  const { token, username } = useSelector((state) => state.userAuth);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const fetchUserApi = `${baseUrl}/Auth`;
      const response = await fetch(fetchUserApi, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const output = await response.json();
      // console.log(output);
      const { user } = output;
      dispath(setUsername(user.userId));
      dispath(setRole(user.role));
    } catch (error) {
      console.log(`Error in fetching user in navbar ${error}`);
    }
  };

  const logoutHandler = () => {
    dispath(setToken(null));
    dispath(setUsername(""));
    dispath(setRole(""));
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    if (token !== null) fetchUser();
  }, [token]);

  return (
    <div className="navbar">
      <Link to="/" className="logo-container">
        <img
          src={carLogo}
          alt="car-logo"
          className="car-logo"
        />
      </Link>

      <div className="info-container">
        {token === null && (
          <Link to="/login" className="login-btn link-btn">
            Login
          </Link>
        )}

        {token !== null && (
          <div className="user-info-container">
            <div className="name-cont">
              Hi, <span className="user-name">{username.split("@")[0]}</span>
            </div>

            <Link to="/car-agreements" className="agreement-cont link-btn">
              View Car Agreements
            </Link>

            <button className="logout" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
