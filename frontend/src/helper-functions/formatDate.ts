export const formatDate = (dateStr: string): string => {
    // Check if the date string contains a time component.
    if (dateStr.includes(' ')) {
      const [datePart, timePart] = dateStr.split(' ');
      if (!datePart) return dateStr;
      const parts = datePart.split('-');
      if (parts.length !== 3) return dateStr;
      const [year, month, day] = parts;
      return `${day}-${month}-${year}${timePart ? ' ' + timePart : ''}`;
    } else {
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      const [year, month, day] = parts;
      return `${day}-${month}-${year}`;
    }
  };
  