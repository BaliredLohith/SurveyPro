import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validation';
import { useDemoMode } from '../hooks/useDemoMode';
import ModernLogin from '../components/auth/ModernLogin';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isLoading: authLoading, error: authError, clearError } = useAuth();
  const { getDemoCredentials, isDemoMode } = useDemoMode();

  // Auto-fill demo credentials when demo mode is enabled
  useEffect(() => {
    if (isDemoMode) {
      const credentials = getDemoCredentials();
      setFormData(credentials);
      setErrors({});
    }
  }, [isDemoMode, getDemoCredentials]);

  // Listen for demo credentials event
  useEffect(() => {
    const handleDemoCredentials = (event) => {
      const credentials = event.detail;
      setFormData(credentials);
      setErrors({});
    };

    window.addEventListener('demoCredentials', handleDemoCredentials);
    return () => {
      window.removeEventListener('demoCredentials', handleDemoCredentials);
    };
  }, []);

  // Sync with auth context loading state
  useEffect(() => {
    setLoading(authLoading);
  }, [authLoading]);

  // Sync with auth context error
  useEffect(() => {
    setError(authError || '');
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
    
    // Clear general error when user starts typing
    if (error) {
      clearError();
      setError('');
    }
  };

  const validateForm = () => {
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors || {});
    return !validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/welcome');
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  const handleAutoFill = () => {
    const credentials = getDemoCredentials();
    setFormData(credentials);
    setErrors({});
    setError('');
  };

  const togglePasswordVisibility = () => {
    // This will be handled by the ModernLogin component
  };

  return (
    <ModernLogin
      formData={formData}
      errors={errors}
      loading={loading}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onAutoFill={handleAutoFill}
      onTogglePassword={togglePasswordVisibility}
    />
  );
};

export default Login;
