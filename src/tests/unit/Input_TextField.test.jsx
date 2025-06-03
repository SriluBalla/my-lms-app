import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "../../components/Input/Input_TextField";

describe("TextInput", () => {
  it("renders label and input with required asterisk", () => {
    render(
      <TextInput
        id="firstName"
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
        value=""
        onChange={() => {}}
        required={true}
      />
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your first name/i)).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(
      <TextInput
        id="firstName"
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Srilu" },
    });

    expect(handleChange).toHaveBeenCalled();
  });

  it("displays ConfirmMessage when message is passed", () => {
    render(
      <TextInput
        id="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
        value=""
        onChange={() => {}}
        message="Email is required"
        type="error"
      />
    );

    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });
});
