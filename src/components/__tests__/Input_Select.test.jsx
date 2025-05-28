// Input_Select.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectInput from "../Input_Select";

describe("SelectInput", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const mockChange = jest.fn();

  it("renders with label and options", () => {
    render(
      <SelectInput
        id="test-select"
        name="testSelect"
        label="Test Select"
        value=""
        onChange={mockChange}
        options={options}
      />
    );

    expect(screen.getByLabelText("Test Select")).toBeInTheDocument();
    expect(screen.getByText("-- Select --")).toBeInTheDocument();
    options.forEach((opt) => {
      expect(screen.getByText(opt)).toBeInTheDocument();
    });
  });

  it("fires onChange when selection changes", () => {
    render(
      <SelectInput
        id="test-select"
        name="testSelect"
        label="Test Select"
        value=""
        onChange={mockChange}
        options={options}
      />
    );

    fireEvent.change(screen.getByLabelText("Test Select"), {
      target: { value: "Option 2" },
    });
    expect(mockChange).toHaveBeenCalledTimes(1);
  });

  it("displays error message if error is present", () => {
    render(
      <SelectInput
        id="test-select"
        name="testSelect"
        label="Test Select"
        value=""
        onChange={mockChange}
        options={options}
        error="Selection is required"
      />
    );

    expect(screen.getByText("Selection is required")).toBeInTheDocument();
  });
});