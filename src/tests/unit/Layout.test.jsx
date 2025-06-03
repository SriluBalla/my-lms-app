import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Layout from "../../components/Layout";

// ✅ Mock Header, Footer, and SEO so we can isolate Layout
vi.mock("../../components/Global/Header", () => ({
  default: () => <header data-testid="header">Mock Header</header>,
}));
vi.mock("../../components/Global/Footer", () => ({
  default: () => <footer data-testid="footer">Mock Footer</footer>,
}));
vi.mock("../../components/Global/SEO", () => ({
  default: ({ title, description, keywords }) => (
    <div data-testid="seo">
      SEO: {title} | {description} | {keywords?.join(", ")}
    </div>
  ),
}));

describe("Layout component", () => {
  it("renders header, footer, SEO, and children", () => {
    render(
      <Layout
        title="Test Title"
        description="Test Description"
        keywords={["a", "b", "c"]}
      >
        <div data-testid="child">Child Content</div>
      </Layout>
    );

    // ✅ Assert that all parts are rendered
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("seo")).toHaveTextContent(
      "SEO: Test Title | Test Description | a, b, c"
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Child Content");
  });
});
