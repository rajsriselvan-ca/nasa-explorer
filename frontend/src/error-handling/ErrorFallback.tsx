import { ErrorFallbackProps } from "../types/errorFallbackProps";
import { FaExclamationCircle } from "react-icons/fa"; 

const ErrorFallback = ({ message, onRetry }: ErrorFallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
       <FaExclamationCircle className="w-20 h-20 text-red-600 mb-4" />
      <h2 className="text-2xl font-bold text-red-600 mb-2">Oops, Something went wrong!</h2>
      <p className="text-gray-700 mb-4">{message}</p> 
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default ErrorFallback;
