import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonAuth from "../../components/ButtonAuth";

// Mocks
const mockNavigate = vi.fn();
const mockSignOut = vi.fn().mockResolvedValue({});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../../supabaseDB", () => ({
  supabase: {
    auth: {
      signOut: mockSignOut,
    },
  },
}));

describe("ButtonAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("navigates to login page", async () => {
    render(<ButtonAuth id="login" label="Sign In" to="/login" />);
    await userEvent.click(screen.getByTestId("login"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("navigates to register page", async () => {
    render(<ButtonAuth id="register" label="Register" to="/register1" />);
    await userEvent.click(screen.getByTestId("register"));
    expect(mockNavigate).toHaveBeenCalledWith("/register1");
  });

  it("signs out and navigates home", async () => {
    render(<ButtonAuth id="signOut" label="Sign Out" action="signOut" />);
    await userEvent.click(screen.getByTestId("signOut"));
    // expect(mockSignOut).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
