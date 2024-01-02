import _ from "./config/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import adLocationRoute from "./routes/adLocation.route.js";
import adBoardRoute from "./routes/adBoard.route.js";
import App from "./routes/LoginSignup.route.js";
import cookieParser from "cookie-parser";

const server = express();

server.use(cors());
server.use(express.json());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(morgan("dev"));

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected...");
} catch (e) {
  console.log("Error connected database");
  console.log(e);
  process.exit(-1);
}

server.get("/", (req, res) => {
  res.json({
    msg: "Connected Successfully",
  });
});



// Routes
server.use("/api/v1/adlocations", adLocationRoute);
server.use("/api/v1/adboards", adBoardRoute);
server.use(App);


server.listen(process.env.PORT, () => {
  console.log(`Server is listening at http://127.0.0.1:${process.env.PORT}`);
});