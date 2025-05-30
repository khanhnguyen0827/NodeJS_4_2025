import express from 'express';

import DemoRouter from './demo.router.js';
const rootRouter = express.Router();

rootRouter.use('/demo', DemoRouter);

export default rootRouter;