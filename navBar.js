import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/Logo.svg";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { CartContext } from "../context/cartContext";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = ({ loggedIn, setLoggedIn }) => {
  const { cart } = useContext(CartContext); // Access cart from context
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const menuOptions = [
    { text: "Home", icon: <HomeIcon />, to: "/" },
    { text: "Menu", icon: <MenuIcon />, to: "/menu" },
    { text: "About", icon: <InfoIcon />, to: "/about" },
    { text: "Work", icon: <InfoIcon />, to: "/work" },
    { text: "Testimonials", icon: <CommentRoundedIcon />, to: "/testimonials" },
    { text: "Contact", icon: <PhoneRoundedIcon />, to: "/contact" },
  ];

  const handleBookingClick = () => {
    navigate("/bookings");
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ cursor: 'pointer' }} />
        </Link>
      </div>
      <div className="navbar-links-container">
        {menuOptions.map((item) => (
          <Link key={item.text} to={item.to}>{item.text}</Link>
        ))}
        <Link to="/cart" className="navbar-cart-icon">
          <BsCart2 />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>
        {loggedIn ? (
          <div className="user-icon" onClick={() => setLoggedIn(false)}>
            <AccountCircleIcon />
          </div>
        ) : (
          <Link to="/login" className="user-icon">
            <PersonOutlineIcon />
          </Link>
        )}
        <button className="primary-button" onClick={handleBookingClick}>
          Bookings now
        </button>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.to}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
};

export default NavBar;
