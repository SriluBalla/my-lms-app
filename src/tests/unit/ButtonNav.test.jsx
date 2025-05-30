import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonNav from "../../components/ButtonNav";

// ✅ Mocks
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ButtonNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("navigates to login page on click", async () => {
    render(<ButtonNav id="login" label="Sign In" to="/login" />);
    await userEvent.click(screen.getByTestId("login"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("navigates to register page on click", async () => {
    render(<ButtonNav id="register" label="Register" to="/register1" />);
    await userEvent.click(screen.getByTestId("register"));
    expect(mockNavigate).toHaveBeenCalledWith("/register1");
  });

  it("does nothing if 'to' is not provided", async () => {
    render(<ButtonNav id="noop" label="No Nav" />);
    await userEvent.click(screen.getByTestId("noop"));
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
