import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "../config/config.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "Your username is required",
      max: 25,
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
      select: false,
      max: 25,
    },
    role: { type: Number, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});
UserSchema.methods.generateAccessJWT = function () {
  let payload = {
    id: this._id,
  };
  return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: "20m",
  });
};

export default mongoose.model("Users", UserSchema);
