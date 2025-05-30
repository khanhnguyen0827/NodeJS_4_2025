import express from "express";
// Import express for creating the server and handling requests

import sequelize from "./src/common/sequelize/init.sequelize.js";
// Import sequelize for ORM support and database connection
import Roles from "./src/common/sequelize/model.sequelize.js";  



import initModels from "./src/models/init-models";
// Import Sequelize for ORM support

import pool from "./src/common/mysql2/init.mysql.js";
// Import pool for MySQL connection pooling 

import rootRouter from "./src/routers/root.router.js";
// Import rootRouter for handling routes





const app = express();

app.use(express.json());//Chuyển dạng json sang đối tượng js trên req.body

app.use("/", rootRouter);












  // Sử dụng sequelize.query() để thực hiện truy vấn    


  //database first dùngg sequelize-auto
  //sequelize-auto -h localhost -d db_cyber_community -u root -x 123456 -p 3307  --dialect mysql -o ./models -l esm -a ./additional.json

 




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
 * sequelize-auto: Dùng để tạo mô hình với cơ sở dữ liệu MySQL còn gọi Database First https://github.com/sequelize/sequelize-auto
 * extensionless: giúp import file mà ko cần thêm duôi js
 */