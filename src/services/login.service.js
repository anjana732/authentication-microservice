import logger from "../utils/logger.js";
import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.util.js";
import RefreshToken from "../models/refreshToken.model.js";

const loginService = async ({ email, password }) => {
    try {
        if (!email || !password) {
            logger.warn('Login attempt with missing credentials');
            return { status: 400, body: { message: 'Missing email or password.' } };
        }

        const user = await User.findOne({ email }); 
        if (!user) {
            logger.info(`Login failed: user not found`);
            return { status: 401, body: { message: 'Invalid credentials' } };
        }

        const isMatched = await user.matchPassword(password); 
        if (!isMatched) {
            logger.info(`Login failed: wrong password`);
            return { status: 401, body: { message: 'Invalid credentials' } };
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await RefreshToken.create({
            user: user._id,
            token: refreshToken,
            expiresAt: refreshTokenExpiry, 
        });

        logger.info(`Tokens generated and stored`);

        return {
            status: 200,
            body: {
                _id: user._id,
                username: user.username,
                email: user.email,
                accessToken,
                refreshToken
            }
        };

    } catch (err) {
        logger.error("Login error:", err);
        return { status: 500, body: { message: 'Server error during login.' } };
    }
};

export default loginService;
