import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { EpicInfoButtonProps } from '../types/epicInfoButtonProps';

// Utility function to format the date string
const formatDate = (dateStr: string) => {
  const [datePart, timePart] = dateStr.split(' ');
  if (!datePart) return dateStr;
  const [year, month, day] = datePart.split('-');
  return `${day}-${month}-${year}${timePart ? ' ' + timePart : ''}`;
};

// Use forwardRef so the parent can attach a ref (for detecting outside clicks)
const EpicInfoButton = React.forwardRef<HTMLDivElement, EpicInfoButtonProps>(
  ({ showDescription, setShowDescription, caption, date }, ref) => {
    return (
      <div ref={ref} className="absolute top-2 right-2">
        <button
          onClick={() => setShowDescription(!showDescription)}
          className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          <FaInfoCircle size={20} />
        </button>
        {showDescription && (
          <div className="absolute right-0 mt-2 w-64 bg-black bg-opacity-75 text-white p-4 rounded-lg">
            <p className="text-sm">{caption}</p>
            <p className="text-sm">Date: {formatDate(date)}</p>
          </div>
        )}
      </div>
    );
  }
);

EpicInfoButton.displayName = 'EpicInfoButton';

export default EpicInfoButton;
