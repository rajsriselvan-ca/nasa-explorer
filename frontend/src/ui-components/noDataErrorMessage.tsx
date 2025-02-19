import React from 'react';
import { NoDataProps } from '../types/noDataProps';

const NoDataErrorMessage: React.FC<NoDataProps> = ({
  message = "No photos available. Please try with different input value.",
  imageUrl = "/assets/images/no_data.jpg",
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={imageUrl} alt="No data found" className="w-64 h-auto" />
      <p className="text-white mt-2">{message}</p>
    </div>
  );
};

export default NoDataErrorMessage;
