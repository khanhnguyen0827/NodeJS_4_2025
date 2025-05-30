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





  // Sử dụng sequelize.query() để thực hiện truy vấn    


  //database first dùngg sequelize-auto
  //sequelize-auto -h localhost -d db_cyber_community -u root -x 123456 -p 3307  --dialect mysql -o ./models -l esm -a ./additional.json

 
const models = initModels(sequelize);

//sư dụng orm để thực hiện truy vấn
app.get("/sequelize", async (req, res,next) => {
    // Lấy dữ liệu từ bảng Roles bằng Sequelize
    const listRoles1 = await Roles.findAll();
    const listRoles2 = await models.Roles.findAll();
    const result = {
      "model tự tạo sử dụng sequelize": listRoles1, 
      "model tự tạo sử dụng sequelize-auto": listRoles2,
    }
    res.json(result);
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
 * sequelize-auto: Dùng để tạo mô hình với cơ sở dữ liệu MySQL còn gọi Database First https://github.com/sequelize/sequelize-auto
 * extensionless: giúp import file mà ko cần thêm duôi js
 */