import { User } from "../models/model.js";
import Jwt from "jsonwebtoken";

export const Isothentication = async (req, res, next) => {

     const { token } = req.cookies;
     if (!token) return res.status(401).json({
          message: 'Login first',
          success: false,
     })

     const decoded = Jwt.verify(token, process.env.secret);
     req.user = await User.findById(decoded._id)
     next();
}