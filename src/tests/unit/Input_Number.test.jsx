import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NumberInput from "../../components/Input/Input_Number";

describe("NumberInput", () => {
  const defaultProps = {
    id: "experience",
    name: "years_experience",
    label: "Years of Experience",
    placeholder: "Enter years",
    value: 5,
    onChange: vi.fn(),
  };

  it("renders with label and placeholder", () => {
    render(<NumberInput {...defaultProps} />);
    expect(screen.getByLabelText("Years of Experience")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter years")).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    render(<NumberInput {...defaultProps} />);
    const input = screen.getByPlaceholderText("Enter years");
    fireEvent.change(input, { target: { value: "10" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it("displays error message if error is passed", () => {
    render(<NumberInput {...defaultProps} error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toHaveClass("error");
  });

  it("uses default min, max, and step", () => {
    render(<NumberInput {...defaultProps} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("step", "1");
  });
});
