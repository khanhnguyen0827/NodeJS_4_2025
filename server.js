import express from "express";
// Import express for creating the server and handling requests

import mysql from 'mysql2/promise';
// Import mysql2/promise for async/await support

import { Sequelize } from 'sequelize';
// Import Sequelize for ORM support



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
// Tạo một pool kết nối đến cơ sở dữ liệu MySQL

// Kiểm tra kết nối đến cơ sở dữ liệu MySQL
  try {
  // For pool initialization, see above
    // Use pool.query() to execute a query kiểm tra kết nối
  await pool.query('SELECT 1');
    console.log("Kết nối đến cơ sở dữ liệu MySQL thành công!");
} catch (err) {
  console.log(err, "Kết nối đến cơ sở dữ liệu MySQL khó tạo!");
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


// Kết nối đến cơ sở dữ liệu MySQL bằng Sequelize
const sequelize = new Sequelize( 'mysql://root:123456@localhost:3307/db_cyber_community');
// Kiểm tra kết nối
try {
    await sequelize.authenticate();
    console.log('Kết nối đến cơ sở dữ liệu MySQL bằng Sequelize thành công!');    
} catch (error) {
    console.log(error, 'Kết nối đến cơ sở dữ liệu MySQL bằng Sequelize khó tạo!');         
}

app.get("/Sequelize", async (req, res) => {
    // Lấy dữ liệu từ bảng Roles bằng Sequelize
    const listRoles = await sequelize.query('SELECT * FROM `Roles`');    
    res.json(listRoles);
})


// Tạo server 
// Sử dụng app.listen() để tạo server và lắng nghe các yêu cầu từ clien
app.listen(3069, () => {
    console.log("Server is running on port 3069");
});


/**
 * Các thư viện dùng
 * Epress: Cốt lỗi xây dưng API (Application Programming Interface) trên server với tương tác giữa client và server https://expressjs.com/
 * nodemon: dùng để tạo server cốt lỗi  trên API https://www.npmjs.com/package/nodemon
 * MySQL2: dùng để tương tác với db bằng  câu lệnh SQl trên cơ sở dữ liệu MySQL https://www.npmjs.com/package/mysql2
 * sequelize: Dùng để tương tác với db bằng ORM (object relational mapping) hay hàm function trên cơ sở dữ liệu MySQL https://sequelize.org
 * 
 * 
 */