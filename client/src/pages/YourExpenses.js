import React from 'react';
import ExpenseSummary from '../components/ExpenseSummary';
import Graph from '../components/Graph';
// import Categories from '../components/Categories';

function YourExpenses() {
   return (
      <div className='show-expense-container'>
         <ExpenseSummary />
         <Graph />
      </div>
   );
}

export default YourExpenses;
