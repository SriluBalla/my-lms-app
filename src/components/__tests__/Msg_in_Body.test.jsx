import React from "react";
import { render, screen } from "@testing-library/react";
import ConfirmMessage from "../Msg_in_Body";

describe("ConfirmMessage", () => {
  it("renders success message", () => {
    render(<ConfirmMessage type="success" text="Saved successfully!" />);
    expect(screen.getByText("Saved successfully!")).toBeInTheDocument();
  });

  it("hides message when no text provided", () => {
    render(<ConfirmMessage type="info" text="" />);
    const msg = screen.queryByText(/./); // any content
    expect(msg).toBeNull();
  });
});
