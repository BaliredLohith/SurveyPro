import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';
import theme from './theme/theme';

// Lazy load pages
import { LoadingFallback } from './components/lazy/LazyLoadWrapper';
const LazyLogin = React.lazy(() => import('./pages/Login'));
const LazyWelcome = React.lazy(() => import('./pages/Welcome'));
const LazyAdminWelcome = React.lazy(() => import('./pages/admin/welcome/AdminWelcome'));
const LazySurveyEngineerWelcome = React.lazy(() => import('./pages/survey-engineer/welcome/EngineerWelcome'));
const LazyProjectManagerWelcome = React.lazy(() => import('./pages/project-manager/welcome/ManagerWelcome'));
const LazyReviewerWelcome = React.lazy(() => import('./pages/reviewer/welcome/ReviewerWelcome'));
const LazyViewerWelcome = React.lazy(() => import('./pages/viewer/welcome/ViewerWelcome'));
const LazyDashboard = React.lazy(() => import('./pages/Dashboard.tsx'));
const LazySurveyEngineerDashboard = React.lazy(() => import('./pages/survey-engineer/dashboard/EngineerDashboard'));
const LazySurveyEngineerProfile = React.lazy(() => import('./pages/survey-engineer/dashboard/EngineerProfile'));
const LazySurveyEngineerSettings = React.lazy(() => import('./pages/survey-engineer/dashboard/EngineerSettings'));
const LazySurveyEngineerActivity = React.lazy(() => import('./pages/survey-engineer/dashboard/EngineerActivity'));
const LazySurveyEngineerHelpSupport = React.lazy(() => import('./pages/survey-engineer/dashboard/EngineerHelpSupport'));
const LazyProjectManagerDashboard = React.lazy(() => import('./pages/project-manager/dashboard/ProjectManagerDashboard'));
const LazyProjectManagerProfile = React.lazy(() => import('./pages/project-manager/dashboard/ProjectManagerProfile'));
const LazyProjectManagerSettings = React.lazy(() => import('./pages/project-manager/dashboard/ProjectManagerSettings'));
const LazyProjectManagerActivity = React.lazy(() => import('./pages/project-manager/dashboard/ProjectManagerActivity'));
const LazyProjectManagerHelpSupport = React.lazy(() => import('./pages/project-manager/dashboard/ProjectManagerHelpSupport'));
const LazyReviewerDashboard = React.lazy(() => import('./pages/reviewer/dashboard/ReviewerDashboard'));
const LazyReviewerProfile = React.lazy(() => import('./pages/reviewer/dashboard/ReviewerProfile'));
const LazyReviewerSettings = React.lazy(() => import('./pages/reviewer/dashboard/ReviewerSettings'));
const LazyReviewerActivity = React.lazy(() => import('./pages/reviewer/dashboard/ReviewerActivity'));
const LazyReviewerHelpSupport = React.lazy(() => import('./pages/reviewer/dashboard/ReviewerHelpSupport'));
const LazyViewerDashboard = React.lazy(() => import('./pages/viewer/dashboard/ViewerDashboard'));
const LazyViewerProfile = React.lazy(() => import('./pages/viewer/dashboard/ViewerProfile'));
const LazyViewerSettings = React.lazy(() => import('./pages/viewer/dashboard/ViewerSettings'));
const LazyViewerActivity = React.lazy(() => import('./pages/viewer/dashboard/ViewerActivity'));
const LazyViewerHelpSupport = React.lazy(() => import('./pages/viewer/dashboard/ViewerHelpSupport'));
const LazyFloorPlan = React.lazy(() => import('./pages/FloorPlan'));
const LazyFloorPlanEditor = React.lazy(() => import('./pages/FloorPlanEditor'));
const LazySurveys = React.lazy(() => import('./pages/Surveys'));
const LazyProperties = React.lazy(() => import('./pages/Properties'));
const LazyPropertyDetails = React.lazy(() => import('./pages/PropertyDetails'));
const LazyBuildingDetails = React.lazy(() => import('./pages/BuildingDetails'));
const LazyBuildings = React.lazy(() => import('./pages/Buildings'));
const LazyBuildingSurvey = React.lazy(() => import('./pages/BuildingSurvey'));
const LazyBuildingReports = React.lazy(() => import('./pages/BuildingReports'));
const LazyBuildingHealth = React.lazy(() => import('./pages/BuildingHealth'));
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
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyDashboard />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/engineer/dashboard"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazySurveyEngineerDashboard />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/engineer/profile"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazySurveyEngineerProfile />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/engineer/settings"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazySurveyEngineerSettings />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/engineer/activity"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazySurveyEngineerActivity />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/engineer/help"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazySurveyEngineerHelpSupport />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              {/* Project Manager Routes */}
              <Route
                path="/manager/dashboard"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyProjectManagerDashboard />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manager/profile"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyProjectManagerProfile />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manager/settings"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyProjectManagerSettings />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manager/activity"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyProjectManagerActivity />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manager/help"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyProjectManagerHelpSupport />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              {/* Reviewer Routes */}
              <Route
                path="/reviewer/dashboard"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyReviewerDashboard />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviewer/profile"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyReviewerProfile />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviewer/settings"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyReviewerSettings />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviewer/activity"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyReviewerActivity />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviewer/help"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyReviewerHelpSupport />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              {/* Viewer Routes */}
              <Route
                path="/viewer/dashboard"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyViewerDashboard />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/viewer/profile"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyViewerProfile />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/viewer/settings"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyViewerSettings />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/viewer/activity"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyViewerActivity />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/viewer/help"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyViewerHelpSupport />
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
                path="/admin/welcome"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyAdminWelcome />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/engineer/welcome"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazySurveyEngineerWelcome />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manager/welcome"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyProjectManagerWelcome />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviewer/welcome"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyReviewerWelcome />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/viewer/welcome"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyViewerWelcome />
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
                path="/buildings/:id/survey"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyBuildingSurvey />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/buildings/:id/reports"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyBuildingReports />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/buildings/:id/health"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyBuildingHealth />
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
              
              {/* Catch all route - redirect to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
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
