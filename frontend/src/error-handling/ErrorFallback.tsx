import errorImage from '/assets/images/errorMessage.png'; 

interface ErrorFallbackProps {
  message: string; 
  onRetry: () => void; 
}

const ErrorFallback = ({ message, onRetry }: ErrorFallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <img src={errorImage} alt="Error" className="w-80 h-80 mb-4" />
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
