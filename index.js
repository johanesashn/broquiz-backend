import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import questionRouter from "./routes/questionRoute.js"
import { deleteQuestionsPeriodically } from "./controllers/questionController.js"
import dotenv from "dotenv"

dotenv.config()

const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const PORT = process.env.PORT

const app = express()
const dbUrl = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ro3v8ye.mongodb.net/?retryWrites=true&w=majority`
const connectionParam = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}

mongoose
    .connect(dbUrl, connectionParam)
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(e => {
        console.log("Error " + e)
    })

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(questionRouter)

// delete question every minute
deleteQuestionsPeriodically();
  
app.listen(PORT, () => {
    console.log("Server up and running")
})