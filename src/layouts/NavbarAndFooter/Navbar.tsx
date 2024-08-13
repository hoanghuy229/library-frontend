import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
        <div className='container-fluid'>
          <span className='navbar-brand'>Huy Library</span>
          <button 
          className='navbar-toggler' type='button' 
          data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' 
          aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle Navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/'>Home</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/search'>Search Books</NavLink>
              </li>
            </ul>
            <ul className='navbar-nav ms-auto'>
              <li className='nave-item m-1'>
              <NavLink className='btn btn-light' to='/login'>Sign In</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}