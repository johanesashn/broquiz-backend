import mongoose from "mongoose";

const User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: String, 
        required: true
    }, 
    points: {
        type: Number,
        required: true
    },
    age: {
        type: Number, 
        required: true
    },
})

export default mongoose.model("User", User)