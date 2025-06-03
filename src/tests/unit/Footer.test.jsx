// __tests__/Footer.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../../components/Global/Footer";

describe("Footer", () => {
  it("renders all footer links", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
    expect(screen.getByText(/privacy/i)).toBeInTheDocument();
  });

 it("displays the current year", async () => {
  const year = new Date().getFullYear();
  const { container } = render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  expect(container.textContent).toContain(`${year}`);
});

});
