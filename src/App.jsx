import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Homee';
import Quiz from './Quiz';
import Result from './Result';
import Footer from './Footerr';
import Header from './Header';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/result/:id" element={<Result />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;