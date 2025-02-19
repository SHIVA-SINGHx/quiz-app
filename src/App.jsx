import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react"; // Back icon
import "./index.css";
import Header from "./components/Header";

const categories = [
  { name: "General Knowledge", apiName: "general_knowledge" },
  { name: "Music", apiName: "music" },
  { name: "Science", apiName: "science" },
  { name: "Technology", apiName: "technology" },
  { name: "Sports", apiName: "sport_and_leisure" },
  { name: "Politics", apiName: "politics" },
  { name: "Geography", apiName: "geography" },
  { name: "History", apiName: "history" },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || null
  );
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    parseInt(localStorage.getItem("currentQuestionIndex")) || 0
  );
  const [score, setScore] = useState(parseInt(localStorage.getItem("score")) || 0);
  const [loading, setLoading] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(
    parseInt(localStorage.getItem("correctAnswers")) || 0
  );
  const [incorrectAnswers, setIncorrectAnswers] = useState(
    parseInt(localStorage.getItem("incorrectAnswers")) || 0
  );

  // Fetch questions only if not already in localStorage
  useEffect(() => {
    if (selectedCategory && questions.length === 0) {
      fetchQuestions(selectedCategory);
    }
  }, [selectedCategory]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    localStorage.setItem("score", score);
    localStorage.setItem("correctAnswers", correctAnswers);
    localStorage.setItem("incorrectAnswers", incorrectAnswers);
    localStorage.setItem("questions", JSON.stringify(questions)); // Store questions
  }, [selectedCategory, currentQuestionIndex, score, correctAnswers, incorrectAnswers, questions]);

  const fetchQuestions = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://the-trivia-api.com/v2/questions?categories=${category}&limit=5`
      );
      setQuestions(response.data);
      localStorage.setItem("questions", JSON.stringify(response.data)); // Save to localStorage
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      if (answer === questions[currentQuestionIndex].correctAnswer) {
        setScore((prev) => prev + 1);
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setIncorrectAnswers((prev) => prev + 1);
      }

      setTimeout(() => {
        setSelectedAnswer(null);
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setQuizFinished(true);
        }
      }, 1500);
    }
  };

  const handleBackToHome = () => {
    localStorage.clear(); // Clear localStorage to reset progress
    setSelectedCategory(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuizFinished(false);
  };

  // Progress calculation (0% to 100%)
  const progressPercentage = questions.length > 1
    ? (currentQuestionIndex / (questions.length - 1)) * 100
    : 0;

  return (
    <> 
    {/* <Header/> */}
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!selectedCategory ? (
        <div>
          <h1 className="text-2xl font-bold mb-6">Select a Quiz Category</h1>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
              key={category.apiName}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600"
              onClick={() => setSelectedCategory(category.apiName)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      ) : loading ? (
        <p className="text-lg font-semibold">Loading questions...</p>
      ) : quizFinished ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Finished!</h2>
          <p className="text-lg">Your Score: {score}/{questions.length}</p>
          <p className="text-lg">Correct Answers: {correctAnswers}</p>
          <p className="text-lg">Incorrect Answers: {incorrectAnswers}</p>
          <button
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600"
            onClick={handleBackToHome}
            >
            Play Again
          </button>
        </div>
      ) : (
        <div className="text-center w-full max-w-lg relative">
          {/* Back Icon */}
          {/* <button
            className="absolute left-0 top-0 m-4 bg-gray-300 p-2 rounded-full shadow-md hover:bg-gray-400 transition duration-200"
            onClick={handleBackToHome}
            >
            <ArrowLeft size={24} />
            </button> */}

          {/* Progress Bar */}
          <p className="text-sm font-semibold mb-2">{`Progress: ${progressPercentage.toFixed(0)}%`}</p>
          <div className="w-full bg-gray-300 h-4 rounded-full mb-4 relative">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
              ></div>
          </div>

          {/* Question Counter */}
          <p className="text-lg font-semibold mb-2">{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>

          {/* Question Text */}
          <h2 className="text-xl font-bold mb-4">
            {questions[currentQuestionIndex]?.question?.text || "Loading..."}
          </h2>
          
          {/* Answer Options */}
          <div className="flex flex-col gap-2">
            {[...(questions[currentQuestionIndex]?.incorrectAnswers || []), questions[currentQuestionIndex]?.correctAnswer]
              .filter(Boolean)
              .sort(() => Math.random() - 0.5) // Shuffle answers
              .map((answer, index) => (
                <button
                key={index}
                className={`py-2 px-4 rounded-lg shadow-lg text-white transition-colors duration-300
                  ${selectedAnswer
                    ? answer === questions[currentQuestionIndex].correctAnswer
                    ? "bg-green-500"
                    : answer === selectedAnswer
                    ? "bg-red-500"
                    : "bg-blue-500"
                    : "bg-blue-500 hover:bg-blue-600"}`}
                    onClick={() => handleAnswer(answer)}
                    disabled={selectedAnswer !== null}
                    >
                  {answer}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
      </>
  );
}

export default App;
