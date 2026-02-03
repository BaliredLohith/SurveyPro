import { toast } from 'react-toastify';

// Error types
export const ERROR_TYPES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

// Error messages
export const ERROR_MESSAGES = {
  [ERROR_TYPES.NETWORK_ERROR]: 'Network connection failed. Please check your internet connection.',
  [ERROR_TYPES.AUTHENTICATION_ERROR]: 'Your session has expired. Please log in again.',
  [ERROR_TYPES.AUTHORIZATION_ERROR]: 'You do not have permission to perform this action.',
  [ERROR_TYPES.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ERROR_TYPES.NOT_FOUND_ERROR]: 'The requested resource was not found.',
  [ERROR_TYPES.SERVER_ERROR]: 'Server error occurred. Please try again later.',
  [ERROR_TYPES.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.',
};

// Get error type from HTTP status code
export const getErrorType = (error) => {
  if (!error.response) {
    return ERROR_TYPES.NETWORK_ERROR;
  }

  const status = error.response.status;
  
  switch (status) {
    case 401:
      return ERROR_TYPES.AUTHENTICATION_ERROR;
    case 403:
      return ERROR_TYPES.AUTHORIZATION_ERROR;
    case 400:
    case 422:
      return ERROR_TYPES.VALIDATION_ERROR;
    case 404:
      return ERROR_TYPES.NOT_FOUND_ERROR;
    case 500:
    case 502:
    case 503:
    case 504:
      return ERROR_TYPES.SERVER_ERROR;
    default:
      return ERROR_TYPES.UNKNOWN_ERROR;
  }
};

// Get error message
export const getErrorMessage = (error) => {
  const errorType = getErrorType(error);
  
  // Use backend message if available and it's a validation error
  if (errorType === ERROR_TYPES.VALIDATION_ERROR && error.response?.data?.message) {
    return error.response.data.message;
  }
  
  // Use backend message if available for other errors
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  return ERROR_MESSAGES[errorType];
};

// Show toast notification for error
export const showErrorToast = (error) => {
  const errorMessage = getErrorMessage(error);
  const errorType = getErrorType(error);
  
  switch (errorType) {
    case ERROR_TYPES.NETWORK_ERROR:
      toast.error(errorMessage, {
        toastId: 'network-error',
        autoClose: false,
      });
      break;
    case ERROR_TYPES.AUTHENTICATION_ERROR:
      toast.warning(errorMessage, {
        toastId: 'auth-error',
      });
      break;
    case ERROR_TYPES.AUTHORIZATION_ERROR:
      toast.error(errorMessage, {
        toastId: 'authz-error',
      });
      break;
    case ERROR_TYPES.SERVER_ERROR:
      toast.error(errorMessage, {
        toastId: 'server-error',
      });
      break;
    default:
      toast.error(errorMessage);
  }
};

// Global error handler
export const handleGlobalError = (error) => {
  console.error('Global error handler:', error);
  
  const errorType = getErrorType(error);
  
  // Show toast notification
  showErrorToast(error);
  
  // Handle authentication errors
  if (errorType === ERROR_TYPES.AUTHENTICATION_ERROR) {
    // Clear tokens and redirect to login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  }
  
  return {
    type: errorType,
    message: getErrorMessage(error),
  };
};

// Retry mechanism for failed requests
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on authentication or authorization errors
      const errorType = getErrorType(error);
      if ([ERROR_TYPES.AUTHENTICATION_ERROR, ERROR_TYPES.AUTHORIZATION_ERROR].includes(errorType)) {
        throw error;
      }
      
      // Don't retry on last attempt
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError;
};
