import React, { useState } from "react"
import PropTypes from "prop-types"

const FormValidator = ({ children, onSubmit, validations }) => {
  const [errors, setErrors] = useState({})

  const validateField = (name, value) => {
    if (validations[name]) {
      if (validations[name].required && !value) {
        return "This field is required"
      }
      if (validations[name].pattern && !validations[name].pattern.test(value)) {
        return validations[name].message || "Invalid input"
      }
    }
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newErrors = {}
    let hasErrors = false

    for (const [name, value] of formData.entries()) {
      const error = validateField(name, value)
      if (error) {
        newErrors[name] = error
        hasErrors = true
      }
    }

    setErrors(newErrors)

    if (!hasErrors) {
      onSubmit(Object.fromEntries(formData))
    }
  }

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (child.type === "input" || child.type === "select" || child.type === "textarea") {
        return React.cloneElement(child, {
          ...child.props,
          "aria-invalid": errors[child.props.name] ? "true" : "false",
        })
      }
      return child
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {renderChildren()}
      {Object.entries(errors).map(([field, error]) => (
        <div key={field} role="alert" style={{ color: "red" }}>
          {error}
        </div>
      ))}
    </form>
  )
}

FormValidator.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validations: PropTypes.object,
}

export default FormValidator