import { getMyprofile, login, Newuser, Logout } from "../controllers/Usertoute.js";

import exp from "express";
import { Isothentication } from "../middlewares/auth.js";
const router = exp.Router();

router.post('/new', Newuser);
router.post('/login', login);
router.get('/me', Isothentication, getMyprofile);
router.get('/logme', Logout);



export default router;



