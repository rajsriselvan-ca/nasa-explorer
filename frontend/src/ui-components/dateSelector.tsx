import React from 'react';
import { DateSelectorProps } from '../types/dateSelectorProps';

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div className="my-4">
      <label htmlFor="epic-date" className="text-white mr-2">
        Select a Date:
      </label>
      <input
        id="epic-date"
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        max={new Date().toISOString().split("T")[0]} // Set maximum selectable date to today
        className="p-2 rounded"
      />
    </div>
  );
};

export default DateSelector;
