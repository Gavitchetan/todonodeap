import { User } from '../models/model.js';
import bcrypt from 'bcrypt';
import { sendCookies } from '../utils/info.js';

export const Newuser = async (req, res) => {
     const { email, password, name, gender } = req.body;
     try {
          const user = await User.findOne({ email });
          if (user) {
               return res.status(404).json({
                    message: 'User already exists',
                    success: false,
               });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await User.create({ name, email, password: hashedPassword });
          sendCookies(res, newUser, 'Account created successfully', 201);
     } catch (error) {
          console.error(error);
          res.status(500).json({
               message: 'Internal server error',
               success: false,
          });
     }
};
export const login = async (req, res) => {
     const { email, password } = req.body;
     try {

          const user = await User.findOne({ email }).select("+password")
          if (!user) {
               return res.status(404).
                    json({
                         message: 'Invalid email and password'
                         , succsec: false
                    })
          }

          const ismatch = await bcrypt.compare(password, user.password)
          if (!ismatch) {
               return res.status(401).json({
                    message: 'Invalid password',
                    success: false,
               });
          }
          sendCookies(res, user, "working", 200)
     } catch (error) {
          console.error(error);
          res.json({
               message: "Internal error",
               success: false,
          })

     }

}

export const getMyprofile = (req, res) => {

     // const myId = "myId";


     res.status(200).json({
          success: true,
          user: req.user
     })
};

export const Logout = (req, res) => {
     res.status(200).cookie("token", "", {
          expires: new Date(Date.now()),
          sameSite: process.env.NODE_ENV === "Devlopment" ? 'lax' : "none",
          secure: process.env.NODE_ENV === "Devlopment" ? false : true,

     }).json({
          success: true,
          
     })
};

