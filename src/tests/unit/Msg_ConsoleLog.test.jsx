import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConsoleLog from "../../components/Msg_ConsoleLog";

describe("ConsoleLog", () => {
  const sampleLogs = ["Log message 1", { msg: "Log message 2" }];

  it("renders nothing if logs are empty", () => {
    const { container } = render(<ConsoleLog logs={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders Show Logs button when logs exist", () => {
    render(<ConsoleLog logs={sampleLogs} />);
    expect(screen.getByText("Show Logs")).toBeInTheDocument();
  });

  it("toggles logs visibility and shows messages", () => {
    render(<ConsoleLog logs={sampleLogs} />);

    const toggleButton = screen.getByText("Show Logs");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Logs are now visible.")).toBeInTheDocument();
    expect(screen.getByText("Hide Logs")).toBeInTheDocument();
    expect(screen.getByText("Log message 1")).toBeInTheDocument();
    expect(screen.getByText(/"msg": "Log message 2"/)).toBeInTheDocument();

    // Hide again
    fireEvent.click(screen.getByText("Hide Logs"));
    expect(screen.getByText("Logs are hidden.")).toBeInTheDocument();
  });
});
