import { Router } from 'express';

import { articleRouter } from './article.router.js';
import { articleController } from '../controllers/article.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
 
export const router = Router();

router
	.use('/articles', articleRouter)
	.get('/', (_, res) => res.redirect('/home'))
	.get('/home', (req, res, next) => articleController.getList(req, res, next))
	.get('/admin', authMiddleware, (req, res, next) => articleController.getList(req, res, next))
	.get('/logout', authMiddleware, (_, res) => res.status(401).render('logout'));
	
	