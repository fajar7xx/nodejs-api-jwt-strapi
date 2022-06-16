import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import db from "./utils/db.js";

const app = express();
const PORT = process.env.APP_PORT || 5000;

// app.use(express.json());
// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlEncodedParser = bodyParser.urlencoded({
  extended: true,
});

app.use(jsonParser);
app.use(urlEncodedParser);

// routing files
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";

app.get("/api/test", () => {
  console.info("test is successfull");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.listen(PORT, () => {
  console.log(`Service running on http://localhost:${PORT}`);
});
