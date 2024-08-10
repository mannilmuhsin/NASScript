import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Authentication middleware function
const auth = async (req, res, next) => {

  
  try {
    
    // console.log(user);
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;