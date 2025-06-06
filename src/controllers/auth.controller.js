import authService from "../services/auth.sevice";


const authController = {

     register: async (req, res) => {
        const resutl = await authService.register(req,s);
        if (resutl.success) {
            res.status(201).json({ message: "User registered successfully" });
        } else {
            res.status(400).json({ error: resutl.error });
        }
    },
    login: (req, res) => {
        res.render("login", { layout: false });
    },
   
    logout: (req, res) => {
        res.render("logout", { layout: false });
    }
};

export default authController;