import React from "react";
import { Routes, Route } from "react-router-dom"; 
import QuizPage from "./components/QuizPage";
import Header from "./components/Header";
import Home from "./components/Home";
import Upcoming from "./components/pages/Upcoming";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import "./index.css";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
    
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/quiz/:category" element={<QuizPage />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
    
  )
};

export default App;
