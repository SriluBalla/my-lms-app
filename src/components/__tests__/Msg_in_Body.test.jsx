import React from "react";
import { render, screen } from "@testing-library/react";
import ConfirmMessage from "../Msg_in_Body";

describe("ConfirmMessage", () => {
  it("renders success message", () => {
    render(<ConfirmMessage type="success" text="Saved successfully!" />);
    expect(screen.getByText("Saved successfully!")).toBeInTheDocument();
    expect(screen.getByText("Saved successfully!").parentElement).toHaveClass("msg-success");
  });

  it("renders error message", () => {
    render(<ConfirmMessage type="error" text="Something went wrong." />);
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong.").parentElement).toHaveClass("msg-error");
  });

  it("does not render anything if text is empty", () => {
    const { container } = render(<ConfirmMessage type="info" text="" />);
    expect(container.firstChild).toBeNull();
  });

  it("does not render anything if visible is false", () => {
    const { container } = render(<ConfirmMessage type="warn" text={null} />);
    expect(container.firstChild).toBeNull();
  });
});
