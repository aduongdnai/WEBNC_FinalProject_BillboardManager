import _ from "./config/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import adLocationRoute from './routes/adLocation.route.js'
import adBoardRoute from './routes/adBoard.route.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



try {
  await mongoose.connect(process.env.MONGO_URL,)
  console.log("Database connected...")
} catch (e) {
  console.log("Error connected database")
  console.log(e)
  process.exit(-1)
}

app.get('/', (req, res) => {

  res.json({
    msg: 'Connected Successfully'
  });
})
app.use('/api/v1/adlocations', adLocationRoute);
app.use('/api/v1/adboards', adBoardRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at http://127.0.0.1:${process.env.PORT}`);
})