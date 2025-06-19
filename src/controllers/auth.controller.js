import signUpService from "../services/signup.service.js";
import loginService from "../services/login.service.js";

const signup = async (req, res) => {
    try {
        const response = await signup(req.body); 
        return res.status(response.status).json(response.body);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const response = await login(req.body);
        return res.status(response.status).json(response.body);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default {
    signup,
    login
};
