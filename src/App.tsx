import React from 'react';
import './App.css';
import { NavBar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import { BookCheckOutPage } from './layouts/BookCheckOutPage/BookCheckOutPage';
import { LoginPage } from './layouts/UserPage/LoginPage';
import { TopBooksPage } from './layouts/SearchBooksPage/TopBooksPage';

export const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  return (
    <div className='d-flex flex-column min-vh-100'>
      {!isAuthPage && <NavBar />}
      
      <div className='flex-grow-1'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchBooksPage />} />
          <Route path='/top-books' element={<TopBooksPage />} />
          <Route path='/check-out/:bookId' element={<BookCheckOutPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
