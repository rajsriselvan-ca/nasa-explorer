import React from 'react';
import { HeaderProps } from '../types/headerProp_types';

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div className={`fixed top-0 left-0 w-full z-20 bg-black bg-opacity-80 backdrop-blur-sm ${className}`}> {/* Apply className */}
      <div className="flex items-center p-4">
        <img 
          src="/assets/images/nasa_logo.png" 
          alt="NASA Logo" 
          className="h-14 w-17"  
        />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent">
          NASA Explorer
        </h1>
      </div>
    </div>
  );
};

export default Header;