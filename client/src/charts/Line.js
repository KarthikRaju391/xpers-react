import { Line } from 'react-chartjs-2';
import React, { useContext, useEffect } from 'react';
import { ExpensesContext } from '../context/ExpensesContext';

import Categories from '../components/Categories';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			ticks: {
				callback: function (value, index, ticks) {
					return '₹' + value;
				},
			},
		},
	},

	tooltips: {
		callbacks: {
			label: (tooltipItem, data) => {
				return `₹ ${tooltipItem.value}`;
			},
		},
	},
};

function LineChart() {
	const { xlabels, yexpenses, setXlabels, setYexpenses } =
		useContext(ExpensesContext);
	useEffect(() => {
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
		}
		getAllExpenses();
	}, [xlabels, yexpenses, setXlabels, setYexpenses]);

	async function getDailyExpenses() {
		const xlabels = [];
		const yexpenses = [];
		const res = await fetch(
			'https://xpers-react.herokuapp.com/expenses/daily'
		);
		const data = await res.json();
		data.forEach((expense) => {
			let addedOn = new Date(expense.daily_expense);
			let moment = addedOn.toLocaleDateString('en-US', {
				day: 'numeric',
				month: 'long',
			});
			xlabels.push(moment);
			yexpenses.push(expense.sum_of_expenses);
		});
		setXlabels(xlabels);
		setYexpenses(yexpenses);
	}

	async function getWeeklyExpenses() {
		const xlabels = [];
		const yexpenses = [];
		const res = await fetch(
			'https://xpers-react.herokuapp.com/expenses/weekly'
		);
		const data = await res.json();
		data.forEach((expense) => {
			let addedOn = new Date(expense.weekly_expense);
			let moment = addedOn.toLocaleDateString('en-US', {
				day: 'numeric',
				month: 'long',
			});
			xlabels.push(moment);
			yexpenses.push(expense.sum_of_expenses);
		});
		setXlabels(xlabels);
		setYexpenses(yexpenses);
	}

	async function getMonthlyExpenses() {
		const xlabels = [];
		const yexpenses = [];
		const res = await fetch(
			'https://xpers-react.herokuapp.com/expenses/monthly'
		);
		const data = await res.json();
		data.forEach((expense) => {
			let addedOn = new Date(expense.monthly_expense);
			let moment = addedOn.toLocaleDateString('en-US', {
				month: 'long',
			});
			xlabels.push(moment);
			yexpenses.push(expense.sum_of_expenses);
		});
		setXlabels(xlabels);
		setYexpenses(yexpenses);
	}

	async function getYearlyExpenses() {
		const xlabels = [];
		const yexpenses = [];
		const res = await fetch(
			'https://xpers-react.herokuapp.com/expenses/yearly'
		);
		const data = await res.json();
		data.forEach((expense) => {
			let addedOn = new Date(expense.yearly_expense);
			let moment = addedOn.toLocaleDateString('en-US', {
				year: 'numeric',
			});
			xlabels.push(moment);
			yexpenses.push(expense.sum_of_expenses);
		});
		setXlabels(xlabels);
		setYexpenses(yexpenses);
	}

	const data = {
		labels: xlabels,
		datasets: [
			{
				label: 'Your Expenses',
				data: yexpenses,
				fill: true,
				borderColor: 'rgba(75, 85, 99, 1)',
				// backgroundColor: 'rgba(75, 85, 99, 0.5)',
				backgroundColor: 'white',
				borderWidth: 2,
				tension: 0.4,
			},
		],
	};

	return (
		<section>
			<section className="graph-container container">
				<div className="graph-categories">
					<Categories
						getDailyExpenses={getDailyExpenses}
						getWeeklyExpenses={getWeeklyExpenses}
						getMonthlyExpenses={getMonthlyExpenses}
						getYearlyExpenses={getYearlyExpenses}
					/>
				</div>
			</section>
			<hr className="line" style={{ marginTop: '-0.65em' }} />

			<section className="graph container">
				<div className="graph-chart">
					<Line id="line-chart" options={options} data={data} />
				</div>
			</section>
		</section>
	);
}

export default LineChart;
