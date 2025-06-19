import app from "./app.js";
import logger from "./utils/logger.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    logger.info("Connecting to MongoDB...");
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`Server is running on port: ${PORT}`);
    });
  } catch (err) {
    logger.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  logger.error("💥 Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error("💥 Uncaught Exception:", err);
  process.exit(1);
});
