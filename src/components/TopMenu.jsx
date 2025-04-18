import React from 'react';
import { Link } from 'react-router-dom';

const TopMenu = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg p-2" style={{backgroundColor:"#ae9371"}}>
      <div className="container-fluid" style={{backgroundColor:"#ae9371"}}>
        <Link className="navbar-brand" to="/Home">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav" >
            <li className="nav-item">
              <Link className="nav-link" to="/products/GetAllProducts">
              All Product
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;