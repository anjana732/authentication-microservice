import logger from "../utils/logger";
import User from "../models/user.model";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.util";
import RefreshToken from "../models/refreshToken.model";

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if (!email || !password) {
            logger.warn('Login attempt with missing email or password.');
            return res.status(400).json({ message: 'Please enter both email and password.' });
        }

        const user = User.findOne({email});
        if (!user) {
            logger.info(`Login failed: User with email '${email}' doesn't exist.`);
            return res.status(401).json({ message: 'Invalid credentials: User not found or password incorrect.' });
        }

        const isMatched = await user.matchPassword(password);

        if(!isMatched){
            logger.info(`Login failed: Invalid password for user '${user.username}'.`);
            return res.status(401).json({ message: 'Invalid credentials: User not found or password incorrect.' });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        const refreshTokenExpiry = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))
        
        await RefreshToken.create({
            user: user._id,
            token: refreshToken,
            exipresAt: refreshTokenExpiry
        })

        logger.info(`New refresh token stored for user: ${user.username} (ID: ${user._id})`);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: refreshToken,
            path: '/',
        })

        logger.info(`Refresh token cookie set for user: ${user.username}`);

         res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            accessToken: accessToken,
        });

        logger.info(`User '${user.username}' logged in successfully.`);

    }catch(err){
        logger.error(`Error during login process: ${err.message}`, err.stack);
        res.status(500).json({ message: 'Server error during login. Please try again later.' });
    }
}

export default login;
