import express from 'express';

import articlesController from '../controllers/articles.controller.js';
import e from 'express';



const articlesRoter = express.Router();

articlesRoter.get('/', articlesController.getAllArticles);


export default articlesRoter;