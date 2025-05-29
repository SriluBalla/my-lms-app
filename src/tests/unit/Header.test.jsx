import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../../components/Header";

// Mock navigate from react-router
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock Supabase
vi.mock("../../supabaseDB", () => {
  return {
    supabase: {
      auth: {
        getSession: vi.fn(),
        onAuthStateChange: vi.fn((cb) => {
          cb("SIGNED_IN", { user: { id: "123" } });
          return { data: { subscription: { unsubscribe: vi.fn() } } };
        }),
        signOut: vi.fn(),
      },
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: {
            profile_img_url: "https://mock-url.com/profile.png",
          },
        }),
      })),
    },
  };
});

import { supabase } from "../../supabaseDB";

const renderHeader = () =>
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

describe("Header component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders logo and navigation links", async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
    });

    renderHeader();

    expect(screen.getByAltText(/product owner in test logo/i)).toBeInTheDocument();
    expect(screen.getByText(/product owner in test/i)).toBeInTheDocument();
  });

  it("shows Sign In and Register when not logged in", async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
    });

    renderHeader();

    await waitFor(() => {
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
      expect(screen.getByText(/register/i)).toBeInTheDocument();
    });
  });

  it("shows profile image and dropdown when logged in", async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: { user: { id: "123" } } },
    });

    renderHeader();

    const profileImg = await screen.findByAltText(/profile/i);
    expect(profileImg).toBeInTheDocument();

    // Click profile icon to show dropdown
    fireEvent.click(profileImg);

    await waitFor(() => {
      expect(screen.getByText(/^sign out$/i)).toBeInTheDocument();
      expect(screen.getByText(/^profile$/i)).toBeInTheDocument();
    });
  });

  it("calls supabase.auth.signOut when clicking Sign Out", async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: { user: { id: "123" } } },
    });

    renderHeader();

    const profileImg = await screen.findByAltText(/profile/i);
    fireEvent.click(profileImg);

    const signOutBtn = await screen.findByText(/sign out/i);
    fireEvent.click(signOutBtn);

    await waitFor(() => {
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });
});
