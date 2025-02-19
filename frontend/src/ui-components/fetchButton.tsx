import React from 'react';
import { FetchButtonProps } from '../types/fetchButtonPros';

const FetchButton: React.FC<FetchButtonProps> = ({
  disabled,
  onClick,
  children,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`ml-2 px-4 py-2 rounded ${
        disabled
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : 'bg-orange-500 text-white hover:bg-orange-300'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default FetchButton;
