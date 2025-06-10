import express from 'express';

import articlesController from '../controllers/articles.controller.js';
import protect from '../common/middlewares/protect.middleware.js';




const articlesRoter = express.Router();

articlesRoter.get('/', protect,articlesController.getAllArticles);


export default articlesRoter;