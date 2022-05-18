import React, { useState, useEffect, useContext } from 'react';
import { ExpensesContext } from '../context/ExpensesContext';
import UpdateModal from '../pages/UpdateModal';

function ExpenseList() {
   const { expenses, setExpenses } = useContext(ExpensesContext);
   const [showModal, setShowModal] = useState(false);
   const [id, setId] = useState('');

   useEffect(() => {
      async function getAllExpenses() {
         try {
            const res = await fetch('https://xpers-react.herokuapp.com/expenses');
            const exp = await res.json();
            setExpenses(exp);
         } catch (err) {
            console.error(err.message);
         }
      }
      getAllExpenses();
   }, [setExpenses]);

   async function handleDelete(expenseSno) {
      try {
         await fetch(`https://xpers-react.herokuapp.com/expenses/${expenseSno}`, {
            method: 'DELETE',
         });
         setExpenses(
            expenses.filter(expense => expense.expense_id !== expenseSno)
         );
      } catch (err) {
         console.error(err.message);
      }
   }

   async function handleUpdate(expenseSno) {
      setShowModal(true);
      setId(expenseSno);
   }

   return (
      <div className='expense-div'>
         <div className='expense-section'>
            <UpdateModal
               id={id}
               setId={setId}
               showModal={showModal}
               setShowModal={setShowModal}
            />
            <ul className='expenses' id='expense-list'>
               {expenses.map((expense, index) => (
                  <li className='expense-list-item' key={index}>
                     <div className='expense-list-item-desc'>
                        <div className='mobile flex flex-col'>
                           <p className='fw-500'>{expense.expense_desc}</p>
                           <small className='fs-200'>
                              {new Date(
                                 expense.expense_date
                              ).toLocaleDateString('en-US', {
                                 year: 'numeric',
                                 month: 'long',
                                 day: 'numeric',
                              })}
                           </small>
                        </div>
                        <span className='fw-500'>
                           ₹{expense.expense_amount}
                        </span>
                     </div>
                     <div className='expense-list-item-amount'>
                        <button
                           onClick={() => handleUpdate(expense.expense_id)}
                           type='button'
                           className='edit-btn'
                        >
                           <i className='far fa-edit'></i>
                        </button>
                        <button
                           onClick={() => handleDelete(expense.expense_id)}
                           type='button'
                           className='delete-btn'
                        >
                           <i className='fas fa-trash'></i>
                        </button>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
}

export default ExpenseList;
