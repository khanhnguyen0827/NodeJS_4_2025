import express from 'express';

import articlesController from '../controllers/articles.controller.js';



const articlesRoter = express.Router();

articlesRoter.get('/', articlesController.getAllArticles);