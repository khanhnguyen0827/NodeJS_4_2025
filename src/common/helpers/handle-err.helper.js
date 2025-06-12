import { responseError } from "./response.helper.js";
import jwt from "jsonwebtoken";
import { statusCodes } from "./status-code.helper.js";

export const handleErr = 
       // Middleware 2
    (err,req, res, next)=>{
        if (err instanceof jwt.JsonWebTokenError) {
            console.log(`Middleware gôm lỗi: ${err}`);
            err.code = statusCodes.FORBIDDEN;
            err.message = "Token không hợp lệ";
            
            
        }
        console.log(`Middleware gôm lỗi: ${err}`);
        const resdata = responseError(err?.message, err?.code, err?.stack);
        res.status(resdata.statusCode).json( resdata);
        return; }
    ;