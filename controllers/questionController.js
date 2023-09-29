import Question from "../models/questionModel.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.json(question);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createQuestion = async (req, res) => {
  // Create a new question instance
  const questionData = req.body;

  // Automatically set the 'time' field to the current date and time
  questionData.time = new Date();

  const question = new Question(questionData);

  try {
    const insertedQuestion = await question.save();
    res.status(201).json(insertedQuestion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteQuestionById = async (req, res) => {
  try {
    const deleteQuestion = await Question.deleteOne({_id: req.params.id})
    res.status(200).json(deleteQuestion)
  } catch (error) {
    console.log(error)
    req.status(500).json({ error: "Internal Server Error "})
  }
}

export const deleteExpiredQuestion = async () =>  {
  const fortyEightHoursAgo = new Date()
  fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48) // 48 hours means questions will expired after 48 hours (2 days)

  try {
    const deletedQuestions = await Question.deleteMany({
      time: { $lt: fortyEightHoursAgo.toISOString() }
    })

    console.log(`Deleted ${deletedQuestions.deletedCount} questions.`)
  } catch (error) {
    console.error("Error: ", error)
  }
}

// update questions every minute (delete the old one)
export const deleteQuestionsPeriodically = () => {
  // Call the deleteQuestion function initially
  deleteExpiredQuestion().then(() => {
    console.log("Old questions deleted.");
  });

  // Schedule the deleteQuestion function to run every minute (60000 milliseconds)
  setInterval(async () => {
    try {
      await deleteExpiredQuestion();
    } catch (error) {
      console.error("Error:", error);
    }
  }, 60000); // 60000 milliseconds = 1 minute
}
