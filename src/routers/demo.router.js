import express from 'express';

import demoController from '../cotrollers/demo.controller.js';

const DemoRouter = express.Router();


DemoRouter.get('/', demoController.hello);
DemoRouter.get('/query', demoController.query);
DemoRouter.get('/params/:id', demoController.params);
DemoRouter.get('/headers', demoController.headers);
DemoRouter.post('/body', demoController.body);


export default DemoRouter;




