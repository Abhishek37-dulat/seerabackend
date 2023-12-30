const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

/*
Mongoose Start 
 */

const Connection = require("./database/db.js");

/*
Mongoose End 
 */

/*
Routes Start 
 */

const userRegister = require("./route/UserRoute.js");
const productRoute = require("./route/ProductRoute.js");
/*
Routes End 
 */

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

Connection(MONGO_URL);

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/user", userRegister);
app.use("/product", productRoute);

app.listen(PORT, () => {
  console.log("listening to PORT: ", PORT);
});
