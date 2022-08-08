import React, { useState, useContext } from 'react';
import PaymentImg from '../images/undraw_payments_re_77x0.svg';
import { ExpensesContext } from '../context/ExpensesContext';

function AddExpense() {
	const { addExpenses } = useContext(ExpensesContext);
	const [amount, setAmount] = useState('');
	const [desc, setDesc] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();
		let expenseDate = new Date();
		const expenseData = {
			expense_desc: desc,
			expense_amount: Number(amount),
			expense_date: expenseDate,
		};
		try {
			addExpenses(expenseData);
		} catch (err) {
			console.error(err.message);
		}

		setDesc('');
		setAmount('');
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		});
	}

	return (
		<div className="input-flex">
			<div className="payment-image-container">
				<img className="payment-image" src={PaymentImg} alt="" />
			</div>
			<form
				onSubmit={handleSubmit}
				id="form"
				className="jumbotron expense-form"
			>
				<h3 className="expense-header text-shadow">Enter your expense</h3>
				<div className="amount-section">
					<button id="rupee" className="rupee-sign">
						<i className="fas fa-rupee-sign fa-lg"></i>
					</button>
					<input
						placeholder="Amount spent"
						required
						type="text"
						id="expense-amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
				</div>
				<div className="description-section">
					<button className="at-sign">
						<i className="fas fa-at"></i>
					</button>
					<input
						placeholder="Spent on"
						required
						type="text"
						id="expense-description"
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					/>
				</div>
				<button type="submit" id="add-expense-btn" className="add">
					Add
				</button>
			</form>
		</div>
	);
}

export default AddExpense;
