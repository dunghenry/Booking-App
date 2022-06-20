import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import Navbar from './../navbar/index';

const Header = () => {
  return (
    <header>
      <div className="container p-2 d-flex justify-content-between">
        <Link to="/" className="text-decoration-none">
          <h3 className="text-muted pt-2">Home</h3>
        </Link>
        <Navbar/>
      </div>
    </header>
  );
};

export default Header;
