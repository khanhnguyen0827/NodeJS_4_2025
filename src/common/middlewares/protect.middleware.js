

/*************  ✨ Windsurf Command ⭐  *************/
import { UnauthorizedException } from "../helpers/exception.helper";
import tokenService from "../services/token.Service";
/*******  a335a838-9f28-42b0-9f47-00538143a4c6  *******/
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