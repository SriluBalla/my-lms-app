import React from "react";
import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import SEO from "../../components/Global/SEO";

const renderWithHelmet = (ui) =>
  render(<HelmetProvider>{ui}</HelmetProvider>);

describe("SEO component", () => {
  it("renders default SEO tags", async () => {
    renderWithHelmet(<SEO />);

    await waitFor(() => {
      const helmet = document.head;

      expect(helmet.querySelector("title")?.textContent).toBe("Product Owner in Test™");
      expect(helmet.querySelector('meta[name="description"]')?.content).toBe(
        "Explore the powerful POT framework for strategic quality."
      );
      expect(helmet.querySelector('meta[name="keywords"]')?.content).toBe(
        "POT, Product Owner in Test, QA, quality, agile"
      );
    });
  });

  it("renders custom SEO tags", async () => {
    renderWithHelmet(
      <SEO
        title="Custom Title"
        description="Custom description"
        keywords={["custom", "pot", "qa"]}
        image="https://example.com/image.png"
      />
    );

    await waitFor(() => {
      const helmet = document.head;

      expect(helmet.querySelector("title")?.textContent).toBe("Custom Title");
      expect(helmet.querySelector('meta[name="description"]')?.content).toBe("Custom description");
      expect(helmet.querySelector('meta[name="keywords"]')?.content).toBe("custom, pot, qa");

      expect(helmet.querySelector('meta[property="og:image"]')?.content).toBe("https://example.com/image.png");
      expect(helmet.querySelector('meta[name="twitter:image"]')?.content).toBe("https://example.com/image.png");
    });
  });
});
