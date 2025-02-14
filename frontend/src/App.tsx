import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import "tailwindcss/tailwind.css";
import SpaceBackground from './ui-components/spaceBackground';
import CurvedMenu from './ui-components/curvedMenu';
import Header from './ui-components/header';

import APOD from './components/apod';
import MarsRover from './components/marsRover';
import EPIC from './components/epic';
import NeoWs from './components/neows';
import ImageLibrary from './components/imageLibrary';


const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <Router>
      <div className="min-h-screen relative">
        <SpaceBackground />
        <CurvedMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <Header />
        <div className={`relative z-10 pt-24 p-8 transition-all duration-300 ${isMenuOpen ? 'blur-sm' : ''}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/apod" />} />
            <Route path="/apod" element={<APOD />} />
            <Route path="/mars-rover" element={<MarsRover />} />
            <Route path="/epic" element={<EPIC />} />
            <Route path="/neows" element={<NeoWs />} />
            <Route path="/image-library" element={<ImageLibrary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;