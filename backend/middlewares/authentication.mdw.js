import  jwt  from "jsonwebtoken";
import _ from "../config/config.js";
function isAuthenticated(req, res, next) {
    try {
     let token = req.get("authorization");
     console.log(token);
     if (!token){
      return res.status(404).json({ success: false, msg: "Token not found" });
     }
    token = token.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
    req.username = decoded.username;
    next();
   } catch (error) {
   return res.status(401).json({ success: false, msg: error.message });
   // console.error(error);
    }
}

export  {isAuthenticated}