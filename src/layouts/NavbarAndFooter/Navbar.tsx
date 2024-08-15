import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';

export const NavBar = () => {

  const getCookie = Cookies.get('jwt');

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
                {
                  getCookie !== undefined ? 
                  <NavLink className='btn btn-light' to='#'>hello</NavLink>
                  :
                  <NavLink className='btn btn-light' to='/login'>Sign In</NavLink>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}