import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import adLocationRoute from "./routes/adLocation.route.js";
import adBoardRoute from "./routes/adBoard.route.js";
import reportRoute from "./routes/report.route.js";
import editRequestRoutes from "./routes/editRequest.route.js";
import userRoute from "./routes/user.route.js";
import advertisingLicenseRequestRoute from "./routes/advertisingLicenseRequest.route.js";
//import App from "./routes/LoginSignup.route.js";
import cookieParser from "cookie-parser";
import { Server as SocketIO } from "socket.io";
import { createServer } from "http";
import authRoute from "./routes/authen.route.js"


const server = express();

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

// Routes
server.use('/api/v1/auth', authRoute);
server.use("/api/v1/adlocations", adLocationRoute);
server.use("/api/v1/adboards", adBoardRoute);
server.use("/api/v1/report", reportRoute);
server.use("/api/v1/advertisingLicenseRequest", advertisingLicenseRequestRoute);
server.use("/api/v1/editrequests", editRequestRoutes);
server.use("/api/v1/users", userRoute);

//server.use(App);

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
io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle authentication
  socket.on('authenticate', (token) => {
    // Simulate authentication logic or replace it with your actual authentication process
    if (token === 'CLIENT') {
      console.log('Client authenticated');
      if (!connectedClients.has(socket.id)) {
        connectedClients.add(socket.id);
      }
    }
    else if (token === 'CITIZEN') {
      console.log('Citizen authenticated');
      if (!connectedCitizens.has(socket.id)) {
        connectedCitizens.add(socket.id);
      }
    } else {
      console.log('Authentication failed');
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
