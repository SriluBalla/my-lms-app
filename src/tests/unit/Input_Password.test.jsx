import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "../../components/Input_Password";

describe("PasswordInput", () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    label: "Password",
    name: "password",
    value: "Test@123",
    onChange: mockOnChange,
    placeholder: "Enter your password",
    error: "",
  };

  it("renders the password input with label", () => {
    render(<PasswordInput {...defaultProps} />);
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
  });

  it("toggles visibility when button is clicked", () => {
    render(<PasswordInput {...defaultProps} />);
    const button = screen.getByRole("button");
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text");
    fireEvent.click(button);
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
    fireEvent.click(button);
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text");
  });

  it("displays password rules", () => {
    render(<PasswordInput {...defaultProps} />);
    expect(screen.getByText("One uppercase letter")).toBeInTheDocument();
    expect(screen.getByText("One lowercase letter")).toBeInTheDocument();
    expect(screen.getByText("One number")).toBeInTheDocument();
    expect(screen.getByText("One special character")).toBeInTheDocument();
    expect(screen.getByText("At least 8 characters")).toBeInTheDocument();
  });

  it("shows error message if error prop is passed", () => {
    render(<PasswordInput {...defaultProps} error="Invalid password" />);
    expect(screen.getByText("Invalid password")).toBeInTheDocument();
  });
});