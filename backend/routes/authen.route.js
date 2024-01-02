import express from "express";
import { Register } from "../controller/auth.js";
import Validate from "../middlewares/validate.mdw.js";
import { check } from "express-validator";
import {Login} from "../controller/auth.js"
import { Logout } from "../controller/auth.js";
const router = express.Router();

// Register route -- POST request
router.post(
    "/register",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("username")
        .not()
        .isEmpty()
        .withMessage("You username is required")
        .trim()
        .escape(),
    check("role")
        .notEmpty()
        .withMessage("Enter a valid role address"),
    check("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Must be at least 8 chars long"),
    Validate,
    Register
);
router.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    Login
);
router.get('/logout', Logout);

export default router;