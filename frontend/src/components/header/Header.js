import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import { logout } from "../../slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {auth: userData} = useSelector(state=>state.auth)
  const {cartItems} = useSelector(state=>state.cart)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [searchText, setSearchText] = useState("");

  console.log(cartItems);
  

  const cartFromLS = JSON.parse(localStorage.getItem("cartItems")) || [];

  const handleSearch = () => {
    if (!searchText.trim()) return;
    navigate(`/search/${searchText}`);
    setSearchText("");
  };

  const logoutUser = () => {
    dispatch(logout ())
    setMenuAnchor(null);
    navigate("/login");
  };

  return (
    <header className="header">
      {/* LEFT SECTION */}
      <div className="header-left">
        <div className="hamburger" onClick={() => setDrawerOpen(!drawerOpen)}>
          <MenuIcon />
        </div>

        <NavLink to="/" className="logo">
          FLASKO
        </NavLink>

        <div className="search-bar">
          <input
            value={searchText}
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <span className="search-icon" onClick={handleSearch}>
                <ion-icon name="search-outline"></ion-icon>
          </span>
        </div>
      </div>

      {/* RIGHT SECTION */}

      <div className="header-righte-section">
        <div className={drawerOpen ? "header-right open" : "header-right"}> 
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/products">Products</NavLink>
          <Link to="/cart" className="cart-btn">
            <ion-icon name="cart-outline"></ion-icon>

            <span className="cart-badge">
                {cartFromLS.length > 0
                ? cartFromLS.length
                : cartItems?.length || 0}
            </span>
          </Link>


        </div>

          <div className="profile-container">                
              {userData ? (
                <div className="profile">
                    <ion-icon onClick={(e) => setMenuAnchor(e.currentTarget)} name="person-sharp"></ion-icon>
                  <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={() => setMenuAnchor(null)}
                    PaperProps={{
                      sx: {
                        mt: 1.5,        // margin-top
                        p: 1,           // padding
                        minWidth: 180,
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem onClick={logoutUser}>      
                      <PowerSettingsNewIcon fontSize="small" /> Logout
                    </MenuItem>
                    <MenuItem >      
                        {`${userData.firstname } ${userData.lastname}`}
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <button className="login-btn" onClick={() => navigate("/login")}>
                  Login
                </button>
              )}
          </div>
      </div>

    </header>
  );
};

export default Header;
