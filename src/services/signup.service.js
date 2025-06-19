import logger from "../utils/logger.js";
import User from "../models/user.model.js";

const signUpService = async ({ username, email, password }) => {
    try {
        const existing = await User.findOne({ email });

        if (existing) {
            logger.info(`User already exists`);
            return { status: 400, body: { message: 'User already exists' } };
        }

        const newUser = await User.create({ username, email, password });
        logger.info(`New User Created`, newUser);

        return {
            status: 201,
            body: {
                message: 'User created successfully',
                user: {
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                }
            }
        };
    } catch (err) {
        logger.error(`Signup error: `, err);
        return { status: 500, body: { error: `Error creating user` } };
    }
};

export default signUpService;
