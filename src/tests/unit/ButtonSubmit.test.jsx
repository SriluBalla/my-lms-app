import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonSubmit from "../../components/ButtonSubmit";

describe("ButtonSubmit", () => {
  it("renders with correct label", () => {
    render(<ButtonSubmit id="save" label="Save Profile" />);
    expect(screen.getByTestId("save")).toHaveTextContent("Save Profile");
  });

  it("is disabled when prop is passed", () => {
    render(<ButtonSubmit id="submit" label="Submit" disabled={true} />);
    expect(screen.getByTestId("submit")).toBeDisabled();
  });

  it("submits form when clicked", async () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <form onSubmit={handleSubmit}>
        <ButtonSubmit id="submit" label="Submit" />
      </form>
    );

    await userEvent.click(screen.getByTestId("submit"));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
