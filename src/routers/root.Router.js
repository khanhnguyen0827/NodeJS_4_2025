import expess from 'express';

import demoRouter from './demo.Router.js';

const rootRouter = expess.Router();


rootRouter.use('/demo', demoRouter);

export default rootRouter;