// Environment configurations
export const environments = {
  development: {
    API_BASE_URL: 'http://localhost:5000/api',
    DEMO_MODE: 'true',
    LOG_LEVEL: 'debug',
    ENABLE_MOCK_DATA: 'true',
    TOAST_DURATION: 5000,
    RETRY_ATTEMPTS: 3,
    TIMEOUT: 10000,
  },
  staging: {
    API_BASE_URL: 'https://staging-api.sitesurvey.com/api',
    DEMO_MODE: 'false',
    LOG_LEVEL: 'info',
    ENABLE_MOCK_DATA: 'false',
    TOAST_DURATION: 4000,
    RETRY_ATTEMPTS: 2,
    TIMEOUT: 15000,
  },
  production: {
    API_BASE_URL: 'https://api.sitesurvey.com/api',
    DEMO_MODE: 'false',
    LOG_LEVEL: 'error',
    ENABLE_MOCK_DATA: 'false',
    TOAST_DURATION: 3000,
    RETRY_ATTEMPTS: 1,
    TIMEOUT: 20000,
  },
};

// Get current environment
export const getCurrentEnvironment = () => {
  const env = process.env.NODE_ENV || 'development';
  
  // Check for custom environment override
  const customEnv = process.env.REACT_APP_ENVIRONMENT;
  if (customEnv && environments[customEnv]) {
    return environments[customEnv];
  }
  
  return environments[env];
};

// Environment-specific utilities
export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

export const isStaging = () => {
  return process.env.NODE_ENV === 'staging' || process.env.REACT_APP_ENVIRONMENT === 'staging';
};

// Get environment variable with fallback
export const getEnvVar = (key, fallback = null) => {
  return process.env[key] || getCurrentEnvironment()[key] || fallback;
};

// API configuration
export const getApiConfig = () => {
  const env = getCurrentEnvironment();
  
  return {
    baseURL: getEnvVar('REACT_APP_API_BASE_URL', env.API_BASE_URL),
    timeout: getEnvVar('REACT_APP_API_TIMEOUT', env.TIMEOUT),
    retryAttempts: getEnvVar('REACT_APP_RETRY_ATTEMPTS', env.RETRY_ATTEMPTS),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

// Feature flags
export const getFeatureFlags = () => {
  const env = getCurrentEnvironment();
  
  return {
    demoMode: getEnvVar('REACT_APP_DEMO_MODE', env.DEMO_MODE) === 'true',
    enableMockData: getEnvVar('REACT_APP_ENABLE_MOCK_DATA', env.ENABLE_MOCK_DATA) === 'true',
    enableDebugTools: isDevelopment(),
    enableAnalytics: !isDevelopment(),
    enableErrorReporting: !isDevelopment(),
  };
};

// Logging configuration
export const getLoggingConfig = () => {
  const env = getCurrentEnvironment();
  
  return {
    level: getEnvVar('REACT_APP_LOG_LEVEL', env.LOG_LEVEL),
    enableConsole: isDevelopment(),
    enableRemote: !isDevelopment(),
  };
};

export default {
  getCurrentEnvironment,
  getApiConfig,
  getFeatureFlags,
  getLoggingConfig,
  isDevelopment,
  isProduction,
  isStaging,
};
