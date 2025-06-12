const checkPermission = (res, req, next) => {
    // Middleware kiểm tra quyền truy cập của người dùng
    // Có thể kiểm tra quyền truy cập dựa trên vai trò hoặc quyền của người dùng
    req.ischeckpermission = true; // Đặt một thuộc tính để xác định rằng middleware đã được thực thi
    console.log("Checking user permissions...");
    // Thực hiện kiểm tra quyền truy cập ở đây
    // Ví dụ: nếu người dùng có quyền truy cập, tiếp tục
    // Nếu không, có thể ném một lỗi hoặc trả về phản hồi lỗi
    // res.status(403).json({ message: "Forbidden" }); // Nếu không có quyền truy cập
    
    


next();
  // Middleware to check user permissions
}

export default checkPermission;