import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileImageUploader from "../Upload_Helper";
import imageCompression from "browser-image-compression";

// ✅ Mock Supabase and imageCompression
jest.mock("browser-image-compression");
jest.mock("../../supabaseDB", () => ({
  supabase: {
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(() => ({ error: null })),
        getPublicUrl: jest.fn(() => ({
          data: { publicUrl: "https://fake-url.com/image.png" },
        })),
      })),
    },
    from: jest.fn(() => ({
      upsert: jest.fn(() => ({ error: null })),
    })),
  },
}));

const { supabase } = require("../../supabaseDB");

describe("ProfileImageUploader", () => {
  const mockOnUpload = jest.fn();
  const testFile = new File(["(⌐□_□)"], "test.png", { type: "image/png" });

  beforeEach(() => {
    jest.clearAllMocks();
    imageCompression.mockResolvedValue(testFile);
  });

  it("renders drag and drop zone and file input", () => {
    render(<ProfileImageUploader userId="abc123" onUpload={mockOnUpload} />);
    expect(
      screen.getByText(/Drag and drop an image/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("handles file selection and displays preview + upload button", async () => {
    render(<ProfileImageUploader userId="abc123" onUpload={mockOnUpload} />);
    const fileInput = screen.getByRole("textbox");

    // Simulate file selection
    fireEvent.change(fileInput, {
      target: { files: [testFile] },
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /upload/i })).toBeInTheDocument();
    });
  });

  it("uploads image and calls onUpload on success", async () => {
    render(<ProfileImageUploader userId="abc123" onUpload={mockOnUpload} />);
    const fileInput = screen.getByRole("textbox");

    fireEvent.change(fileInput, {
      target: { files: [testFile] },
    });

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /upload/i }));
    });

    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalledWith("https://fake-url.com/image.png");
      expect(screen.getByText(/Image uploaded and saved successfully/i)).toBeInTheDocument();
    });
  });

  it("shows error if file is too large", async () => {
    const largeFile = new File(["a".repeat(2 * 1024 * 1024)], "large.png", {
      type: "image/png",
    });
    Object.defineProperty(largeFile, "size", { value: 2 * 1024 * 1024 });

    render(<ProfileImageUploader userId="abc123" onUpload={mockOnUpload} />);
    const fileInput = screen.getByRole("textbox");

    fireEvent.change(fileInput, {
      target: { files: [largeFile] },
    });

    await waitFor(() => {
      expect(screen.getByText(/Original file must be under 1 MB/i)).toBeInTheDocument();
    });
  });

  it("handles image compression failure", async () => {
    imageCompression.mockRejectedValue(new Error("Compression failed"));

    render(<ProfileImageUploader userId="abc123" onUpload={mockOnUpload} />);
    const fileInput = screen.getByRole("textbox");

    fireEvent.change(fileInput, {
      target: { files: [testFile] },
    });

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /upload/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/Image compression failed/i)).toBeInTheDocument();
    });
  });
});
