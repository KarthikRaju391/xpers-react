import React, { useContext } from 'react';
import { ExpensesContext } from '../context/ExpensesContext';

function ViewDetails() {
	const { setXlabels, setYexpenses } = useContext(ExpensesContext);

	async function getAllExpenses() {
		const xlabels = [];
		const yexpenses = [];
		const res = await fetch(
			'https://xpers-react.herokuapp.com/expenses/oldest-date'
		);
		const data = await res.json();
		data.forEach((expense) => {
			let addedOn = new Date(expense.expense_date);
			let moment = addedOn.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			});
			xlabels.push(moment);
			yexpenses.push(expense.expense_amount);
		});
		setXlabels(xlabels);
		setYexpenses(yexpenses);

		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		});
	}

	return (
		<div>
			<button onClick={getAllExpenses} className="view-details-btn">
				View Details
			</button>
		</div>
	);
}

export default ViewDetails;
