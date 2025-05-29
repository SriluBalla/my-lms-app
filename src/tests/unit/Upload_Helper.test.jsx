import React from "react";
import { describe, it, expect, vi, beforeAll, beforeEach, afterAll } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileImageUploader from "../../components/Upload_Helper";
import imageCompression from "browser-image-compression";

// ✅ Mock createObjectURL
beforeAll(() => {
  globalThis.URL.createObjectURL = vi.fn(() => "mock-url");
});

// ✅ Mock Supabase and imageCompression
vi.mock("browser-image-compression");

vi.mock("../../supabaseDB", () => ({
  supabase: {
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn(() => ({ error: null })),
        getPublicUrl: vi.fn(() => ({
          data: { publicUrl: "https://fake-url.com/image.png" },
        })),
      })),
    },
    from: vi.fn(() => ({
      upsert: vi.fn(() => ({ error: null })),
    })),
  },
}));

import { supabase } from "../../supabaseDB";

describe("ProfileImageUploader", () => {
  const mockOnUpload = vi.fn();
  const testFile = new File(["(⌐□_□)"], "test.png", { type: "image/png" });

  beforeEach(() => {
    vi.clearAllMocks();
    imageCompression.mockResolvedValue(testFile);
  });

  it("renders drag and drop zone and file input", () => {
    render(<ProfileImageUploader userId="abc123" onUpload={mockOnUpload} />);
    expect(screen.getByText(/Drag and drop an image/i)).toBeInTheDocument();
    expect(screen.getByTestId("file-upload")).toBeInTheDocument();
  });

  it("handles file selection and displays preview + upload button", async () => {
    render(<ProfileImageUploader userId="abc123" onUpload={mockOnUpload} />);
    const fileInput = screen.getByTestId("file-upload");

    fireEvent.change(fileInput, {
      target: { files: [testFile] },
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /upload/i })).toBeInTheDocument();
    });
  });

  it("uploads image and calls onUpload on success", async () => {
    render(<ProfileImageUploader userId="abc123" onUpload={mockOnUpload} />);
    const fileInput = screen.getByTestId("file-upload");

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

  it("handles image compression failure", async () => {
    imageCompression.mockRejectedValue(new Error("Compression failed"));

    render(<ProfileImageUploader userId="abc123" onUpload={mockOnUpload} />);
    const fileInput = screen.getByTestId("file-upload");

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

  it.skip("shows error if file is too large", async () => {
    const largeFile = new File(["a".repeat(2 * 1024 * 1024)], "large.png", {
      type: "image/png",
    });

    Object.defineProperty(largeFile, "size", { value: 1.5 * 1024 * 1024 });

    render(<ProfileImageUploader userId="abc123" onUpload={mockOnUpload} />);
    const fileInput = screen.getByTestId("file-upload");

    fireEvent.change(fileInput, {
      target: { files: [largeFile] },
    });

    await waitFor(() => {
      expect(screen.getByTestId("upload-error")).toBeInTheDocument();
      expect(screen.getByTestId("upload-error")).toHaveTextContent(/file must be under 1 mb/i);
    });

    expect(imageCompression).not.toHaveBeenCalled();
  });
});

afterAll(() => {
  globalThis.URL.createObjectURL.mockReset();
});
