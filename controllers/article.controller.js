import { articleService } from '../services/article.service.js';

class ArticleController {
	articleService;

	constructor(articleService) {
		this.articleService = articleService;

		this.getList = this.getList.bind(this);
		this.getOne = this.getOne.bind(this);
		this.createArticle = this.createArticle.bind(this);
		this.updateArticle = this.updateArticle.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
		this.renderUpdateArticleForm = this.renderUpdateArticleForm.bind(this);
	}

	async getList(_, res) {
		const { isAuthorized } = res.locals;

		const articles = await this.articleService.getAll();

		return res.render('home', {
			articles,
			admin: isAuthorized,
		});
	}

	async getOne(req, res) {
		const { id } = req?.params;

		const article = await this.articleService.getById(id);

		return res.render('article-view', { article });
	}

	async createArticle(req, res) {
			const { title, content, publishedAt } = req.body;

			await this.articleService.create({ title, content, publishedAt });

			return res.redirect('/admin');
	}

	async updateArticle(req, res) {
		const { id } = req?.params;
		const { title, content, publishedAt } = req.body;

		await this.articleService.update(id, { title, content, publishedAt });

		return res.redirect('/admin');
}

	async deleteArticle(req, res) {
		const { id } = req?.params;

		await this.articleService.delete(id);

		return res.redirect('/admin');
	}

	renderNewArticleForm(_, res) {
		const newArticleFormOptions = {
			title: 'New Article',
			action: '/articles/new',
			submitBtnTitle: 'Publish',
		};

		return res.render('article-form', newArticleFormOptions)
	}

	async renderUpdateArticleForm(req, res) {
		const { id } = req?.params;
		
		const article = await this.articleService.getById(id);

		const updateArticleFormOptions = {
			title: 'Update Article',
			action: `/articles/${id}/edit`,
			submitBtnTitle: 'Update',
			article,
		};
		return res.render('article-form', updateArticleFormOptions)
	}
}

export const articleController = new ArticleController(articleService);