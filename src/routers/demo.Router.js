import express from "express";
import demoController from "../controllers/demo.controller";

const demoRouter = express.Router();// Khoi tao router

demoRouter.get("/", demoController.HelloWorld);

//4 cách lấy dư liệu
//1 cách lấy dư liệu bằng req.query
demoRouter.get("/query", (req, res) => {
    const query = req.query;
    res.json(query);
});

//2 cách lấy dư liệu bằng req.params
demoRouter.get("/params/:id", (req, res) => {
    const params = req.params;
    res.json(params);
});
//3 cách lấy dư liệu bằng req.HEADERS
//tHƯỜNG DÙNG ĐỂ TRUYỀN THÔNG TIN BằNG HEADERS
demoRouter.get("/headers", (req, res) => {
    const headers = req.headers;
    res.json(headers);
});

//3 cách lấy dư liệu bằng req.body
demoRouter.post("/body", (req, res) => {
    const body = req.body;
    console.log(body);
    res.json(body);
});

export default demoRouter;