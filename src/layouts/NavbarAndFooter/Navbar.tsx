import React from "react";

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
                <a className='nav-link' href='#'>Home</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'>Search Books</a>
              </li>
            </ul>
            <ul className='navbar-nav ms-auto'>
              <li className='nave-item m-1'>
              <a className='btn btn-outline-light' href='#' type='button'>Sign In</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}