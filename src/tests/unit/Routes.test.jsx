import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import appRoutes from "../../components/Routes";
import { supabase } from "../../supabaseDB";
import { HelmetProvider } from "react-helmet-async"; // ✅ ADD THIS

// ✅ Supabase mock setup (place this before importing supabase)
vi.mock("../../supabaseDB", () => {
  const mockRoleData = { role: "admin" };
  const mockProfileData = { first_name: "Srilu" };

  return {
    supabase: {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: "123" } } }),
        getSession: vi
          .fn()
          .mockResolvedValue({ data: { session: { user: { id: "123" } } } }),
        onAuthStateChange: vi.fn((callback) => {
          // Immediately invoke callback for testing
          callback("SIGNED_IN", { user: { id: "123" } });
          return { data: { subscription: { unsubscribe: vi.fn() } } };
        }),
      },
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: mockRoleData }),
            maybeSingle: vi.fn().mockResolvedValue({ data: mockProfileData }),
          })),
        })),
      })),
    },
  };
});

// ✅ Helper to render with routing
const renderRoute = (initialPath = "/") => {
  return render(
    <HelmetProvider>
      {" "}
      {/* ✅ Wrap routes */}
      <MemoryRouter initialEntries={[initialPath]}>
        <RouterRoutes>
          {appRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </RouterRoutes>
      </MemoryRouter>
    </HelmetProvider>
  );
};
describe("App Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders public route: Home page", async () => {
    renderRoute("/");

    await waitFor(() => {

    expect(screen.getByRole("heading", { name: /Product Owner in Test™/i })).toBeInTheDocument();
        // expect(screen.getByText(/Product Owner in Test™/i)).toBeInTheDocument(); // Adjust as needed
    });
  });

 it("renders protected route for authenticated user with allowed role", async () => {
  supabase.auth.getUser.mockResolvedValue({
    data: { user: { id: "123" } },
  });

  renderRoute("/profile");

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: "Your Profile" })
    ).toBeInTheDocument();
  });
});

  });