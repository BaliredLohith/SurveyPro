import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        const user = authService.getCurrentUser();
        console.log('Initial auth check - user found:', user);
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user },
        });
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password, navigate) => {
    console.log('=== LOGIN START ===');
    console.log('Email:', email);
    console.log('Password:', password.substring(0, 3) + '***');
    
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      const { userInfo } = await authService.login(email, password);
      
      console.log('=== LOGIN SUCCESS ===');
      console.log('User info received:', userInfo);
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user: userInfo },
      });

      // Role-based routing using React Router
      const role = userInfo.role;
      console.log('=== ROLE-BASED ROUTING ===');
      console.log('User role:', role);
      console.log('User info:', userInfo);
      
      // Route to role-specific welcome page
      if (role === 'admin') {
        console.log('Navigating to admin welcome page');
        navigate('/admin/welcome');
      } else if (role === 'project_manager') {
        console.log('Navigating to project manager welcome page');
        navigate('/manager/welcome');
      } else if (role === 'survey_engineer') {
        console.log('Navigating to survey engineer welcome page');
        navigate('/engineer/welcome');
      } else if (role === 'reviewer') {
        console.log('Navigating to reviewer welcome page');
        navigate('/reviewer/welcome');
      } else if (role === 'viewer') {
        console.log('Navigating to viewer welcome page');
        navigate('/viewer/welcome');
      } else {
        console.log('Navigating to default welcome page');
        navigate('/welcome');
      }

      return { success: true, userInfo };
    } catch (err) {
      console.error('=== LOGIN ERROR ===');
      console.error('Login error:', err);
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: { error: err.message || 'Login failed' },
      });
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  // Logout function
  const logout = async () => {
    await authService.logout();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    logout,
    clearError,
    hasRole: authService.hasRole.bind(authService),
    hasAnyRole: authService.hasAnyRole.bind(authService),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
