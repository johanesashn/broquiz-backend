import mongoose from "mongoose"

const QuestionSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    questions: [
        {
            id: String,
            question: String,
            choices: [String],
            correct_answer: String,
            selected: String,
            checked: Boolean,
            result: Boolean
        }
    ],
    owner: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

export default mongoose.model("Question", QuestionSchema)
