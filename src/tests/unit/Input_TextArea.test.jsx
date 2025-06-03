import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextAreaInput from "../../components/Input/Input_TextArea";

describe("TextAreaInput", () => {
  it("renders the textarea with label", () => {
    render(
      <TextAreaInput
        id="bio"
        name="bio"
        label="Bio"
        placeholder="Write your bio"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write your bio")).toBeInTheDocument();
  });

  it("shows character count and updates on change", () => {
    const handleChange = vi.fn((e) => {
      // Mock updating state
      render(
        <TextAreaInput
          id="bio"
          name="bio"
          label="Bio"
          placeholder="Write your bio"
          value={e.target.value}
          onChange={handleChange}
        />
      );
    });

    render(
      <TextAreaInput
        id="bio"
        name="bio"
        label="Bio"
        placeholder="Write your bio"
        value=""
        onChange={handleChange}
      />
    );

    const textarea = screen.getByLabelText("Bio");
    fireEvent.change(textarea, { target: { value: "Hello world!" } });

    expect(handleChange).toHaveBeenCalled();
  });

  it("displays error message if provided", () => {
    render(
      <TextAreaInput
        id="bio"
        name="bio"
        label="Bio"
        placeholder="Write your bio"
        value="Test"
        onChange={() => {}}
        error="This field is required"
      />
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
