import React, { useState, createContext } from 'react';

export const ExpensesContext = createContext();

export const ExpensesContextProvider = (props) => {
	const [expenses, setExpenses] = useState([]);
	const [xlabels, setXlabels] = useState([]);
	const [yexpenses, setYexpenses] = useState([]);

	const addExpenses = async (expense) => {
		// expenses.unshift(expense);
		// setExpenses(expenses);
		await fetch('https://xpers-react.herokuapp.com/expenses', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(expense),
		});
		setExpenses([expense, ...expenses]);
		console.log(expense);
	};

	const updateExpense = (expense, id) => {
		expenses.map((exp) => {
			if (exp.expense_id === id) {
				exp.expense_amount = expense.expense_amount;
				exp.expense_desc = expense.expense_desc;
				return exp;
			}
			return exp;
		});
		setExpenses(expenses);
	};

	return (
		<ExpensesContext.Provider
			value={{
				expenses,
				setExpenses,
				addExpenses,
				updateExpense,
				xlabels,
				setXlabels,
				yexpenses,
				setYexpenses,
			}}
		>
			{props.children}
		</ExpensesContext.Provider>
	);
};
