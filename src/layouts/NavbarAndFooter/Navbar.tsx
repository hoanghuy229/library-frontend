import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';

export const NavBar = () => {

  const getJwt = Cookies.get('jwt');
  const getRole = Cookies.get('role')


  const logout = () => {
    Cookies.remove('jwt');
    Cookies.remove('role');
    window.location.href = '/';
  }

  function render() {
    if(getJwt !== undefined && getRole === 'ADMIN'){
     return(
      <>
        <li className='nav-item'>
            <NavLink className='nav-link' to='/shelf'>Shelf</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/admin'>Admin</NavLink>
        </li>
      </>
     )
    }
    else if (getJwt !== undefined && getRole === 'USER'){
     return(
      <li className='nav-item'>
        <NavLink className='nav-link' to='/shelf'>Shelf</NavLink>
      </li>
     )
    }
    else{
      return(<></>)
    }
  }

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
              {render()}
            </ul>
            <ul className='navbar-nav ms-auto'>
              <li className='nave-item m-1'>
                {
                  getJwt !== undefined ? 
                  <NavLink className='btn btn-dark' to='#' type="button" onClick={logout}>Sign out</NavLink>
                  :
                  <NavLink className='btn btn-dark' to='/login' type="button">Sign In</NavLink>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}