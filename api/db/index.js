const Pool = require("pg/lib").Pool;
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
	ssl: isProduction ? { rejectUnauthorized: false } : false,
});

module.exports = {
	query: (text, params) => pool.query(text, params),
};
