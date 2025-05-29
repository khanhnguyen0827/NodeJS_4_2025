import express from "express";

import mysql from 'mysql2/promise';



const app = express();

app.use(express.json());//Chuyển dạng json sang đối tượng js trên req.body

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//4 cách lấy dư liệu
//1 cách lấy dư liệu bằng req.query
app.get("/query", (req, res) => {
    const query = req.query;
    res.json(query);
});

//2 cách lấy dư liệu bằng req.params
app.get("/params/:id", (req, res) => {
    const params = req.params;
    res.json(params);
});
//3 cách lấy dư liệu bằng req.HEADERS
//tHƯỜNG DÙNG ĐỂ TRUYỀN THÔNG TIN BằNG HEADERS
app.get("/headers", (req, res) => {
    const headers = req.headers;
    res.json(headers);
});

//3 cách lấy dư liệu bằng req.body
app.post("/body", (req, res) => {
    const body = req.body;
    console.log(body);
    res.json(body);
});

// Kết nối đến cơ sở dữ liệu MySQL
// Sử dụng mysql2/promise để hỗ trợ async/await trên cơ sở dữ liệu MySQL
const pool = mysql.createPool({
  uli: 'mysql://root:123456@localhost:3307/BE_Cyber_Community',});



app.listen(3069, () => {
    console.log("Server is running on port 3000");
});