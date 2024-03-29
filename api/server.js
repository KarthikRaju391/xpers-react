const express = require("express");
const pool = require("./db");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

// app.use(express.static(__dirname));
const app = express();

// middleware
app.use(express.json()); // allows us to access the req.body
app.use(cors());

// if (process.env.NODE_ENV === 'production') {
//    // serve static content
//    // npm run build
// }

//ROUTES

// get all expenses
app.get("/expenses", async (req, res) => {
	try {
		const allExpenses = await pool.query(
			"SELECT * FROM expense ORDER BY expense_date DESC"
		);

		res.json(allExpenses.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get SUM of expenses
app.get("/expenses/sum", async (req, res) => {
	try {
		const expenseSUM = await pool.query(
			"SELECT SUM(expense_amount) FROM expense"
		);
		res.json(expenseSUM.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// get expenses sorted in asc order of expenses
app.get("/expenses/amount-asc", async (req, res) => {
	try {
		const allExpenses = await pool.query(
			"SELECT * FROM expense ORDER BY expense_amount"
		);

		res.json(allExpenses.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get min expense with description
app.get("/expenses/min-exp", async (req, res) => {
	try {
		const minExpense = await pool.query(
			"SELECT expense_amount, expense_desc FROM expense WHERE expense_amount = (SELECT MIN(expense_amount) FROM expense);"
		);
		res.json(minExpense.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

app.get("/expenses/max-exp", async (req, res) => {
	try {
		const maxExpense = await pool.query(
			"SELECT expense_amount, expense_desc FROM expense WHERE expense_amount = (SELECT MAX(expense_amount) FROM expense);"
		);
		res.json(maxExpense.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// get expenses sorted in desc order of expenses
app.get("/expenses/amount-dsc", async (req, res) => {
	try {
		const allExpenses = await pool.query(
			"SELECT * FROM expense ORDER BY expense_amount DESC"
		);
		res.json(allExpenses.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get expenses sorted by added date of expenses
app.get("/expenses/oldest-date", async (req, res) => {
	try {
		console.log("allExpenses");
		const allExpenses = await pool.query(
			"SELECT * FROM expense ORDER BY expense_date ASC"
		);

		res.json(allExpenses.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get expenses grouped by day
app.get("/expenses/daily", async (req, res) => {
	try {
		const weeklyExpenses = await pool.query(
			"SELECT DATE_TRUNC('day', expense_date) AS daily_expense, SUM(expense_amount) AS sum_of_expenses FROM expense GROUP BY DATE_TRUNC('day', expense_date) ORDER BY DATE_TRUNC('day', expense_date) ASC;"
		);

		res.json(weeklyExpenses.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get expenses grouped by week
app.get("/expenses/weekly", async (req, res) => {
	try {
		console.log("weeklyExpenses");
		const weeklyExpenses = await pool.query(
			"SELECT DATE_TRUNC('week', expense_date) AS weekly_expense, SUM(expense_amount) AS sum_of_expenses FROM expense GROUP BY DATE_TRUNC('week', expense_date) ORDER BY DATE_TRUNC('week', expense_date) ASC;"
		);

		res.json(weeklyExpenses.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get expenses grouped by month
app.get("/expenses/monthly", async (req, res) => {
	try {
		const weeklyExpenses = await pool.query(
			"SELECT DATE_TRUNC('month', expense_date) AS monthly_expense, SUM(expense_amount) AS sum_of_expenses FROM expense GROUP BY DATE_TRUNC('month', expense_date) ORDER BY DATE_TRUNC('month', expense_date) ASC;"
		);

		res.json(weeklyExpenses.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get expenses grouped by year
app.get("/expenses/yearly", async (req, res) => {
	try {
		const weeklyExpenses = await pool.query(
			"SELECT DATE_TRUNC('year', expense_date) AS yearly_expense, SUM(expense_amount) AS sum_of_expenses FROM expense GROUP BY DATE_TRUNC('year', expense_date) ORDER BY DATE_TRUNC('year', expense_date) ASC;"
		);

		res.json(weeklyExpenses.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get an expense

app.get("/expenses/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const expense = await pool.query(
			"SELECT * FROM expense WHERE expense_id = $1",
			[id]
		);
		res.json(expense.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// create an expense
app.post("/expenses", async (req, res) => {
	try {
		const { expense_desc, expense_amount, expense_date } = req.body;
		const newExpense = await pool.query(
			"INSERT INTO expense (expense_desc, expense_amount, expense_date) VALUES ($1, $2, $3) RETURNING *",
			[expense_desc, expense_amount, expense_date]
		);
		res.json(newExpense.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// update an expense

app.put("/expenses/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { expense_desc, expense_amount } = req.body;

		const updateExpenses = await pool.query(
			"UPDATE expense SET expense_desc = $1, expense_amount = $2 WHERE expense_id = $3",
			[expense_desc, expense_amount, id]
		);

		res.json("Expense was updated");
	} catch (err) {
		console.error(err.message);
	}
});

// delete an expense
app.delete("/expenses/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteExpense = await pool.query(
			"DELETE FROM expense WHERE expense_id = $1",
			[id]
		);
		res.json("Expense was deleted!");
	} catch (err) {
		console.error(err.message);
	}
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`server is listening on port ${PORT}`);
});
