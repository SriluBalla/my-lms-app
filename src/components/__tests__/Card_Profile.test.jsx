import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SavedProfileCard from "../Card_Profile";

describe("SavedProfileCard", () => {
  const mockProfile = {
    preferred_name: "Srilu",
    first_name: "Sridevi",
    last_name: "Balla",
    role: "user",
    country: "USA",
    birth_day: "27",
    birth_month: "December",
    profile_img_url: "",
    linkedin: "https://linkedin.com/in/srilu",
    github: "https://github.com/sriluballa",
    blog: "https://srilu.blog",
    years_experience: 12,
    self_intro: "This is a short intro about Srilu that goes on and on and on...",
  };

  it("renders basic profile info", () => {
    render(<SavedProfileCard profile={mockProfile} />);
    expect(screen.getByText("Srilu")).toBeInTheDocument();
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText(/27 December/)).toBeInTheDocument();
    expect(screen.getByText("USER")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("renders self-intro and toggle button if intro is long", () => {
    const longIntro = "A".repeat(300); // > 200
    const longProfile = { ...mockProfile, self_intro: longIntro };

    render(<SavedProfileCard profile={longProfile} />);

    expect(screen.getByText(/Read more/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Read more/i));
    expect(screen.getByText(/Show less/i)).toBeInTheDocument();
  });

  it("does not render anything if no profile is passed", () => {
    const { container } = render(<SavedProfileCard profile={null} />);
    expect(container.firstChild).toBeNull();
  });
});
