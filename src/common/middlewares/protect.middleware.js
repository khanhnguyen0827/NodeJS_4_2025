

import { UnauthorizedException } from "../helpers/exception.helper";
import tokenService from "../../services/token.Service.js";
/**
 * Middleware to protect routes by checking for a valid JWT token in the request header.
 * If the token is missing or invalid, it throws an UnauthorizedException.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function protect(req, res, next) {
    //kiêm tra token trong request header
    const authHeader = req.headers?.authorization || "";
    const [type, token] = authHeader.split(" ");
    //Bearer+ ' ' + token
    //kiêm tra token trong request header
    if (!token) {
        throw new UnauthorizedException("Vui long dang nhap");
    }
    //kiểm tra token trong request header
    if (type !== "Bearer") {
        throw new UnauthorizedException("Token khong hop le");
    }

    //kiem tra token có hợp le hay khong
    const payload = tokenService.verifyAccessToken(token);



    console.log({
        authHeader,
        type,
        token,
        payload
    });

    //bearer+ ' ' + token
    //key + token
    next();
}

export default protect;