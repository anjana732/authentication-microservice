import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        logger.info(`MongoDb connected : ${conn.connection.host}`);
    }catch(error){
        logger.error(`MongoDb connection error: ${error.message}`, {stack: error.stack});
        process.exit(1);
    }
}

export default connectDB