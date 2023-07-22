import express from "express";
import cookieParser from "cookie-parser";
import Store from "./data/Databse.js";
import userrouter from "./routes/user.js";
import { config } from "dotenv"
import TaskRouter from "./routes/task.js";
config({
     path: "./data/config.env"
})
const app = express();
Store()

app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/user', userrouter)
app.use('/api/v1/task', TaskRouter)

const port = process.env.PORT;
app.listen(port, (req, res) => {
     console.log(`The app is woking on http://localhost:${port}`)
})
app.get('/', (req, res) => {
     res.json({
          name: "ReactJs",
          version: 12.4
     })
})
