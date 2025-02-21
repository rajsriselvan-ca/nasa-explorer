import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "tailwindcss/tailwind.css";
import SpaceBackground from './ui-components/spaceBackground';
import CurvedMenu from './ui-components/curvedMenu';
import Header from './ui-components/header';
import APOD from './components/apod';
import MarsRover from './components/marsRover';
import EPIC from './components/epic';
import Charts from './components/charts';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen relative">
        <SpaceBackground className="fixed inset-0 w-full h-full z-0" />
        <CurvedMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <Header className="fixed top-0 left-0 right-0 z-20" />
        <div className={`relative z-10 top-10 pt-20 p-4   md:p-8 transition-all duration-300 ${isMenuOpen ? 'blur-sm' : ''}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/apod" />} />
            <Route path="/apod" element={<div className="lg:pt-5"><APOD /></div>} />
            <Route path="/mars-rover" element={<MarsRover />} />
            <Route path="/epic" element={<div className="lg:pt-20"><EPIC /></div>} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;