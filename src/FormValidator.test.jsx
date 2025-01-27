import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import FormValidator from "./FormValidator"

describe("FormValidator", () => {
  it("validates required fields", () => {
    const handleSubmit = jest.fn()
    render(
      <FormValidator
        onSubmit={handleSubmit}
        validations={{
          name: { required: true },
        }}
      >
        <input name="name" />
        <button type="submit">Submit</button>
      </FormValidator>,
    )

    fireEvent.click(screen.getByText("Submit"))

    expect(screen.getByRole("alert")).toHaveTextContent("This field is required")
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it("validates pattern", () => {
    const handleSubmit = jest.fn()
    render(
      <FormValidator
        onSubmit={handleSubmit}
        validations={{
          email: { pattern: /^\S+@\S+$/i, message: "Invalid email format" },
        }}
      >
        <input name="email" />
        <button type="submit">Submit</button>
      </FormValidator>,
    )

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "invalid-email" } })
    fireEvent.click(screen.getByText("Submit"))

    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email format")
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it("submits form when validation passes", () => {
    const handleSubmit = jest.fn()
    render(
      <FormValidator
        onSubmit={handleSubmit}
        validations={{
          name: { required: true },
          email: { pattern: /^\S+@\S+$/i, message: "Invalid email format" },
        }}
      >
        <input name="name" />
        <input name="email" />
        <button type="submit">Submit</button>
      </FormValidator>,
    )

    fireEvent.change(screen.getAllByRole("textbox")[0], { target: { value: "Mahmudur Rahman" } })
    fireEvent.change(screen.getAllByRole("textbox")[1], { target: { value: "dev@devplus.fun" } })
    fireEvent.click(screen.getByText("Submit"))

    expect(handleSubmit).toHaveBeenCalledWith({
      name: "Mahmuudur Rahman",
      email: "dev@devplus.fun",
    })
  })
})

