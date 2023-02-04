import React from 'react';
import "./Navbar.css";
import { House, Hash, Bell, ChatsCircle, UserCircle, GearSix, Bookmark } from "phosphor-react";
import { Link } from "react-router-dom";
import WarblerLogo from "../graphics/logo.png";
import URL from './globalvars.js';


function NavbarOption({ active, text, Icon, Loc }) {
  if (active.active === Loc) {
    return (
      <Link to={Loc} className={`NavbarOption-active`}>
        <Icon className="Icon" />
        <h3>{text}</h3>
      </Link>
    );
  }
  else {
    return (
      <Link to={Loc} className={`NavbarOption`}>
        <Icon className="Icon" />
        <h3>{text}</h3>
      </Link>
    );
  }
}

//has routes to pages
const Navbar = (Location) => {
  return (
    <div className='Navbar'>
      <img src={WarblerLogo} className='Warbler_Icon' alt='WarblerLogo' />

      <NavbarOption Icon={House} text="Home" Loc="/Home" active={Location} />
      <NavbarOption Icon={Hash} text="Explore" Loc="/Explore" active={Location} />
      <NavbarOption Icon={Bookmark} text="Bookmarks" Loc="/Bookmarks" active={Location} />
      <NavbarOption Icon={UserCircle} text="Profile" Loc="/Profile" active={Location} />
    </div>
  );
}

export default Navbar;