import express from 'express';

import demoController from '../controllers/demo.controller.js';

const DemoRouter = express.Router();


DemoRouter.get('/', demoController.hello);
DemoRouter.get('/query', demoController.query);
DemoRouter.get('/params/:id', demoController.params);
DemoRouter.get('/headers', demoController.headers);
DemoRouter.post('/body', demoController.body);

DemoRouter.get('/mysql2', demoController.mysql2);

//middleware

DemoRouter.get('/sequelize', demoController.sequelize);


export default DemoRouter;


