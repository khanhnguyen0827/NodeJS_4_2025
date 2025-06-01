import express from 'express';

import demoController from '../controllers/demo.controller.js';
import e from 'express';

const DemoRouter = express.Router();


DemoRouter.get('/', demoController.hello);
DemoRouter.get('/query', demoController.query);
DemoRouter.get('/params/:id', demoController.params);
DemoRouter.get('/headers', demoController.headers);
DemoRouter.post('/body', demoController.body);

DemoRouter.get('/mysql2', demoController.mysql2);


//middleware

DemoRouter.get('/sequelize',
    (req, res, next)=>{console.log(`Middleware 1`);next()},
    (req, res, next)=>{if (true){next()}else{res.json(`không hợp lệ`)}}, 
    (req, res, next)=>{console.log(`Middleware 3`)} ,
    demoController.sequelize);


export default DemoRouter;


