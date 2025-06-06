import prisma from "../common/prisma/init.prisma";
import { BadrequestException } from "../common/helpers/exception.helper";
import bcrypt from "bcrypt";
// import { statusCodes } from "../common/helpers/status-code.helper";  

const authService = {
    // Logic for user login
    // For example, check credentials and set isAuthenticated to true
   
  register: async (req) => {

    const { fullName, password, email } = req.body;

    //Tìm kiếm người dùng theo email có trong cơ sở dữ liệu
    const userexist = await prisma.users.findUnique({
      where: {
        email: email,
      },
    }) 
    // Kiểm tra xem người dùng đã tồn tại hay chưa
    // Nếu người dùng đã tồn tại, trả về thông báo lỗi  
    if (userexist) {
      throw new BadrequestException(`Email đã được đăng ký`);
      // Nếu người dùng đã tồn tại, ném ra lỗi BadrequestException
      // Nếu người dùng đã tồn tại, trả về thông báo lỗi
}

//mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
//dúng bcrypt để mã hóa mật khẩu

    // const hashedPassword = await bcrypt.hash(password, 10);
   const hashedPassword = bcrypt.hashSync(password, 10);

    // Tạo người dùng trong cơ sở dữ liệu
    const usernew = await prisma.users.create({
      data: {
        fullName: fullName,
        password: hashedPassword,
        email: email,
      },
    });
    console.log(usernew);

    //usernew.password = undefined; // Ẩn mật khẩu trong kết quả trả về
    delete usernew.password; // Xóa mật khẩu khỏi đối tượng người dùng
   
    return usernew;
  } 
  }

  export default authService