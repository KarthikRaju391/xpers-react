import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
   let path = useLocation();
   let navigate = useNavigate();
   return (
      <header className='header'>
         <nav className='nav-container'>
            <h2
               onClick={() => {
                  navigate('/');
               }}
               id='heading-el'
            >
               Xpers
            </h2>

            {path.pathname === '/expenses' ? (
               <Link to='/' id='next-link' className='your-expense-link'>
                  <i id='prev-icon' className='fas fa-arrow-left'></i> Add
                  Expenses{' '}
               </Link>
            ) : (
               <Link
                  to='/expenses'
                  id='next-link'
                  className='your-expense-link'
               >
                  Total Expenses{' '}
                  <i id='next-icon' className='fas fa-arrow-right'></i>
               </Link>
            )}
         </nav>
      </header>
   );
}
