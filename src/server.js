import app from "./app.js";
import logger from "./utils/logger.js";
import connectDB from "./config/db.js";


const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, ()=>{
    logger.info(`Server is running on port : ${PORT}`)
})