import jwt from "jsonwebtoken";
import _ from "../config/config.js";
import userModel from "../models/user.model.js";

async function isAuthenticated(req, res, next) {
    try {
        let token = req.get("Authorization");
        if (!token) {
            return res.status(404).json({ success: false, msg: "Token not found" });
        }
        token = token.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
        req.username = decoded.username;
        next();
    } catch (error) {
        if (error) {

            
            let rfTokenClient = req.get("rfToken");
           try{
            const decoded = jwt.verify(rfTokenClient, process.env.SECRET_REFRESH_KEY)
            
            //Get token from db
            const rfTokenServer = await userModel.getRfToken(decoded.username)
            if (!rfTokenServer) return res.status(401).json({ success: false, msg: error.message })
            var ac_token;
            
            if (rfTokenClient === rfTokenServer.rf_token) {
                
                ac_token = jwt.sign({ username: decoded.username, password: decoded.password }, process.env.SECRET_ACCESS_KEY, { expiresIn: '1m' });
                req.token = ac_token
                next();
            }else return res.status(401).json({ success: false, msg: "Invalid Token" })
            
           } catch(err) {
            return res.status(401).json({ success: false, msg: "Invalid Refresh Token" })
           }
        } else
            return res.status(401).json({ success: false, msg: error.message });

    }
}

export { isAuthenticated }