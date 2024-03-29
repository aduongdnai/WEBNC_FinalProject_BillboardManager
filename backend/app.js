import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import adLocationRoute from "./routes/adLocation.route.js";
import adBoardRoute from "./routes/adBoard.route.js";
import reportRoute from "./routes/report.route.js";
import userRoute from "./routes/user.route.js";
import advertisingLicenseRequestRoute from "./routes/advertisingLicenseRequest.route.js";

import cookieParser from "cookie-parser";
import { Server as SocketIO } from "socket.io";
import { createServer } from "http";
import authRoute from "./routes/authen.route.js";

import reportTypeRoute from "./routes/reportType.route.js";
import districtRoute from "./routes/district.route.js";
import wardRoute from "./routes/ward.route.js";
import advertisingTypeRoute from "./routes/advertisingType.route.js";

import logRoute from "./routes/log.route.js";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import swaggerOption from './docs/swaggerOption.js'
import adLocationEditRequestRoute from "./routes/adLocationEditRequest.route.js";
import adBoardEditRequestRoute from "./routes/adBoardEditRequest.route.js";

const server = express();
const swaggerDocs = swaggerJSDoc(swaggerOption);
server.use(cors());
server.use(express.json());
server.disable("x-powered-by");
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
server.use("/public", express.static("public"));
server.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));

// Routes
server.use("/api/v1/auth", authRoute);
server.use("/api/v1/adlocations", adLocationRoute);
server.use("/api/v1/adboards", adBoardRoute);
server.use("/api/v1/report", reportRoute);
server.use("/api/v1/advertisingLicenseRequest", advertisingLicenseRequestRoute);

server.use("/api/v1/adLocationEditRequest", adLocationEditRequestRoute);
server.use("/api/v1/adBoardEditRequest", adBoardEditRequestRoute);

server.use("/api/v1/users", userRoute);
server.use("/api/v1/reportTypes", reportTypeRoute);
server.use("/api/v1/district", districtRoute);
server.use("/api/v1/ward", wardRoute);
server.use("/api/v1/advertisingType", advertisingTypeRoute);

server.use("/api/v1/logs", logRoute);

const httpServer = createServer(server);
const io = new SocketIO(httpServer, {
  cors: {
    origin: "*", // Adjust the allowed origin(s) accordingly
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const connectedClients = new Set();
const connectedCitizens = new Set();
io.on("connection", (socket) => {
  console.log("Client connected");

  // Handle authentication
  socket.on("authenticate", (token) => {
    // Simulate authentication logic or replace it with your actual authentication process
    if (token === "CLIENT") {
      console.log("Client authenticated");
      if (!connectedClients.has(socket.id)) {
        connectedClients.add(socket.id);
      }
    } else if (token === "CITIZEN") {
      console.log("Citizen authenticated");
      if (!connectedCitizens.has(socket.id)) {
        connectedCitizens.add(socket.id);
      }
    } else {
      console.log("Authentication failed");
      socket.disconnect(true);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

global.io = io;
global.connectedClients = connectedClients;
global.connectedCitizens = connectedCitizens;

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is listening at http://127.0.0.1:${process.env.PORT}`);
});
