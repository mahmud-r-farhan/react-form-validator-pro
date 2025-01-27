# React Form Validator Pro

A lightweight React component for easy form validation and error handling. This package makes building forms with validation a breeze by providing a clean, declarative API.

---

## Features
- **Easy-to-use**: Quickly add form validation to your React project.
- **Customizable Rules**: Define required fields, patterns, and error messages.
- **No Page Reload**: Prevents page reloads on form submission.
- **Error Handling**: Display custom error messages for invalid fields.

---

## Installation

Install the package via npm:

```bash
npm install react-form-validator-pro
```

---

## Basic Usage

Here’s how you can use the package in your React project:

### Example

```javascript
import React from 'react';
import { FormValidator } from 'react-form-validator-pro';

const App = () => {
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h1>React Form Validator Example</h1>
      <FormValidator
        onSubmit={handleSubmit}
        validations={{
          username: { required: true, requiredMessage: "Username is required" },
          email: { 
            required: true, 
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
          phone: {
            required: true,
            type: 'phone',
            typeMessage: 'Invalid phone number format',
            minLength: 10,
            minLengthMessage: 'Phone number must be at least 10 characters long',
          },
          password: {
            required: true,
            type: 'password',
            typeMessage: 'Password must contain at least one letter, one number, and one special character',
            minLength: 8,
            minLengthMessage: 'Password must be at least 8 characters long',
          },
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        <div>
          <label>Username:</label>
          <input name="username" placeholder="Enter your username" />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Phone:</label>
          <input name="phone" placeholder="Enter your phone number" />
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Submit</button>
      </FormValidator>
    </div>
  );
};

export default App;

```

---

## Props

### **`FormValidator`**

| Prop       | Type     | Default | Description                                                                 |
|------------|----------|---------|-----------------------------------------------------------------------------|
| `children` | `node`   | Required| The form fields to validate.                                               |
| `onSubmit` | `func`   | Required| A callback function that receives the validated form data.                  |
| `rules`    | `object` | `{}`    | An object defining validation rules for each field.                         |

---

### Rules Format

Each field in the `rules` object should have the following format:

| Key       | Type       | Description                                                |
|-----------|------------|------------------------------------------------------------|
| `required`| `boolean`  | If `true`, the field must be filled.                        |
| `pattern` | `RegExp`   | A regular expression to validate the input against.         |
| `message` | `string`   | Custom error message to display if the `pattern` check fails.|

---

## Customization

You can customize error messages by adding them to the `rules` object. For example:

```javascript
<FormValidator
  rules={{
    password: {
      required: true,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: 'Password must be at least 8 characters long and contain letters and numbers',
    },
  }}
>
```

---

## Development

If you'd like to contribute:

1. Clone the repository:
   ```bash
   git clone https://github.com/mahmud-r-farhan/react-form-validator-pro.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. Build the package:
   ```bash
   npm run build
   ```

---

## License

This project is licensed under the MIT License.

---

## Feedback and Contributions

Feel free to open issues or submit pull requests! Feedback is always appreciated. 😊

Made with ❤️ by Mahmudur Rahman.
---