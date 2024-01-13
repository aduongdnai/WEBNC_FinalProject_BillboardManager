import mongoose from "mongoose";
const { Schema } = mongoose;

import _ from "../config/config.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "Your username is required",
    },
    email: {
      type: String,
      required: "Your email is required",
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: "Your password is required",
    },
    newPassword: String,
    role: String,
    district: String,
    ward: String, 
    rfToken:String
  },
  { timestamps: true }
);



export default mongoose.model("Users", UserSchema);
