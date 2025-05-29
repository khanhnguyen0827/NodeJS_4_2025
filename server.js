import express from "express";
// Import express for creating the server and handling requests

import mysql from 'mysql2/promise';
// Import mysql2/promise for async/await support

import { Sequelize, DataTypes } from 'sequelize';
import initModels from "./models/init-models";
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
  uri: 'mysql://root:081297@localhost:3307/db_cyber_community',});
// Tạo một pool kết nối đến cơ sở dữ liệu MySQL

// Kiểm tra kết nối đến cơ sở dữ liệu MySQL
  try {
  // For pool initialization, see above
    // Use pool.query() to execute a query kiểm tra kết nối
  await pool.query('SELECT 1');
    console.log("MySQL: Kết nối đến cơ sở dữ liệu MySQL thành công!");
} catch (err) {
  console.log(err, "MySQL2: Kết nối đến cơ sở dữ liệu MySQL khó tạo!");
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
const sequelize = new Sequelize( 'mysql://root:081297@localhost:3307/db_cyber_community', {
    logging: false, // Tắt logging để không hiển thị các truy vấn SQL trong console
});
// Kiểm tra kết nối
try {
    await sequelize.authenticate();
    console.log('sequelize: Kết nối đến cơ sở dữ liệu MySQL bằng Sequelize thành công!');    
} catch (error) {
    console.log(error, 'sequelize: Kết nối đến cơ sở dữ liệu MySQL bằng Sequelize khó tạo!');         
}

// Lấy dữ liệu từ bảng Roles bằng Sequelize
// code frist tạo model Roles
const Roles = sequelize.define('Roles', // Định nghĩa model Roles
    {
    // Tạo một model bằng Sequelize
    // Định nghĩa các trường dữ liệu trong bảng Roles
    id: {
      type: Sequelize.INTEGER,
      // Định nghĩa trường id là kiểu INTEGER
      primaryKey: true,
      // Đặt id là khóa chính
      // Tự động tăng giá trị id bằng cơ sở dữ liệu MySQL
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,//
        // Định nghĩa trường name là kiểu STRING
        
      allowNull: false,
        // Không cho phép trường name là null
    },
    description: {
      type: Sequelize.STRING,
      // Định nghĩa trường description là kiểu STRING
      allowNull: true,
      // Cho phép trường description là null
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      // Định nghĩa trường isActive là kiểu BOOLEAN
      allowNull: false,
      // Không cho phép trường isActive là null
      defaultValue: 0,
      // Đặt giá trị mặc định của trường isActive là true
    },
    deletedBy: {
      type: Sequelize.INTEGER,
      // Định nghĩa trường deletedBy là kiểu INTEGER
      allowNull: true,
      // Cho phép trường deletedBy là null
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      // Định nghĩa trường isDeleted là kiểu BOOLEAN
      allowNull: false,
      // Cho phép trường deletedAt là null
    },
    deletedAt: {
      type: "TIMESTAMP",
      // Định nghĩa trường deletedAt là kiểu TIMESTAMP
      allowNull: true,
      
    },
        // Đặt giá trị mặc định của trường deletedAt là thời gian hiện tại
    createdAt: {
      type: "TIMESTAMP",
      // Định nghĩa trường createdAt là kiểu TIMESTAMP
      allowNull: true,
      // Cho phép trường createdAt là null
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: "TIMESTAMP",
      // Định nghĩa trường updatedAt là kiểu TIMESTAMP
      allowNull: true,
      // Cho phép trường updatedAt là null
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },

  },
  {
    // Định nghĩa bảng Roles
    tableName: 'Roles',
    // Tên bảng trong cơ sở dữ liệu MySQL
    timestamps: false,// Tắt tính năng tự động tạo trường createdAt và updatedAt
    // Tắt tính năng tự động tạo trường createdAt và updatedAt
    // Cho phép trường createdAt và updatedAt
  } 
);

// Đồng bộ hóa mô hình với cơ sở dữ liệu MySQL
Roles.sync()
  // Sử dụng async/await để lấy dữ liệu từ cơ sở dữ liệu MySQL bằng Sequelize
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