import { AxiosError } from 'axios';

export const handleApiError = (error: unknown): string => {
  if (!navigator.onLine) {
    return 'No internet connection. Please check your network and try again.';
  }

  if (error instanceof AxiosError) {
    if (error.response) {
      // Extract error message directly from response
      const serverErrorMessage = error.response.data?.error || error.response.data?.message;
      
      if (serverErrorMessage) {
        return serverErrorMessage; // Return the correct backend error message
      }

      // Handle known status codes
      switch (error.response.status) {
        case 400:
          return 'Error Code: 400. Bad request. Please check your input and try again.';
        case 401:
          return 'Error Code: 401. Unauthorized access.';
        case 403:
          return 'Error Code: 403. Access denied. You do not have permission to view this content.';
        case 404:
          return 'Error Code: 404. Requested resource not found.';
        case 500:
          return 'Error Code: 500. Internal server error. Please try again later.';
        case 503:
          return 'Error Code: 503. Service unavailable. Please try again later.';
        default:
          return 'An unexpected error occurred. Please try again.';
      }
    }
    return 'Server did not respond. Please try again later.';
  }

  return 'Something went wrong. Please try again.';
};
