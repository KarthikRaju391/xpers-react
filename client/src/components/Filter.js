import React, { useContext } from 'react';
import { ExpensesContext } from '../context/ExpensesContext';

function Filter() {
	const { setExpenses } = useContext(ExpensesContext);

	async function sortOldestDate() {
		const res = await fetch(
			'https://xpers-react.herokuapp.com/expenses/oldest-date'
		);
		const oldData = await res.json();
		setExpenses(oldData);
	}

	async function sortAscAmt() {
		const res = await fetch(
			'https://xpers-react.herokuapp.com/expenses/amount-asc'
		);
		const lowAmtData = await res.json();
		setExpenses(lowAmtData);
	}

	async function sortDscAmt() {
		const res = await fetch(
			'https://xpers-react.herokuapp.com/expenses/amount-dsc'
		);
		const highAmtData = await res.json();
		setExpenses(highAmtData);
	}

	async function sortNewDate() {
		const res = await fetch('https://xpers-react.herokuapp.com/expenses');
		const latestData = await res.json();
		setExpenses(latestData);
	}

	return (
		<div>
			<div className="container">
				<div className="flex dropdown-container">
					<div>
						<h2 className="text-shadow">Your expenses</h2>
					</div>
					<div className="dropdown filter-section">
						<button className="dropbtn filter-btn">
							<i className="fas fa-sliders-h"></i>
						</button>
						<div className="dropdown-content">
							<button onClick={sortAscAmt} id="sort-amount-asc">
								<i className="fas fa-sort-amount-down-alt"></i>
								<small>Cheapest first</small>
							</button>
							<button onClick={sortDscAmt} id="sort-amount-dsc">
								<i className="fas fa-sort-amount-up-alt"></i>
								<small>Expensive first</small>
							</button>
							<button onClick={sortOldestDate} id="sort-date-oldest">
								<i className="fas fa-sort-numeric-down-alt"></i>
								<small>Oldest first</small>
							</button>
							<button onClick={sortNewDate} id="sort-date-newest">
								<i className="fas fa-sort-numeric-up-alt"></i>
								<small>Latest first</small>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Filter;
