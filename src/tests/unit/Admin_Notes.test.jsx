import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AdminNote from "../../components/SQL/Admin_Notes"; // ✅ Confirm the filename

// ✅ Supabase mock
vi.mock("../../supabaseDB", () => {
  return {
    supabase: {
      auth: {
        getUser: vi.fn(),
      },
      from: vi.fn(),
    },
  };
});

import { supabase } from "../../supabaseDB";

describe("AdminNote", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders note when profile is flagged", async () => {
    supabase.auth.getUser.mockResolvedValue({
      data: { user: { id: "123" } },
      error: null,
    });

    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      single: vi
        .fn()
        .mockResolvedValueOnce({
          data: { profile_status: "flagged" },
          error: null,
        })
        .mockResolvedValueOnce({
          data: { note_text: "Please add a real photo" },
          error: null,
        }),
    });

    render(<AdminNote />);

    const note = await screen.findByText((content, element) =>
      content.includes("Please add a real photo") &&
      element?.tagName.toLowerCase() === "p"
    );

    expect(note).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.toLowerCase().includes("flagged"))
    ).toBeInTheDocument();
  });

  it("renders nothing if profile is not flagged", async () => {
    supabase.auth.getUser.mockResolvedValue({
      data: { user: { id: "123" } },
      error: null,
    });

    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValueOnce({
        data: { profile_status: "approved" },
        error: null,
      }),
    });

    const { container } = render(<AdminNote />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
