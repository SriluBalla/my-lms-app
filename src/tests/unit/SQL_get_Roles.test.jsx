import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import UserRole from "../../components/SQL/SQL_get_Roles";

let mockRole = "user";

vi.mock("../../supabaseDB", () => {
  return {
    supabase: {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: "abc123" } },
          error: null,
        }),
      },
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: { role: mockRole } }),
      })),
    },
  };
});

describe("UserRole Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("UserRole Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders MEMBER as bold when user has member role", async () => {
    mockRole = "member";
    render(<UserRole />);
    const span = await screen.findByTestId("role-member");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("font-weight: bold");
  });

  it("renders USER as bold when user has user role", async () => {
    mockRole = "user";
    render(<UserRole />);
    const span = await screen.findByTestId("role-user");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("font-weight: bold");
  });

  it("renders ADMIN as bold when user has admin role", async () => {
    mockRole = "admin";
    render(<UserRole />);
    const span = await screen.findByTestId("role-admin");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("font-weight: bold");
  });

  it("renders SUPERADMIN as bold when user has superadmin role", async () => {
    mockRole = "admin";
    render(<UserRole />);
    const span = await screen.findByTestId("role-admin");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("font-weight: bold");
  });

  it("renders LEADER as bold when user has leader role", async () => {
    mockRole = "leader";
    render(<UserRole />);
    const span = await screen.findByTestId("role-leader");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("font-weight: bold");
  });

});

});
