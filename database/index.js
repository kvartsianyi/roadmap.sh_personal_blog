import sqlite3 from 'sqlite3';
import { promisify } from 'util';

const DB_FILENAME = process.env.DB_FILENAME || 'sqlite.db';
const sqlite = sqlite3.verbose();

const initDbConnection = () => new Promise((resolve, reject) => {
	const connection = new sqlite.Database(DB_FILENAME, (err) => {
		if (err) {
			reject(err);
		}
		resolve(connection);
	});
});
export const db = await initDbConnection();

// Promisify db methods
const methods = [
	'all',
	'get',
	'run',
];
methods.forEach(method => {
	db[`${method}Async`] = promisify(db?.[method]?.bind(db));
});

