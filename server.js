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
  uri: 'mysql://root:123456@localhost:3307/db_cyber_community',});
  try {
  // For pool initialization, see above
    // Use pool.query() to execute a query kiểm tra kết nối
  await pool.query('SELECT 1');
    console.log("Kết nối đến cơ sở dữ liệu MySQL thành công!");
} catch (err) {
  console.log(err);
}

app.get("/MySQL2", async (req, res) => {

    // For pool initialization, see above
    // lấy dữ liệu bằng cơ sở dữ liệu MySQL
    // Sử dụng async/await để lấy dữ liệu từ cơ sở dữ liệu MySQL
    // Sử dụng pool.query() để thực hiện truy vấn
    // Lấy dữ liệu từ bảng Roles
//     const listRows = await pool.query('SELECT * FROM `Roles`');
//    console.log(listRows);

    const [ rows, fields] = await pool.query('SELECT * FROM `Roles`');
    // Trả về dữ liệu dưới dạng JSON
    //rows là mảng các đối tượng, mỗi đối tượng là một hàng dữ liệu trong bảng Roles
    //fields là mảng các trường dữ liệu trong bảng Roles

    res.json(rows || []); // Trả về dữ liệu dưới dạng JSON, nếu không có dữ liệu thì trả về mảng rỗng
    // res.json(fields || []); // Trả về dữ liệu dưới dạng JSON, nếu không có dữ liệu thì trả về mảng rỗng
});



app.listen(3069, () => {
    console.log("Server is running on port 3000");
});