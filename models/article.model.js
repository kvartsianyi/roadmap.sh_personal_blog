import { db } from '../database/index.js';


class ArticleModel {
	db;

	constructor(db) {
		this.db = db;
	}

	async getAll() {
		return db.allAsync(`SELECT ${this.#selectFields()} FROM articles ORDER BY publishedAt DESC;`);
	}

	async getById(id) {
		return db.getAsync(`SELECT ${this.#selectFields()} FROM articles WHERE id=?;`, id);
	}

	async create({ title, content, publishedAt }) {
		const sql = 'INSERT INTO articles (title, content, publishedAt) VALUES ($title, $content, strftime(\'%Y-%m-%d %H:%M:%S\', $publishedAt));';

		return db.runAsync(sql, {
			$title: title,
			$content: content,
			$publishedAt: new Date(publishedAt).toISOString(),
		});
	}

	async update(id, { title, content, publishedAt }) {
		const sql = 'UPDATE articles SET title=$title, content=$content, publishedAt=strftime(\'%Y-%m-%d %H:%M:%S\', $publishedAt) WHERE id=$id;';

		return db.runAsync(sql, {
			$id: id,
			$title: title,
			$content: content,
			$publishedAt: new Date(publishedAt).toISOString(),
		});
	}

	async delete(id) {
		return db.runAsync('DELETE FROM articles WHERE id=(?);', id);
	}

	#selectFields() {
		return `id, title, content, publishedAt`;
	}
}

export const articleModel = new ArticleModel(db);
