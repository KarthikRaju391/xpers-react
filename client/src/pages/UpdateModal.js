import React, { useContext, useState, useEffect } from 'react';
import { ExpensesContext } from '../context/ExpensesContext';

function UpdateModal({ showModal, setShowModal, id, setId }) {
   const { updateExpense } = useContext(ExpensesContext);
   const [oldExp, setOldExp] = useState('');
   const [oldDesc, setOldDesc] = useState('');

   useEffect(() => {
      async function getAnExpense() {
         try {
            const res = await fetch(`https://xpers-react.herokuapp.com/expenses/${id}`);
            const exp = await res.json();
            setOldExp(exp.expense_amount);
            setOldDesc(exp.expense_desc);
         } catch (err) {
            console.error(err.message);
         }
      }
      getAnExpense();
   }, [id]);

   async function handleUpdateExpense(expenseId) {
      const newData = {
         expense_desc: oldDesc,
         expense_amount: oldExp,
      };

      try {
         await fetch(`https://xpers-react.herokuapp.com/expenses/${expenseId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
         });
         updateExpense(newData, expenseId);
         setShowModal(false);
      } catch (err) {
         console.error(err.message);
      }
   }

   function handleCloseModal() {
      setShowModal(false);
      setId('');
   }
   return (
      <div>
         {showModal ? (
            <div id='edit-modal' className='modal'>
               <div className='modal-content'>
                  <div className='modal-header'>
                     <span
                        onClick={handleCloseModal}
                        id='close-btn'
                        className='close'
                     >
                        &times;
                     </span>
                     <h2>Edit Expense</h2>
                  </div>
                  <hr />
                  <div className='modal-body'>
                     <div className='amount-section'>
                        <input
                           placeholder='Update amount spent'
                           required
                           type='text'
                           value={oldExp || ''}
                           onChange={e => setOldExp(e.target.value)}
                           id='update-expense-amount'
                        />
                     </div>
                     <div className='description-section'>
                        <input
                           placeholder='Update expense'
                           required
                           value={oldDesc || ''}
                           onChange={e => setOldDesc(e.target.value)}
                           type='text'
                           id='update-expense-description'
                        />
                     </div>
                  </div>
                  <div className='modal-footer'>
                     <button
                        onClick={() => handleUpdateExpense(id)}
                        id='update-expense-btn'
                        type='button'
                        className='edit-btn'
                     >
                        <i className='fas fa-check-circle'></i>
                     </button>
                  </div>
               </div>
            </div>
         ) : null}
      </div>
   );
}

export default UpdateModal;
