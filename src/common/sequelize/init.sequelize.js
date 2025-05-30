import { Sequelize, DataTypes } from 'sequelize';


// Kết nối đến cơ sở dữ liệu MySQL bằng Sequelize
const sequelize = new Sequelize( 'mysql://root:123456@localhost:3307/db_cyber_community', {
    logging: false, // Tắt logging để không hiển thị các truy vấn SQL trong console
});
// Kiểm tra kết nối
try {
    await sequelize.authenticate();
    console.log('sequelize: Kết nối đến cơ sở dữ liệu MySQL bằng Sequelize thành công!');    
} catch (error) {
    console.log(error, 'sequelize: Kết nối đến cơ sở dữ liệu MySQL bằng Sequelize khó tạo!');         
}

// Export the sequelize instance for use in other modules
export default sequelize;