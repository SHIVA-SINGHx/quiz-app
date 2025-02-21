import React from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/quiz-bg.jpg"; 



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

const Home = () => {
  const navigate = useNavigate();

  return (
   <>
      <div
      
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${assets})` }} 
    >
      <h1 className="text-3xl font-bold text-white mb-6">Select a Quiz Category</h1>
      <div className="grid grid-cols-2 gap-4">
        {categories.map(({ name, apiName }) => (
          <button
            key={apiName}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
            onClick={() => navigate(`/quiz/${apiName}`)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
        </> 
  );
};

export default Home;
