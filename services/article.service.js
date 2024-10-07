import { articleModel } from '../models/article.model.js';

class ArticleService {
	articleRepository;

	constructor(articleRepository) {
		this.articleRepository = articleRepository;
	}

	async getAll() {
		return this.articleRepository.getAll();
	}

	async getById(id) {
		return this.articleRepository.getById(id);
	}

	async create({ title, content, publishedAt }) {
		return this.articleRepository.create({ title, content, publishedAt });
	}

	async update(id, { title, content, publishedAt }) {
		return this.articleRepository.update(id, { title, content, publishedAt });
	}

	async delete(id) {
		return this.articleRepository.delete(id);
	}
}

export const articleService = new ArticleService(articleModel);