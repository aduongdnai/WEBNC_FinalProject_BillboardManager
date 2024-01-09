// import express from "express";
// import {  Register } from "../controller/auth.js";
// import Validate from "../middlewares/validate.mdw.js";
// import { check } from "express-validator";
// import {Login} from "../controller/auth.js"
// import { Logout } from "../controller/auth.js";


// const router = express.Router();

// // Register route -- POST request
// router.post(
//     "/register",
//     check("email")
//         .isEmail()
//         .withMessage("Enter a valid email address")
//         .normalizeEmail(),
//     check("username")
//         .not()
//         .isEmpty()
//         .withMessage("You username is required")
//         .trim()
//         .escape(),
//     check("role")
//         .notEmpty()
//         .withMessage("Enter a valid role address"),
//     check("password")
//         .notEmpty()
//         .isLength({ min: 8 })
//         .withMessage("Must be at least 8 chars long"),
//     Validate,
//     Register
// );
// router.post(
//     "/login",
//     check("email")
//         .isEmail()
//         .withMessage("Enter a valid email address")
//         .normalizeEmail(),
//     check("password").not().isEmpty(),
//     Validate,
//     Login
// );
// router.get('/logout', Logout);

// export default router;
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from "../config/config.js";
import userModel from '../models/user.model.js';
const router = express.Router();

var token;

router.post('/login', async (req, res) => {
    try{
        const {email,password}=req.body
        //checkUsername
       const dbUser = await userModel.find({email: email})

        if (!dbUser) {
            return res.status(400).json({ error: 'Account does not exist' });
        }
       
        const isMatchPassword= await bcrypt.compare(password,dbUser[0].password)
        //console.log(isMatchPassword);
        if(isMatchPassword){
            token = jwt.sign({ email: email, password: password }, process.env.SECRET_ACCESS_KEY, { expiresIn: '1m' } );
            
            var rfToken = jwt.sign({ email: email, password: password }, process.env.SECRET_REFRESH_KEY);
            //save rftoken
            var result = await userModel.updateOne({ email: email }, { $set: { rfToken: rfToken } });

            // Get the updated document
            var userData = await userModel.findOne({ email: email });

            // Access the current value of the updated field
            //var currentRfToken = updatedDocument.rfToken;
            
            return res.status(200).json({ 
                success: true,
                token,
                rfToken,
                userData
            });
            
        } else {
          // Passwords do not match, authentication failed
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    }catch(error){
        console.error('Error Login:', error);
        return res.status(500).json({ error: 'Internal Server Error' }); 
    }
    
});
router.get('/logout', async (req, res) => {
    try {
        // Get the user's email from the request
        const { email } = req.body;

        // Revoke the rfToken by setting it to null
        await userModel.updateOne({ email: email }, { $set: { rfToken: null } });

        return res.status(200).json({
            success: true,
            msg: "logout success"
        });
    } catch (error) {
        console.error('Error Logout:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

});
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, role, district, ward } = req.body;

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword,
            role: role,
            district: district,
            ward: ward
        });

        // Save the new user document to the database
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
export const accessToken = token;
export default router;
