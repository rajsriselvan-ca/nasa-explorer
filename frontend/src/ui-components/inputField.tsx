import React from 'react';
import { InputFieldProps } from '../types/inputFieldProps';

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  min,
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Inline label */}
      <label htmlFor={id} className="mr-2 text-white whitespace-nowrap">
        {label}
      </label>
      {/* Input field */}
      <input
        type={type}
        id={id}
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-2 bg-gray-700 text-white"
      />
    </div>
  );
};

export default InputField;
