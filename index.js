import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import questionRouter from "./routes/questionRoute.js"
import { deleteQuestionsPeriodically } from "./controllers/questionController.js"
import dotenv from "dotenv"

dotenv.config()

let MYNAME = process.env.MYNAME
let PASSWORD = process.env.PASSWORD
let PORT = process.env.PORT

const app = express()
const dbUrl = `mongodb://${MYNAME}:${PASSWORD}@ac-oqojv27-shard-00-00.n4rfvez.mongodb.net:27017,ac-oqojv27-shard-00-01.n4rfvez.mongodb.net:27017,ac-oqojv27-shard-00-02.n4rfvez.mongodb.net:27017/?ssl=true&replicaSet=atlas-uyqp6a-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`

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