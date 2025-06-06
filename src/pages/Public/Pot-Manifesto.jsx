import React from "react";
import Layout from "../../components/Layout";
import "../../styles/main.css";

const PotManifesto = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout
      title="Manifesto"
      description="Welcome to your personalized learning portal."
      keywords={["lms", "courses", "dashboard"]}
    >
      <div className="body__outline">
        <section className="hero heading">
          <div className="hero-text">
            <h1>Manifesto</h1>

            <ul className="bullet-no bullet-link">
              <li
                onClick={() => scrollToSection("product-over-process")}
                className="bBlue-bgBlue"
              >
                <b>Product</b> over <i>Process</i>
              </li>
              <li
                onClick={() => scrollToSection("opportunities-to-improve")}
                className="bOrange-bgYellow"
              >
                <b>Opportunities to Improve</b> not <i>Bugs to Squash</i>
              </li>
              <li
                onClick={() => scrollToSection("how-does-it-work")}
                className="bGreen-bgGreen"
              >
                <b>How does It Work?</b> not <i>Pass or Fail</i>
              </li>
              <li
                onClick={() => scrollToSection("complete-product-exploration")}
                className="bNavy-bgBlue"
              >
                <b>Complete Product Exploration</b> not{" "}
                <i>Isolated Verification</i>
              </li>
              <li
                onClick={() => scrollToSection("check-cases-after-exploration")}
                className="bPurple-bgViolet"
              >
                <b>Check Cases After Exploration</b> not{" "}
                <i>Test Cases From Assumptions</i>
              </li>
              <li
                onClick={() => scrollToSection("guiding-principles")}
                className="guiding-principle"
              >
                Guiding Principles
              </li>
            </ul>
          </div>
        </section>

        <section className="hero bBlue-bgBlue" id="product-over-process">
          <div className="hero-text">
            <h2>
              Product <em>Over</em> <i>Process</i>
            </h2>
            <div>
              <ul className="manifesto-points">
                <li>We do not serve the process—we serve the product.</li>
                <li>
                  Processes are tools, not goals. They can guide us, but they
                  must never blind us.
                </li>
                <li>We bypass rituals that ignore reality.</li>
                <li>
                  We prioritize working features, actual behavior, and user
                  experience over procedural perfection.
                </li>
                <li>
                  We adapt the process to fit the product exploration, NOT the
                  other way around.
                </li>
                <li>
                  Because what matters most is not how well we followed the
                  process — but what we actually built for the people who use
                  it.
                </li>
              </ul>

              <div className="manifesto-poem bgPoem">
                <p>The checklist never felt the pain.</p>
                <p>The template never tapped the screen.</p>
                <p> Only the product holds the truth.</p>
                <p>
                  So we follow the product, Not the path someone else drew on a
                  paper.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="hero bOrange-bgYellow"
          id="opportunities-to-improve"
        >
          <div className="hero-text">
            <h2>
              Opportunities to Improve, <em>Not</em> <i>Bugs to Squash</i>
            </h2>
            <div>
              <ul className="manifesto-points">
                <li>
                  Every issue we encounter is a signal—an opportunity to refine,
                  reimagine, or reinforce the product.{" "}
                </li>
                <li>
                  We do not hunt for flaws to assign blame or simply hand them
                  off for fixing.
                </li>
                <li>
                  Instead, we observe where the product diverges from user
                  expectations or intended value, and we use that insight to
                  guide meaningful improvement.
                </li>
                <li>
                  Our goal is not to say, “Something is broken,” but to ask,
                  “How can this issue be solved for good?”
                </li>
              </ul>
            </div>
            <div className="manifesto-poem bgPoem">
              <p>We don’t chase flaws with a hammer in hand.</p>
              <p>We do not hunt defects. We uncover possibilities.</p>
              <p>
                {" "}
                We’re not here to point fingers. We’re here to make things
                better.
              </p>
              <p>We listen—to every crash, every silence, every stumble.</p>
              <p>
                Each whisper from the product, telling us where it aches, where
                it longs to grow.
              </p>
            </div>
          </div>
        </section>

        <section className="hero bGreen-bgGreen" id="how-does-it-work">
          <div className="hero-text">
            <h2>
              How Does It Work? <em>Not </em> <i>Pass or Fail</i>
            </h2>
            <div>
              <ul className="manifesto-points">
                <li>
                  The product is what it is—not what it was meant to be. Our
                  goal is not to declare whether a feature <u>“passes”</u> or{" "}
                  <u>“fails,”</u> but to uncover how it behaves in the real
                  world, under real conditions.
                </li>
                <li>
                  Testing is not a checkbox exercise—it is an act of discovery.
                  By examining the product as a whole, we surface
                  inconsistencies in user experience, data handling, storage
                  practices, accessibility, integration behavior, performance
                  boundaries, and more.
                </li>
                <li>
                  We ask, “How does it really work?”—not just{" "}
                  <i>“Does it meet the requirement?”</i>
                  That simple shift turns testing into insight, and insight into
                  progress.
                </li>
                <li>
                  Not every truth lives in a checklist. A product is more than
                  what it was supposed to be— it is what it has become.
                </li>
              </ul>
            </div>
            <div className="manifesto-poem bgPoem">
              <p>We don’t just ask, “Did it pass?”</p>
              <p>We ask, “What does this do in the hands of the user?”</p>
              <p>
                {" "}
                We trace how data flows, how screens connect, how a single
                feature ripples across the system.
              </p>
              <p>We don’t validate intentions. We reveal behavior.</p>
            </div>
          </div>
        </section>

        <section
          className="hero bNavy-bgBlue"
          id="complete-product-exploration"
        >
          <div className="hero-text">
            <h2>
              Complete Product Exploration, <em>Not</em>{" "}
              <i>Isolated Verification</i>
            </h2>
            <div>
              <ul className="manifesto-points">
                <li>
                  Requirement verification asks, “Does this unit meet
                  expectations?”
                </li>
                <li>
                  Product exploration goes deeper and asks, “How does the whole
                  product behave?”
                </li>
                <li>
                  We observe for consistancy among the product in pages, in
                  features, in codding standards, in motion—in integration, in
                  user flow, in real-world edge cases.
                </li>
                <li>
                  We examine how it behaves when systems talk to each other,
                  when data flows across boundaries, when user paths twist in
                  unexpected ways.
                </li>
                <li>
                  True insight does not come from confirming what we already
                  believe. It comes from discovering what we didn’t think to
                  ask.
                </li>
                <li>
                  Exploration is how we learn what the product truly is, not
                  just what it was supposed to be.
                </li>
              </ul>
            </div>
            <div className="manifesto-poem bgPoem">
              <p>Boxes don’t build confidence.</p>
              <p>Pass marks don’t tell stories.</p>
              <p>
                We don’t peek at parts in isolation— We walk the halls of the
                product, opening doors, turning corners, asking,{" "}
                <i>“What happens when…?”</i>
              </p>
              <p>
                Requirements tell us what was imagined. Exploration reveals what
                was made.
              </p>
            </div>
          </div>
        </section>

        <section
          className="hero bPurple-bgViolet"
          id="check-cases-after-exploration"
        >
          <div className="hero-text">
            <h2>
              Check Cases After Exploration,<em> Not </em>{" "}
              <i>Test Cases From Assumptions </i>
            </h2>
            <div>
              <ul className="manifesto-points">
                <li>
                  We write check cases after we’ve explored the product— not
                  test cases built from assumptions in the requirements.
                </li>
                <li>
                  Test cases written too early—based on incomplete specs or
                  imagined behavior—often validate intention but miss reality.
                </li>
                <li>
                  Check cases are grounded in truth. They capture how the
                  product actually behaves: with action steps, data from
                  databases, annotated screenshots, and contextual knowledge.
                </li>
                <li>
                  We support the product through releases, updates, audits, and
                  user support, because they reflect what is real.
                </li>

                <li>
                  We pay attention to visual inconsistencies, data insights,
                  system interactions, or UX friction points that only surface
                  through use.
                </li>
                <li>
                  Exploration comes first. Documentation follows from the
                  understanding, not the other way around.
                </li>
              </ul>
            </div>

            <div className="manifesto-poem bgPoem">
              <p>You can’t write a map for a land you haven’t walked.</p>
              <p>We do not invent steps, we trace them.</p>
              <p> We do not assume data, we observe it.</p>
              <p>We do not guess what should happen, we test what does.</p>
              <p>
                Check cases are crafted after the journey, not drawn from
                wishful blueprints.
              </p>
              <p>
                Because only after we know the product can we truly support it.
              </p>
            </div>
          </div>
        </section>

        <section id="guiding-principles" className="hero guiding-principle">
          <h2>🧭 Guiding Principles</h2>

          <div className="principle">
            <h3>We are Quality Assistants. We are not Quality Assurance.</h3>

            <h4>Quality is everyone’s responsibility.</h4>
            <p>
              {" "}
              Quality cannot be measured by pass rates or assured by documents.
              But it can be <strong>supported</strong>,{" "}
              <strong>observed</strong>, and <strong>refined</strong> through
              collaborative effort. Our role is to{" "}
              <strong>assist teams, products, and organizations</strong> in
              doing their best work— not by policing the process, but by
              exploring the product and sharing what we find.
            </p>
          </div>

          <div className="principle">
            <h3>You cannot weigh the baby until it’s born.</h3>
            <p>
              You can’t measure value from diagrams, specs, or intentions alone.
              <br />
              Checking small, disconnected pieces of a product—even over and
              over—doesn’t reveal its true nature. You need something working.
              Something whole. Only then can we observe, interact, and
              understand what has truly been built.
            </p>
          </div>

          <div className="principle">
            <h3>
              We stand at the product’s edge—where development ends and reality
              begins.
            </h3>
            <p>
              Clean code and clear requirements are great—but they are not the
              product.
              <br />
              The product begins where plans end and usage begins. We test
              what’s <strong>real</strong>, not what’s <strong>expected</strong>
              .<br />
              Only by engaging with the product as a whole can we discover how
              it actually behaves in the hands of a user.
            </p>
          </div>

          <div className="principle">
            <h3>Every working feature deserves to be questioned.</h3>
            <p>
              Just because it functions doesn’t mean it helps.
              <br />
              We ask:
              <ul>
                <li>
                  Does it meet the <strong>user’s need</strong>?
                </li>
                <li>
                  Does it <strong>integrate well</strong> with the rest of the
                  product?
                </li>
                <li>
                  Does it <strong>add value</strong> or introduce confusion?
                </li>
              </ul>
              A feature that "works" may still be <em>wrong</em> in the context
              of the product’s goals.
            </p>
          </div>

          <div className="principle">
            <h3>
              We do not “break” the product—we discover where it is broken.
            </h3>
            <p>
              We don’t cause the issue—we reveal it.
              <br />
              We do not test to destroy. We test to discover, to understand, and
              to support the team in making the product stronger.
            </p>
          </div>

          <div className="principle">
            <h3>Check Cases are not renamed Test Cases.</h3>
            <p>
              We don’t just verify what’s expected—we uncover what <em>is</em>.
              <br />
              Check cases are written <strong>after exploration</strong>, not
              before development.
              <br />
              They serve to document reality:
              <ul>
                <li>What does this product do?</li>
                <li>How does it behave under different conditions?</li>
                <li>What data flows through it, and where are the seams?</li>
              </ul>
              A well-crafted check case helps anyone—developer, stakeholder, or
              support rep— understand how the product works and where it might
              be improved.
            </p>
          </div>

          <div className="principle">
            <h3>We seek understanding, not just validation.</h3>
            <p>
              Validation asks, <b>“Did we build it right?”</b>
              <br />
              Understanding asks, <b>“What have we really built?”</b>
              <br />
              We pursue the kind of knowledge that helps people fix, improve,
              connect, and evolve the product—not just ship it.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PotManifesto;
