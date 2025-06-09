import prisma from "../common/prisma/init.prisma";
import { BadrequestException } from "../common/helpers/exception.helper";
import bcrypt from "bcrypt";
import tokenService from "./token.Service";
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
  } ,
   login: async (req) => {
    const { email, password } = req.body;
    // Tìm kiếm người dùng theo email
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    // Kiểm tra xem người dùng có tồn tại hay không
    if (!user) {
      throw new BadrequestException(`Email không tồn tại`);
    }

    // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    
    if (!isPasswordValid) {
      throw new BadrequestException(`Mật khẩu không đúng`);
    }
    // Nếu đăng nhập thành công, trả về thông tin người dùng
    // Xóa mật khẩu khỏi đối tượng người dùng để không trả về mật khẩu
    delete user.password; // Xóa mật khẩu khỏi đối tượng người dùng
    // Trả về thông tin người dùng đã đăng nhập

    // token của người dùng  có thể được tạo ra ở đây nếu cần acss token || refresh token
    const tokens = tokenService.createTokens(user.id);
    //

    return tokens;    
  },

  getInfo: async (req) => {
    return `getInfo`;
  },
  logout: async (req) => {
    // Xử lý đăng xuất người dùng

    // Trong trường hợp này, không có logic cụ thể cho đăng xuất
    // Bạn có thể xóa token hoặc thực hiện các hành động khác nếu cần

    return { message: "Đăng xuất thành công" };
  },


}
  export default authService