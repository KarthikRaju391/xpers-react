import React, {useContext} from 'react';
import { ExpensesContext } from '../context/ExpensesContext';

function Filter() {
   const {setExpenses} = useContext(ExpensesContext);

   async function sortOldestDate() {
      const res = await fetch('http://localhost:5000/expenses/oldest-date');
      const oldData = await res.json();
      setExpenses(oldData);
   }

   async function sortAscAmt() {
      const res = await fetch('http://localhost:5000/expenses/amount-asc');
      const lowAmtData = await res.json();
      setExpenses(lowAmtData);
   }

   async function sortDscAmt() {
      const res = await fetch('http://localhost:5000/expenses/amount-dsc');
      const highAmtData = await res.json();
      setExpenses(highAmtData);
   }

   async function sortNewDate() {
      const res = await fetch('http://localhost:5000/expenses');
      const latestData = await res.json();
      setExpenses(latestData);
   }

   return (
      <div>
         <div className='container'>
            <div className='flex dropdown-container'>
               <div>
                  <h2 className='ff-serif text-shadow'>Your expenses</h2>
               </div>
               <div className='dropdown filter-section'>
                  <button className='dropbtn filter-btn'>
                     <i className='fas fa-sliders-h'></i>
                  </button>
                  <div className='dropdown-content'>
                     <a onClick={sortAscAmt} id='sort-amount-asc'>
                        <i className='fas fa-sort-amount-down-alt'></i>
                        <small>Cheapest first</small>
                     </a>
                     <a onClick={sortDscAmt} id='sort-amount-dsc'>
                        <i className='fas fa-sort-amount-up-alt'></i>
                        <small>Expensive first</small>
                     </a>
                     <a onClick={sortOldestDate} id='sort-date-oldest'>
                        <i className='fas fa-sort-numeric-down-alt'></i>
                        <small>Oldest first</small>
                     </a>
                     <a onClick={sortNewDate} id='sort-date-newest'>
                        <i className='fas fa-sort-numeric-up-alt'></i>
                        <small>Latest first</small>
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Filter;
