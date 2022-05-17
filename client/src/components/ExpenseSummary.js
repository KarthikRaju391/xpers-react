import React, { useEffect, useState } from 'react';
import walletImg from '../images/undraw_wallet_aym5.svg';
import ViewDetails from './ViewDetails';
import ExpSVG from '../images/exp.svg';
import ListSVG from '../images/list.svg';

function ExpenseSummary() {
   const [sumOfExp, setSumOfExp] = useState(0);
   const [maxOfExp, setMaxOfExp] = useState(0);
   const [minOfExp, setMinOfExp] = useState(0);
   const [minDesc, setMinDesc] = useState('');
   const [maxDesc, setMaxDesc] = useState('');

   useEffect(() => {
      async function getSumOfExp() {
         try {
            const res = await fetch('http://localhost:5000/expenses/sum');
            const data = await res.json();
            setSumOfExp(data.sum);
         } catch (err) {
            console.error(err.message);
         }
      }

      async function getMinExp() {
         try {
            const res = await fetch('http://localhost:5000/expenses/min-exp');
            const data = await res.json();
            setMinOfExp(data.expense_amount);
            setMinDesc(data.expense_desc);
         } catch (err) {
            console.error(err.message);
         }
      }

      async function getMaxExp() {
         try {
            const res = await fetch('http://localhost:5000/expenses/max-exp');
            const data = await res.json();
            setMaxOfExp(data.expense_amount);
            setMaxDesc(data.expense_desc);
         } catch (err) {
            console.error(err.message);
         }
      }
      getSumOfExp();
      getMinExp();
      getMaxExp();
   }, []);

   return (
      <div className='input-flex'>
         <div className='image-container'>
            <img className='wallet-image' src={walletImg} alt='' />
         </div>
         <div
            className='show-expense-jumbotron'
            style={
               sumOfExp > 20000
                  ? {
                       backgroundImage: `url(${ExpSVG})`,
                       backgroundSize: 'cover',
                    }
                  : {
                       backgroundImage: `url(${ListSVG})`,
                       backgroundSize: 'cover',
                    }
            }
         >
            <div className='total-amount'>
               <div>
                  <p className='total-amount-text'>
                     <i className='fas fa-wallet'></i> Total Amount
                  </p>
                  <h1 className='total-amount-value'>₹{sumOfExp}</h1>
               </div>
            </div>
            <div className='highest-lowest'>
               <p>
                  Highest Expense: <strong>₹{maxOfExp}</strong> for{' '}
                  <em>{maxDesc}</em>
               </p>
               <p>
                  Lowest Expense: <strong>₹{minOfExp}</strong> for{' '}
                  <em>{minDesc}</em>
               </p>
            </div>
            <ViewDetails />
         </div>
      </div>
   );
}

export default ExpenseSummary;
