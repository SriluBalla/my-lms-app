// AdminNote.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AdminNote from "../Admin_Notes"; // ✅ Confirm the filename

jest.mock("../../supabaseDB", () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
    },
    from: jest.fn(),
  },
}));

const { supabase } = require("../../supabaseDB");

describe("AdminNote", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders note when profile is flagged", async () => {
    supabase.auth.getUser.mockResolvedValue({
      data: { user: { id: "123" } },
      error: null,
    });

    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      single: jest
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
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValueOnce({
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
