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
   
  return [
    chalk.gray(new Date().toLocaleDateString()),
    "\t",
    colorMethod( tokens.method(req, res)),
    colorCode(tokens.status(req, res)),
    tokens.url(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
});


export default logAPI


