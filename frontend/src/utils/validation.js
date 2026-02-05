// Form validation utilities
import React from 'react';

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Required field validation
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

// Length validation
export const validateLength = (value, min, max, fieldName) => {
  if (value && (value.length < min || value.length > max)) {
    return `${fieldName} must be between ${min} and ${max} characters`;
  }
  return null;
};

// Number validation
export const validateNumber = (value, fieldName, min = null, max = null) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const num = parseFloat(value);
  if (isNaN(num)) {
    return `${fieldName} must be a valid number`;
  }

  if (min !== null && num < min) {
    return `${fieldName} must be at least ${min}`;
  }

  if (max !== null && num > max) {
    return `${fieldName} must not exceed ${max}`;
  }

  return null;
};

// File size validation
export const validateFileSize = (file, maxSizeMB = 10) => {
  if (!file) return null;

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size must not exceed ${maxSizeMB}MB`;
  }

  return null;
};

// File type validation
export const validateFileType = (file, allowedTypes) => {
  if (!file) return null;

  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!allowedTypes.includes(fileExtension)) {
    return `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`;
  }

  return null;
};

// Image file validation
export const validateImageFile = (file, maxSizeMB = 10) => {
  const allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const sizeError = validateFileSize(file, maxSizeMB);
  const typeError = validateFileType(file, allowedTypes);

  return sizeError || typeError;
};

// PDF file validation
export const validatePDFFile = (file, maxSizeMB = 20) => {
  const allowedTypes = ['pdf'];
  const sizeError = validateFileSize(file, maxSizeMB);
  const typeError = validateFileType(file, allowedTypes);

  return sizeError || typeError;
};

// Floor plan file validation
export const validateFloorPlanFile = (file) => {
  const allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'pdf', 'dwg', 'dxf', 'svg'];
  const maxSizeMB = 10;

  const sizeError = validateFileSize(file, maxSizeMB);
  const typeError = validateFileType(file, allowedTypes);

  return sizeError || typeError;
};

// CSV file validation
export const validateCSVFile = (file, maxSizeMB = 5) => {
  const allowedTypes = ['csv'];
  const sizeError = validateFileSize(file, maxSizeMB);
  const typeError = validateFileType(file, allowedTypes);

  return sizeError || typeError;
};

// CSV content validation (basic)
export const validateCSVContent = (content) => {
  if (!content || content.trim() === '') {
    return 'CSV file is empty';
  }

  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length < 2) {
    return 'CSV file must contain at least a header and one data row';
  }

  // Check if it has the expected columns
  const header = lines[0].toLowerCase();
  const requiredColumns = ['name', 'type'];
  
  for (const column of requiredColumns) {
    if (!header.includes(column)) {
      return `CSV file must contain a '${column}' column`;
    }
  }

  return null;
};

// Property form validation
export const validatePropertyForm = (data) => {
  const errors = {};

  const nameError = validateRequired(data.name, 'Property name');
  if (nameError) errors.name = nameError;

  const addressError = validateRequired(data.address, 'Address');
  if (addressError) errors.address = addressError;

  const nameLengthError = validateLength(data.name, 2, 255, 'Property name');
  if (nameLengthError) errors.name = nameLengthError;

  const addressLengthError = validateLength(data.address, 5, 1000, 'Address');
  if (addressLengthError) errors.address = addressLengthError;

  return Object.keys(errors).length === 0 ? null : errors;
};

// Building form validation
export const validateBuildingForm = (data) => {
  const errors = {};

  const nameError = validateRequired(data.name, 'Building name');
  if (nameError) errors.name = nameError;

  const propertyIdError = validateRequired(data.propertyId, 'Property');
  if (propertyIdError) errors.propertyId = propertyIdError;

  const nameLengthError = validateLength(data.name, 2, 255, 'Building name');
  if (nameLengthError) errors.name = nameLengthError;

  return Object.keys(errors).length === 0 ? null : errors;
};

// Floor form validation
export const validateFloorForm = (data) => {
  const errors = {};

  const nameError = validateRequired(data.name, 'Floor name');
  if (nameError) errors.name = nameError;

  const buildingIdError = validateRequired(data.buildingId, 'Building');
  if (buildingIdError) errors.buildingId = buildingIdError;

  const floorNumberError = validateNumber(data.floorNumber, 'Floor number', -10, 200);
  if (floorNumberError) errors.floorNumber = floorNumberError;

  const nameLengthError = validateLength(data.name, 2, 255, 'Floor name');
  if (nameLengthError) errors.name = nameLengthError;

  return Object.keys(errors).length === 0 ? null : errors;
};

// Space form validation
export const validateSpaceForm = (data) => {
  const errors = {};

  const nameError = validateRequired(data.name, 'Space name');
  if (nameError) errors.name = nameError;

  const typeError = validateRequired(data.type, 'Space type');
  if (typeError) errors.type = typeError;

  const floorIdError = validateRequired(data.floorId, 'Floor');
  if (floorIdError) errors.floorId = floorIdError;

  const areaError = validateNumber(data.area, 'Area', 0.01, 999999.99);
  if (areaError) errors.area = areaError;

  const xCoordError = validateNumber(data.xCoord, 'X coordinate', -999999.99, 999999.99);
  if (xCoordError) errors.xCoord = xCoordError;

  const yCoordError = validateNumber(data.yCoord, 'Y coordinate', -999999.99, 999999.99);
  if (yCoordError) errors.yCoord = yCoordError;

  const nameLengthError = validateLength(data.name, 2, 255, 'Space name');
  if (nameLengthError) errors.name = nameLengthError;

  return Object.keys(errors).length === 0 ? null : errors;
};

// Survey form validation
export const validateSurveyForm = (data) => {
  const errors = {};

  const titleError = validateRequired(data.title, 'Survey title');
  if (titleError) errors.title = titleError;

  const propertyIdError = validateRequired(data.propertyId, 'Property');
  if (propertyIdError) errors.propertyId = propertyIdError;

  const titleLengthError = validateLength(data.title, 2, 255, 'Survey title');
  if (titleLengthError) errors.title = titleLengthError;

  const descriptionLengthError = validateLength(data.description, 0, 1000, 'Description');
  if (descriptionLengthError) errors.description = descriptionLengthError;

  return Object.keys(errors).length === 0 ? null : errors;
};

// Login form validation
export const validateLoginForm = (data) => {
  const errors = {};

  const emailError = validateRequired(data.email, 'Email');
  if (emailError) errors.email = emailError;

  const passwordError = validateRequired(data.password, 'Password');
  if (passwordError) errors.password = passwordError;

  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  const passwordLengthError = validateLength(data.password, 6, 255, 'Password');
  if (passwordLengthError) errors.password = passwordLengthError;

  return Object.keys(errors).length === 0 ? null : errors;
};

// Real-time validation hook
export const useValidation = (validationFn, initialValues = {}) => {
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validateField = React.useCallback((name, value) => {
    const fieldErrors = validationFn({ [name]: value });
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors?.[name] || null,
    }));
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  }, [validationFn]);

  const validateForm = React.useCallback((data) => {
    const formErrors = validationFn(data);
    setErrors(formErrors || {});
    setTouched(Object.keys(data || {}).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return !formErrors;
  }, [validationFn]);

  const clearErrors = React.useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateField,
    validateForm,
    clearErrors,
    isValid: Object.keys(errors).length === 0,
  };
};
