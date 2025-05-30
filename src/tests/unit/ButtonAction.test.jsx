import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonAction from "../../components/ButtonAction";

describe("ButtonAction", () => {
  const mockClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with label and calls onClick when clicked", async () => {
    render(<ButtonAction id="upload" label="Upload" onClick={mockClick} />);
    const button = screen.getByTestId("upload");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Upload");

    await userEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("renders as disabled when prop is true", async () => {
    render(
      <ButtonAction
        id="upload"
        label="Upload"
        onClick={mockClick}
        disabled={true}
      />
    );
    const button = screen.getByTestId("upload");

    expect(button).toBeDisabled();

    await userEvent.click(button);
    expect(mockClick).not.toHaveBeenCalled();
  });

  it("shows 'Uploading...' as label when isLoading is true", () => {
    render(
      <ButtonAction
        id="upload"
        label="Upload"
        loadingLabel="Uploading..."
        isLoading={true}
        onClick={mockClick}
      />
    );

    const button = screen.getByTestId("upload");
    console.log("🧪 BUTTON disabled =", button.disabled);
    console.log("🧪 BUTTON text =", button.textContent);

    expect(button).toHaveTextContent("Uploading...");
  });

  it("applies extra CSS classes", () => {
    render(
      <ButtonAction
        id="upload"
        label="Upload"
        className="flagged"
        onClick={mockClick}
      />
    );
    const button = screen.getByTestId("upload");
    expect(button.className).toContain("flagged");
  });
});
