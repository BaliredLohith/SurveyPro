import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import DemoHelper from './components/common/DemoHelper';
import DemoModeToggle from './components/common/DemoModeToggle';
import ProtectedRoute from './components/auth/ProtectedRoute';
import theme from './theme/theme';

// Lazy load pages
import { LoadingFallback } from './components/lazy/LazyLoadWrapper';
const LazyLogin = React.lazy(() => import('./pages/Login'));
const LazyWelcome = React.lazy(() => import('./pages/Welcome'));
const LazyDashboard = React.lazy(() => import('./pages/Dashboard.tsx'));
const LazyFloorPlan = React.lazy(() => import('./pages/FloorPlan'));
const LazyFloorPlanEditor = React.lazy(() => import('./pages/FloorPlanEditor'));
const LazySurveys = React.lazy(() => import('./pages/Surveys'));
const LazyProperties = React.lazy(() => import('./pages/Properties'));
const LazyPropertyDetails = React.lazy(() => import('./pages/PropertyDetails'));
const LazyBuildingDetails = React.lazy(() => import('./pages/BuildingDetails'));
const LazyBuildings = React.lazy(() => import('./pages/Buildings'));
const LazyUsers = React.lazy(() => import('./pages/Users'));
const LazyReports = React.lazy(() => import('./pages/Reports'));
const LazySettings = React.lazy(() => import('./pages/Settings'));

// Fallback UI when backend is unavailable
const FallbackUI = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    p={3}
    sx={{ textAlign: 'center' }}
  >
    <Typography variant="h4" color="error" gutterBottom>
      Service Unavailable
    </Typography>
    <Typography variant="body1" color="text.secondary" paragraph>
      We're experiencing technical difficulties. Please try again later.
    </Typography>
    <button
      onClick={() => window.location.reload()}
      style={{
        padding: '12px 24px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '16px',
      }}
    >
      Refresh Page
    </button>
  </Box>
);

// Error boundary for the entire app
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Send to error reporting service
      console.error('Application Error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI />;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppErrorBoundary>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route 
                path="/login" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <LazyLogin />
                  </Suspense>
                } 
              />
              
              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyDashboard />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/welcome"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyWelcome />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/floor-plan"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyFloorPlan />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/properties/:propertyId/buildings/:buildingId/floors/:floorId/plan"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyFloorPlanEditor />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/surveys"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazySurveys />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/properties"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyProperties />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/properties/:id"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyPropertyDetails />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/properties/:id/buildings/:buildingId"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyBuildingDetails />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/buildings"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyBuildings />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyUsers />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyReports />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute requiredRoles={['ROLE_SUPER_ADMIN', 'ROLE_ORG_ADMIN']}>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazySettings />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            
            {/* Demo Mode Toggle */}
            <DemoModeToggle />
            
            {/* Demo Helper (Development Only) */}
            <DemoHelper />
          </Router>
          
          {/* Toast Container */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AuthProvider>
      </AppErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
