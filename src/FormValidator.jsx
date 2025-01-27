import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

const defaultValidationRules = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-]{10,}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
};

const FormValidator = ({
  children,
  onSubmit,
  validations = {},
  validateOnChange = true,
  validateOnBlur = true,
  customStyles = {},
  className = ""
}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    const fieldValidation = validations[name] || {};
    const errors = [];

    if (fieldValidation.required && !value) {
      errors.push(fieldValidation.requiredMessage || "This field is required");
    }

    if (value && fieldValidation.type) {
      const pattern = defaultValidationRules[fieldValidation.type];
      if (pattern && !pattern.test(value)) {
        errors.push(fieldValidation.typeMessage || `Invalid ${fieldValidation.type} format`);
      }
    }

    if (value && fieldValidation.minLength && value.length < fieldValidation.minLength) {
      errors.push(`Minimum ${fieldValidation.minLength} characters required`);
    }

    if (value && fieldValidation.pattern && !fieldValidation.pattern.test(value)) {
      errors.push(fieldValidation.message || "Invalid format");
    }

    if (value && fieldValidation.custom) {
      const customError = fieldValidation.custom(value);
      if (customError) errors.push(customError);
    }

    return errors.length ? errors : null;
  }, [validations]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (validateOnChange) {
      const fieldErrors = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors
      }));
    }
  }, [validateField, validateOnChange]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    if (validateOnBlur) {
      const fieldErrors = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors
      }));
    }
  }, [validateField, validateOnBlur]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newErrors = {};
    let hasErrors = false;

    for (const [name, value] of formData.entries()) {
      const fieldErrors = validateField(name, value);
      if (fieldErrors) {
        newErrors[name] = fieldErrors;
        hasErrors = true;
      }
    }

    setErrors(newErrors);
    setTouched(Object.keys(validations).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {}));

    if (!hasErrors) {
      onSubmit(Object.fromEntries(formData));
    }
  }, [validateField, onSubmit, validations]);

  const renderChildren = useCallback(() => {
    return React.Children.map(children, (child) => {
      if (child?.props?.name && (
        child.type === "input" ||
        child.type === "select" ||
        child.type === "textarea"
      )) {
        return React.cloneElement(child, {
          ...child.props,
          "aria-invalid": errors[child.props.name] ? "true" : "false",
          "aria-required": validations[child.props.name]?.required || false,
          onChange: (e) => {
            child.props.onChange?.(e);
            handleChange(e);
          },
          onBlur: (e) => {
            child.props.onBlur?.(e);
            handleBlur(e);
          },
          className: `${child.props.className || ""} ${
            errors[child.props.name] && touched[child.props.name] ? "error" : ""
          }`.trim()
        });
      }
      return child;
    });
  }, [children, errors, touched, handleChange, handleBlur, validations]);

  return (
    <form 
      onSubmit={handleSubmit} 
      noValidate 
      className={className}
      style={{
        ...customStyles.form
      }}
    >
      {renderChildren()}
      {Object.entries(errors).map(([field, fieldErrors]) => (
        touched[field] && fieldErrors && (
          <div
            key={field}
            role="alert"
            className="error-message"
            style={{
              color: "var(--error-color, #dc3545)",
              fontSize: "0.875rem",
              marginTop: "0.25rem",
              ...customStyles.errorMessage
            }}
          >
            {Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors}
          </div>
        )
      ))}
    </form>
  );
};

FormValidator.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validations: PropTypes.object,
  validateOnChange: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
  customStyles: PropTypes.object,
  className: PropTypes.string
};

export default FormValidator;