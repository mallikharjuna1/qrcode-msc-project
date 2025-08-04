const axios = require("axios");
const Feedback = require("../models/Feedback");

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment";
const API_KEY = process.env.HUGGINGFACE_API_KEY;

const labelMap = {
  LABEL_0: "NEGATIVE",
  LABEL_1: "NEUTRAL",
  LABEL_2: "POSITIVE",
};

const analyzeSentiment = async (text) => {
  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: text },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const scores = response.data[0];
    const top = scores.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));

    return labelMap[top.label] || "UNKNOWN"
  } catch (error) {
    console.error("Sentiment analysis failed:", error.message);
    return "UNKNOWN";
  }
};

const processFlaggedFeedbacks = async () => {
  try {

    const flaggedFeedbacks = await Feedback.find();

    for (const feedback of flaggedFeedbacks) {
      if (feedback.sentiment) continue;

      const sentiment = await analyzeSentiment(feedback.comment);
    
      feedback.sentiment = sentiment;
      await feedback.save();
    }
  } catch (err) {
    console.error("Error processing feedbacks:", err);
  }
};

module.exports = processFlaggedFeedbacks;
