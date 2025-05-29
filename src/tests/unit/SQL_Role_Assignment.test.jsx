import React from "react"; // ✅ Required for JSX
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../../components/SQL_Role_Assignment";

// 🔥 Important: DO NOT import `supabase` directly — let Vitest mock it
vi.mock("../../supabaseDB", () => {
  // Declare internal mocks
  const getUser = vi.fn();
  const single = vi.fn();

  return {
    supabase: {
      auth: {
        getUser,
      },
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single,
      })),
    },
  };
});

// ✅ Access the mocked supabase after it's created
import { supabase } from "../../supabaseDB";

const MockChild = () => <div>Allowed Content</div>;

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to /signin when no user is logged in", async () => {
    supabase.auth.getUser.mockResolvedValue({ data: { user: null } });

    render(
      <MemoryRouter>
        <ProtectedRoute allowedRoles={["admin"]}>
          <MockChild />
        </ProtectedRoute>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Allowed Content")).not.toBeInTheDocument();
    });
  });

  it("redirects to /signin when user role is not allowed", async () => {
    supabase.auth.getUser.mockResolvedValue({ data: { user: { id: "123" } } });
    supabase.from().single.mockResolvedValue({ data: { role: "user" } });

    render(
      <MemoryRouter>
        <ProtectedRoute allowedRoles={["admin"]}>
          <MockChild />
        </ProtectedRoute>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Allowed Content")).not.toBeInTheDocument();
    });
  });

  it("renders children when user role is allowed", async () => {
    supabase.auth.getUser.mockResolvedValue({ data: { user: { id: "123" } } });
    supabase.from().single.mockResolvedValue({ data: { role: "admin" } });

    render(
      <MemoryRouter>
        <ProtectedRoute allowedRoles={["admin"]}>
          <MockChild />
        </ProtectedRoute>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Allowed Content")).toBeInTheDocument();
    });
  });
});
