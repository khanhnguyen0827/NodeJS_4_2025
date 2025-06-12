import chalk from "chalk";
import morgan from 'morgan'


const colorMethod = function (method) {

    if (method === 'POST') return chalk.green(method);
     if (method === 'GET')  return chalk.red(method);
     if (method === 'PUT')  return chalk.yellow(method);
     if (method === 'DELETE')   return chalk.blue(method);
    if (method === 'PATCH')   return chalk.magenta(method);
     else  return chalk.gray(method);
    
}

const colorCode = function (code) {
    if (code >= 500) return chalk.red(code);
    if (code >= 400) return chalk.yellow(code);
    if (code >= 300) return chalk.green(code);
    if (code >= 200) return chalk.blue(code);
    else return chalk.gray(code);
}



const logAPI =  morgan(function (tokens, req, res) {

  // Format the log message
  // Use the colorMethod and colorCode functions to colorize the method and status code
  req.ischeckPermission = true; // gắn một thuộc tính để xác định rằng middleware đã được thực thi
  // console.log("req.ischeckPermission", req.ischeckPermission);
  // Kiểm tra quyền truy cập của người dùng
  // Có thể kiểm tra quyền truy cập dựa trên vai trò hoặc quyền của người dùng
  // console.log("req.ischeckPermission", req.ischeckPermission);
  console.log("Checking user permissions...");

  req.ischeckprotect = true; // Đặt một thuộc tính để xác định rằng middleware đã được thực thi
  // console.log("req.ischeckprotect", req.ischeckprotect);
  // Kiểm tra quyền truy cập của người dùng
  // Có thể kiểm tra quyền truy cập dựa trên vai trò hoặc quyền của người dùng
  console.log("Checking user permissions..."); 

  const flap = [];
  if (req.ischeckPermission) {
    flap.push(chalk.red ("Permission"));
  }
  if (req.ischeckprotect) {
    flap.push(chalk.red("protect"));
  }
  console.log("flap", flap);

  const middlewareStatus = flap.length > 0 ? `(${flap.join('|')})` : ''; 

  // 
   
  return [
    chalk.gray(new Date().toLocaleDateString()),
    "\t",
    colorMethod( tokens.method(req, res)),
    colorCode(tokens.status(req, res)),
    tokens.url(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    middlewareStatus
  ].join(' ')
});


export default logAPI


