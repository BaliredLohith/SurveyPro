import React, { Suspense } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { DashboardSkeleton } from '../common/SkeletonLoader';

// Loading component for lazy loaded components
const LoadingFallback = ({ message = 'Loading...', size = 'medium' }) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { minHeight: '200px' };
      case 'large':
        return { minHeight: '400px' };
      default:
        return { minHeight: '300px' };
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        ...getSizeStyles(),
        p: 3,
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="body2" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

// Error fallback for lazy loaded components
const ErrorFallback = ({ error, retry }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '300px',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" color="error" gutterBottom>
        Failed to Load
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {error?.message || 'An error occurred while loading this component.'}
      </Typography>
      {retry && (
        <button
          onClick={retry}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      )}
    </Box>
  );
};

// Lazy load wrapper component
const LazyLoadWrapper = ({ 
  children, 
  fallback = <LoadingFallback />,
  errorFallback,
  onError,
  ...props 
}) => {
  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary onError={onError}>
        {React.cloneElement(children, props)}
      </ErrorBoundary>
    </Suspense>
  );
};

// Error boundary for lazy loaded components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('LazyLoadWrapper Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorFallback ? (
        this.props.errorFallback(this.state.error, () => this.setState({ hasError: false, error: null }))
      ) : (
        <ErrorFallback error={this.state.error} />
      );
    }

    return this.props.children;
  }
}

// Higher-order component for lazy loading
export const withLazyLoading = (Component, options = {}) => {
  const LazyComponent = React.lazy(() => {
    return import(`../../pages/${Component}`).then(module => ({
      default: module[Component],
    }));
  });

  return (props) => (
    <LazyLoadWrapper
      fallback={options.fallback || <LoadingFallback />}
      errorFallback={options.errorFallback}
      onError={options.onError}
    >
      <LazyComponent {...props} />
    </LazyLoadWrapper>
  );
};

// Predefined lazy loaded components
export const LazyDashboard = withLazyLoading('Dashboard', {
  fallback: <DashboardSkeleton />,
});

export const LazyFloorPlan = withLazyLoading('FloorPlan');

export const LazySurveys = withLazyLoading('Surveys');

export const LazySettings = withLazyLoading('Settings');

export default LazyLoadWrapper;
export { LoadingFallback, ErrorFallback };
