import logger from "../utils/logger";
import User from "../models/user.model";

const signUpService = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const existing = await User.findOne({email});

        if(existing){
            logger.info(`User already Exist`);
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = await User.create({username, email, password})
        logger.info(`New User Created`, newUser);
        return res.status(201).json({message: 'User created successfully', user: newUser})

    }catch(err){
        logger.error(`Signup error: `, err);
        return res.status(500).json({error: `error creating user`})
    }
}

export default signUpService;