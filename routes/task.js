import express from "express";
import { newTask, getMyTask, updatemy, deleteMy, } from "../controllers/taskroutes.js";
import { Isothentication } from "../middlewares/auth.js";

const router = express.Router();

router.post('/newt', Isothentication, newTask);
router.get('/mt', Isothentication, getMyTask);
router.route('/:id').put(Isothentication, updatemy).delete(Isothentication, deleteMy)

export default router