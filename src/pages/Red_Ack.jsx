import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Red_Acknowledment = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Register" description="Create your account page 1">
      <div className="register-page">
        <section className="hero__head">
          <h2>Welcome to Registration</h2>
          <p>
            {" "}
            🤝{" "}
            <strong>
              We’ll be asking for the following information to get to know you
              better and support you effectively throughout your journey.
            </strong>
          </p>
          <p>
            Each detail helps us personalize your experience, recognize your
            accomplishments, and understand how best to guide your growth within
            the Product Owner in Test™ community.
          </p>
        </section>
        <section className="body__left">
          <h4>📛 First & Last Name</h4>{" "}
          <p>
            <i>
              We ask for your full name so that we can personalize your
              certification documents.{" "}
            </i>
            This name will appear exactly as you enter it on any certificates
            you earn through the Product Owner in Test™ platform. Please make
            sure it reflects your legal or preferred professional name — it’s
            what will show up when you share your accomplishments with
            employers, peers, or on LinkedIn.
          </p>
          <h4>📝 Prefered Name</h4>
          <p>
            <i>
              This is the name you'd like us to use when addressing you on the
              platform.{" "}
            </i>{" "}
            It could be a shortened version of your name, a nickname, or any
            name you feel most comfortable being called. We’ll use this name in
            communications, dashboards, and anywhere we greet or refer to you
            personally — because names matter, and we want to get yours right.{" "}
          </p>
          <h4>🌐 Email </h4>
          <p>
            {" "}
            <i>Use a personal email you have long-term access to.</i> This will
            be your primary login credential and the only way to recover your
            account if needed. We won’t use your email for marketing or
            notifications — <b>you won’t get reminder emails or updates </b>{" "}
            from us.
          </p>
          <p>
            Your learning journey is self-driven. We encourage you to bookmark
            the site and check in regularly to stay on track. Think of this
            platform as a commitment you make to yourself — we’re just here to
            support your momentum when you’re ready.
          </p>
          <h4>🔐 Password</h4>
          <p>
            <i>
              Minimum 8 chars, Maximum 50 chars with uppercase, lowercase,
              number, special char
            </i>
          </p>
          <h4> 🚻 Gender </h4>
          <h4>🌎 Country of Residence</h4>
          <p>
            We ask for your country of residence to help us understand your time
            zone and provide a more relevant experience when needed.
          </p>
        </section>
        <section className="body__right">
          <h4>📸 A profile image</h4>
          <p>
            <i>
              Add a photo of yourself so we can identify you and personalize
              your experience. This isn’t about looks — it’s about identity,
              presence, and recognition. A clear, professional photo is perfect.{" "}
            </i>
            Your profile image helps us (and eventually the community) put a
            face to your name. It brings a human touch to your presence on the
            platform — whether you're earning certifications, participating in
            discussions, or showing up in leaderboards or alumni pages.{" "}
          </p>

          <h4>⏳ Years of IT experience</h4>
          <p>
            <i>
              Tell us how long you’ve worked in software development, QA, or
              related fields.
            </i>{" "}
            This helps us better understand your level of expertise so we can
            tailor guidance, challenges, and certification pathways accordingly.
            Whether you’re just starting out or bring decades of experience,
            knowing your background allows us to meet you where you are and
            support your growth more effectively.
          </p>

          <h4>📝 A short self-introduction</h4>
          <p>
            <i>Share anything you'd like us to know about you.</i>This is your
            space to tell us, in your own words, who you are. You might mention
            your current role, what brought you to this platform, your goals,
            passions, or anything that helps us understand you better.
          </p>
          <p>
            It doesn’t have to be formal — just real. We're here to support your
            learning, and knowing a bit about your journey helps us do that
            meaningfully.
          </p>

          <h4> 📅 Birth Day and Month </h4>
          <p>
            <i>We ask for your birth day and month so we can celebrate you!</i>
            Just like we honor achievements, we also want to recognize you as a
            person. Sharing your birthday (no year needed) allows us to show a
            little appreciation on your special day — a simple gesture to say
            you're valued here.{" "}
          </p>

          <h4>🔗 LinkedIn or GitHub or a Blog</h4>
          <p>
            <i>
              Share a link to your professional profile or portfolio — if you
              have one
            </i>
            Whether it’s your LinkedIn, GitHub, blog, or portfolio site, this
            optional field helps us get a deeper sense of your work, background,
            and interests. It’s especially helpful if you’re pursuing
            certifications, mentorship, or recognition within the platform. No
            pressure to share — but if you do, it allows us to better appreciate
            your unique experience and contributions.
          </p>
        </section>

        <div className="body__center">
          <p>
            By clicking <b>“Accept and Continue”</b>, you agree to share the
            information provided above for the purpose of account creation,
            personalized learning, and certification tracking within the Product
            Owner in Test™ platform. Your data will be handled responsibly and
            never shared for marketing purposes.
          </p>

          <div className="center-btn">
            <button className="button" onClick={() => navigate("/register")}>
              Accept and Continue
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Red_Acknowledment;
