import React from "react";
import { Link } from "react-router-dom";
import logo from "../pages/img/logo.png";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        
        <Link to="/">
        <img src={logo} alt="Kodebloom Logo" className="h-10 w-auto" />
        </Link>

        
        
      </div>
    </header>
  );
};

export default Header;
