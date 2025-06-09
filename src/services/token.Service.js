import jwt from 'jsonwebtoken';
import {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN} from "../common/constant/app.constant.js";

const tokenService = {
    createTokens: (userID) => {
        const accessToken = jwt.sign({userID: userID}, ACCESS_TOKEN_SECRET,{expiresIn: ACCESS_TOKEN_EXPIRES_IN});
        //tao token
        //payload : nguoi dung
        //secretOrPrivateKey: ma hoa
        //expiresIn: thoi gian het han
        console.log(accessToken);

        jwt.decode(accessToken);//giai ma

        

        return {
            accessToken: accessToken,
            refreshToken: '123456789'
        };
    },

    verifyAccessToken: (token) => {
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET);//giai ma
        //tự throw lỗi
        //jwt.decode(accessToken);//giai ma
        
    }


};




export default tokenService;