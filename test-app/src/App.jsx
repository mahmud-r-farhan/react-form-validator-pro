import React from 'react';
import { FormValidator } from 'react-form-validator-pro';

const App = () => {
  const validations = {
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
    password: { required: true, message: 'Password is required', minLength: 8, },
  };

  const handleSubmit = (formData) => {
    console.log('Form Submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>React Form Validator Test</h2>
      <FormValidator
        onSubmit={handleSubmit}
        validations={validations}
        validateOnChange={true}
        validateOnBlur={true}
      >
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
            aria-invalid="false"
            aria-required="true"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            name="password"
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
            aria-invalid="false"
            aria-required="true"
          />
        </div>

        {/* Display error messages above the submit button */}
        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginBottom: '10px' }}>
          <div className="error-message" />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 15px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            marginTop: '10px',
          }}
        >
          Submit
        </button>
      </FormValidator>
    </div>
  );
};

export default App;
