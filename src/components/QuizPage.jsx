import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [incorrectScore, setIncorrectScore] = useState(0);

  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://the-trivia-api.com/v2/questions?categories=${category}&limit=5`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  const handleAnswer = (answer) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      
      if (answer === questions[currentQuestionIndex]?.correctAnswer) {
        setScore(score + 1); // Increase correct score point?
      } else {
        setIncorrectScore(incorrectScore + 1); // ✅ Increase incorrect score point?
      }
  
      setTimeout(() => {
        setSelectedAnswer(null);
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setQuizFinished(true);
        }
      }, 1500);
    }
  };

  return (
  
   <>

   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {loading ? (
        <p className="text-lg font-semibold">Loading questions...</p>
      ) : quizFinished ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Finished!</h2>
          <p className="text-lg">Your Score: {score}/{questions.length}</p>
          <p className="text-lg">Incorrect: {incorrectScore}/{questions.length}</p>
          <button
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600"
            onClick={() => navigate("/")}
            >
            Play Again
          </button>
        </div>
      ) : (
        <div className="text-center w-full max-w-lg">
          <p className="text-lg font-semibold mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <h2 className="text-xl font-bold mb-4">
            {questions[currentQuestionIndex]?.question?.text || "Loading..."}
          </h2>

          <div className="flex flex-col gap-2">
            {[...(questions[currentQuestionIndex]?.incorrectAnswers || []), questions[currentQuestionIndex]?.correctAnswer]
              .filter(Boolean)
              .sort(() => Math.random() - 0.5) // Shuffle answers from here?
              .map((answer, index) => (
                <button
                key={index}
                className={`py-2 px-4 rounded-lg shadow-lg text-white transition-colors duration-300
                  ${selectedAnswer
                    ? answer === questions[currentQuestionIndex]?.correctAnswer
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
};

export default QuizPage;
