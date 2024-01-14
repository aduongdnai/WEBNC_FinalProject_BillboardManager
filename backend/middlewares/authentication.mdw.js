import jwt from "jsonwebtoken";
import _ from "../config/config.js";
import userModel from "../models/user.model.js";

async function isAuthenticated(req, res, next) {
    try {
        //console.log(req.headers);
        let token = req.get("Authorization");
        if (!token) {
            return res.status(404).json({ success: false, msg: "Token not found" });
        }
        token = token.split(" ")[1];
        //console.log(token);
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
        req.username = decoded.username;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.log(error);

            let rfTokenClient = req.get("rftoken");
            try {
                const decoded = jwt.verify(rfTokenClient, process.env.SECRET_REFRESH_KEY)
                //Get token from db

                const userData = await userModel.findOne({ email: decoded.email })

                const rfTokenServer = userData.rfToken;

                if (!rfTokenServer) return res.status(401).json({ success: false, msg: error.message })
                var ac_token;



                if (rfTokenClient === rfTokenServer) {

                    ac_token = jwt.sign({ email: decoded.email, password: decoded.password }, process.env.SECRET_ACCESS_KEY, { expiresIn: '1m' });
                    req.token = ac_token
                    next();
                } else return res.status(401).json({ success: false, msg: "Invalid Token" })

            } catch (err) {
                return res.status(401).json({ success: false, msg: "Invalid Refresh Token" })
            }
        } else
            return res.status(401).json({ success: false, msg: error.message });

    }
}

export { isAuthenticated }