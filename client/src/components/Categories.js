import React from 'react';

function Categories({getDailyExpenses, getWeeklyExpenses, getMonthlyExpenses, getYearlyExpenses}) {
   return (
      <div className='graph-container container'>
         <div className='graph-categories'>
            <div>
               <button onClick={getDailyExpenses} className='categories-btn'>
                  Daily
               </button>
            </div>
            <div>
               <button onClick={getWeeklyExpenses} className='categories-btn'>
                  Weekly
               </button>
            </div>
            <div>
               <button onClick={getMonthlyExpenses} className='categories-btn'>
                  Monthly
               </button>
            </div>
            <div>
               <button onClick={getYearlyExpenses} className='categories-btn'>
                  Yearly
               </button>
            </div>
         </div>
      </div>
   );
}

export default Categories;
