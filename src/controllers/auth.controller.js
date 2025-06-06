import authService from "../services/auth.sevice";
import { responseSeccess } from "../common/helpers/response.helper";


const authController = {

     register: async (req, res) => {
        const resutl = await authService.register(req);
       const resData = responseSeccess(resutl, "Register successful", 200, "Success");
        res.status(resData.statusCode).json(resData);
    }
};

export default authController;