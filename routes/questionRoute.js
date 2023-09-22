import express from "express";
import { getQuestionById, createQuestion, getQuestions, deleteQuestionById } from "../controllers/questionController.js"

const router = express.Router()

router.get("/question", getQuestions)
router.get("/question/:id", getQuestionById)
router.post("/question", createQuestion)
router.delete("/question/:id", deleteQuestionById)

export default router