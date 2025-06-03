import express from 'express';

import DemoRouter from './demo.router.js';
import acticlesRouter from './articles.router.js';
const rootRouter = express.Router();

rootRouter.use('/demo', DemoRouter);
rootRouter.use('/article', acticlesRouter);




export default rootRouter;