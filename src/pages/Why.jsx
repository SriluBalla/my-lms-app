import Layout from "../components/Layout";
import "../styles/main.css";

const Why = () => {
  return (
    <Layout
      title="Why do we need a POT"
      description="Why do we need a Product Owner in Test, while we have a role of Quality Assurance anaylst or Tester already available"
      keywords={[
        "Quality Assurance",
        "Product Owner in Test",
        "Quality Control",
      ]}
    >
      <div className="body__outline">
        <section className="hero lite-blue flex">
          <div className="hero-text">
            <h1>Rethinking the Testing Role in Software Development</h1>

            <p>
              Quality Assurance (QA) has long been an essential part of the
              software development process. However, much like processes such as
              Scrum and Agile, QA practices are also directly derived from{" "}
              <b>manufacturing methodologies.</b>{" "}
            </p>

            <p>
              {" "}
              In manufacturing, the production process begins after identifying
              specific needs and requirements. Following research and
              development, prototypes are tested by beta customers. Once the
              product enters the manufacturing phase, the Quality Assurance (QA)
              team steps in with a checklist to evaluate the product based on a
              resources provided, time line and expected product quality.{" "}
            </p>

            <p>
              {" "}
              In manufacturing, the primary focus is on the product. An entire
              role, <b>Quality Control</b>, was created specifically to check
              the product that has been produced, even if the formula has not
              changed in years. The expectations in manufacturing are very clear
              and well-defined.{" "}
            </p>

            <p>
              {" "}
              <b>Software development</b>, on the other hand, is unique with
              every feature, element, integration, and schema. Unlike
              manufacturing, where products are mass-produced in batches with
              proven requirements, software is developed one time only, often
              without extensive R&D or prototyping. Consequently, traditional
              manufacturing processes have been inadequate for software
              development for decades.
            </p>
          </div>

          <figure>
            <img
              className="hero-image"
              src={`${import.meta.env.BASE_URL}images/why/qcBefore.png`}
              alt="Quality Control in manufacturing and other sectors"
            />

            <em className="image-caption">Quality control in manufacturing.</em>
          </figure>
        </section>

        {/* Core Challenges */}
        <section className="hero heading">
          <h1>
            🚧 <u>The Core Challenges </u>
          </h1>
        </section>

        {/* QA Challenges  */}

        <section className="hero blue flex">
          <figure>
            <img
              className="hero-image"
              src={`${import.meta.env.BASE_URL}images/why/automation.png`}
              alt="Automation is a tool that does what you tell it to do"
            />
            <em className="image-caption">
              Automation is a tool that does what you tell it to do
            </em>
          </figure>
          <div className="hero-text">
            <h3>Overreliance on Automation</h3>
            <p>
              Automation is a tool that does what a human tells it to do. It
              certain cases automation is essential — but it’s not a substitute
              for human insight. Many organizations mistakenly assume that
              automated scripts alone can ensure product quality, ignoring the
              value of exploratory testing, contextual analysis, and nuanced
              user empathy that only humans provide.
            </p>
          </div>
        </section>

        <section className="hero lite-blue flex">
          <div className="hero-text">
            <h3>Lack of Standardization</h3>
            <p>
              Reports and documentation (bugs and test cases) created by one
              person are hard for others to understand and utilize. QA
              documentation often lacks consistency or clarity. Without a
              standard structure, teams struggle to understand, reuse, or build
              upon QA outputs — weakening collaboration and reducing efficiency.
            </p>
          </div>
          <figure>
            <img
              className="hero-image"
              src={`${import.meta.env.BASE_URL}images/why/tc_confusion.png`}
              alt="Cant understand test cases"
            />

            <em className="image-caption">
              It is hard to understand some one else's test cases or bug reports
            </em>
          </figure>
        </section>

        <section className="hero blue flex">
          <figure>
            <img
              className="hero-image"
              src={`${import.meta.env.BASE_URL}images/why/redGreen.png`}
              alt="Cant understand test cases"
            />

            <em className="image-caption">
              Acceptance criteria checking is not Testing
            </em>
          </figure>
          <div className="hero-text">
            <h3>Process Confusion: Testing vs Acceptance Checking</h3>

            <p>
              Many teams confuse acceptance criteria validation with actual
              product testing. While acceptance checks are necessary, they
              represent only a small fraction of what real-world testing should
              encompass.
            </p>
          </div>
        </section>

        <section className="hero lite-blue flex">
          <div className="hero-text">
            <h3>“Bug Finders” and “Final Step”</h3>
            <p>
              {" "}
              QA is often perceived merely as “bug finders” or a procedural
              “final step” in the development process. How many times have we
              heard,{" "}
              <i>
                “Hey, the feature is done — QA can go find any bugs now”?
              </i>{" "}
              This mindset reinforces the idea that QA exists only to react,
              rather than to contribute proactively to the product. When teams
              limit QA to issue detection, they overlook the strategic value QA
              brings to design thinking, usability, risk analysis, and data
              validation. By treating QA as an afterthought and not
              acknowledging their broader capabilities, organizations miss out
              on deeper product insight and long-term quality improvements.{" "}
            </p>
          </div>
          <figure>
            <img
              className="hero-image"
              src={`${import.meta.env.BASE_URL}images/why/finalStep.png`}
              alt="Final Step"
            />

            <em className="image-caption">
              QA is seen as bug catchers and a final step
            </em>
          </figure>
        </section>

        <section className="hero blue flex">
          <figure>
            <img
              className="hero-image"
              src={`${import.meta.env.BASE_URL}images/why/chimera.png`}
              alt="Chimera"
            />

            <em className="image-caption">
              It is hard to understand some one else's test cases or bug reports
            </em>
          </figure>
          <div className="hero-text">
            <h3>Living in the tickets and stories</h3>
            <p>
              QA teams are frequently restricted to verifying what's written in
              tickets / stories — a fragmented view that ignores product as a
              whole -wide behaviors, cross-system integration, and real user
              journeys. This siloed approach results in missed edge cases,
              brittle releases.
            </p>
          </div>
        </section>

        <section className="hero lite-blue flex">
          <div className="hero-text">
            <h3>QA Role Is Marginalized</h3>

            <p>
              Whether in Waterfall or Agile frameworks, the role of QA has
              largely remained unchanged. QA professionals are still expected to
              write test cases based solely on requirements—often before they’ve
              had any real opportunity to interact with the product itself.
              These test cases are then reused throughout the product’s
              lifecycle to check for regression issues. However, the core
              problem lies in this approach: test cases crafted without
              firsthand experience of the product lack critical context—such as
              how inputs and outputs behave, how users actually engage with the
              system, and what external applications the product integrates
              with.{" "}
            </p>
          </div>
          <figure>
            <img
              className="hero-image"
              src={`${import.meta.env.BASE_URL}images/why/testBefore.png`}
              alt="Cant understand test cases"
            />

            <em className="image-caption">
              We are still expected to document test cases to something that is
              not yet built
            </em>
          </figure>
        </section>

        <section className="hero blue flex">
          <figure>
            <img
              className="hero-image"
              src={`${import.meta.env.BASE_URL}images/why/scapegoat.png`}
              alt="Scapegoat Illustration - QA gets blamed"
            />

            <em className="image-caption">QA is scapegoat.</em>
          </figure>
          <div className="hero-text">
            <h2>QA as the Scapegoat</h2>
            <p>
              QA teams are often invisible when things go right—and front and
              center when they don’t. In production crises, QA becomes the
              easiest target for blame, despite being excluded from early
              decisions and given minimal control over quality gates. The moment
              an issue appears, all eyes turn to QA for answers and
              accountability. Ironically, in many of these cases, QA had already
              flagged the risks. Their warnings were ignored—yet they’re still
              the ones held responsible when those risks become reality.
            </p>
          </div>
        </section>

        <section className="hero lite-blue flex">
          <div className="hero-text">
            <h3>Lack of Organizational Understanding about Testing </h3>

            <p>
              Even when QA professionals raise valid concerns or propose
              meaningful improvements, their voices are often overlooked or
              deprioritized. Their insights are undervalued, their expertise
              routinely dismissed, and their recommendations left unacted upon.
              This fosters a culture of passive compliance—where QA follows
              instructions instead of owning quality—undermining both product
              integrity and team morale.
            </p>
          </div>
          <figure>
            <img
              className="hero-image"
              src={`${import.meta.env.BASE_URL}images/why/bomb.png`}
              alt="No one listens to the Tester"
            />
            <em className="image-caption">No one listens to the person with hands on knowledge about the product.</em>
          </figure>
        </section>

        <section className="hero blue flex">
          <figure>
            <img
              className="hero-image"
              src={`${import.meta.env.BASE_URL}images/why/blameQA.png`}
              alt="Cant understand test cases"
            />

            <em className="image-caption">The blame game</em>
          </figure>
          <div className="hero-text">
            <h3>The Impact</h3>
            <p>
              This fragmented approach creates a fragile QA ecosystem—where
              quality becomes a checkbox, not a mindset. Confidence erodes, "bug
              blame" turns political, and no one truly sees the product in its
              entirety. The result? Missed risks, reactive firefighting, and a
              growing disconnect between what’s built and what users actually
              experience.
            </p>
          </div>
        </section>

        {/* Optional CTA  */}
        <section className="hero lite-blue flex">
          <h2>A new Testing Role — With a Singular Focus on the PRODUCT</h2>
          <p>
            We can’t expect different results by repeating the same approaches.
            It’s time for more than just a role change — we need a new
            framework. One that centers entirely on the product, not just the
            process, politics, or tools.
          </p>
          <p>
            {" "}
            Introducing{" "}
            <a href="/product-owner-in-test.html">Product Owner in Test™</a> — a
            role designed to illuminate the product for the entire organization.
            From engineering to marketing to leadership, this role ensures
            everyone sees and understands how the product truly behaves,
            evolves, and delivers value. It’s not about chasing bugs — it’s
            about owning the product experience through testing.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Why;
