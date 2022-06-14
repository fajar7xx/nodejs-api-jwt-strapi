import "dotenv/config";
import mongoose from "mongoose";

const mongoDbServer = {
  host: process.env.MONGO_HOST || "127.0.0.1",
  port: process.env.MONGO_POST || 27017,
  database: process.env.MONGO_DATABASE || "ecommerce_strapi",
};

const db = mongoose
  .connect(
    `mongodb://${mongoDbServer.host}:${mongoDbServer.port}/${mongoDbServer.database}`
  )
  .then(() => console.info("Database connection success"))
  .catch((err) => {
    console.error(err);
  });

export default db;
