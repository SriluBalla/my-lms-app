import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SuccessPopup from "../Msg_in_PopUp";

jest.useFakeTimers();

describe("SuccessPopup", () => {
  it("does not render when message is empty", () => {
    const { container } = render(<SuccessPopup message="" onClose={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the message and close button", () => {
    render(<SuccessPopup message="Saved successfully!" onClose={jest.fn()} />);
    expect(screen.getByText("Saved successfully!")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("×");
  });

  it("calls onClose after 10 seconds", () => {
    const onCloseMock = jest.fn();
    render(<SuccessPopup message="Saved!" onClose={onCloseMock} />);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(<SuccessPopup message="Click close" onClose={onCloseMock} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
