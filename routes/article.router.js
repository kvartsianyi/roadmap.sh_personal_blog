import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { articleController } from '../controllers/article.controller.js';
import { wrapAsyncErrors } from '../utils.js';

export const articleRouter = Router();

articleRouter
	.get('/new', authMiddleware, wrapAsyncErrors(articleController.renderNewArticleForm))
	.get('/:id', wrapAsyncErrors(articleController.getOne))
	.get('/:id/edit', authMiddleware, wrapAsyncErrors(articleController.renderUpdateArticleForm))
	.get('/:id/delete', authMiddleware, wrapAsyncErrors(articleController.deleteArticle))
	.post('/new', authMiddleware, wrapAsyncErrors(articleController.createArticle))
	.post('/:id/edit', authMiddleware, wrapAsyncErrors(articleController.updateArticle));