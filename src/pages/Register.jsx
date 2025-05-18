import React, { useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabaseDB";
import TextInput from "../components/forms/TextInput";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const isValidEmail = (email) => {
  // Checks for: text@text.domain (with a valid domain suffix)
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return pattern.test(email);
};

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const { email, password } = formData;

    if (!isValidEmail(email)) {
  errors.email = 'Please enter a valid email address';
    }

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidPassword = (password) => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return pattern.test(password);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { email, password } = formData;
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({
        type: "success",
        text: "Check your email to confirm your account!",
      });
    }
  };

  return (
    <Layout title="Register" 
    description="Create your account">
    
      <section className="register-page">
        {/* Left: Info Panel */}
        <div className="register-info">
          <h2>Before You Register</h2>
          <p>
            {" "}
            🤝 We will asking for the following information to get to know you
            and work with you efficiently.
          </p>
          <ul>
            <li>
              <strong>First & Last Name</strong> and{" "}
              <strong>Prefered Name</strong>
            </li>
            <li>
              <strong>🌐 Email</strong> (max 100 characters)
            </li>
            <li>
              <strong>🔐 Password</strong> (min 8, max 50 chars with uppercase,
              lowercase, number, special char)
            </li>
            <li>
              <strong>🚻 Gender</strong>{" "}
            </li>
            <li>
              <strong>📅 Birth Day</strong> and <strong>Month</strong> we would
              like to celebrate you.
            </li>
            <li>
              <strong>🌎 Country of Residence</strong> for time zone
            </li>
          </ul>

          <h4>After registration, you'll be asked for:</h4>
          <ul>
            <li>📸 A profile image</li>
            <li>⏳ Years of IT experience</li>
            <li>📝 A short self-introduction</li>
            <li>🔗 (Optional) LinkedIn or GitHub or a blog you have</li>
          </ul>
        </div>

        {/* Right: Form */}
        <div className="register-form">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <h4>To Get to Know you</h4>
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="e.g., Sridevi"
                required
                minLength={1}
                maxLength={50}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="e.g., Balla"
                required
                minLength={1}
                maxLength={50}
              />
            </div>
            <div className="form-group">
              <label htmlFor="preferredName">Preferred Name</label>
              <input
                type="text"
                id="preferredName"
                name="preferredName"
                placeholder="e.g., Srilu"
                maxLength={50}
              />
            </div>
            <div className="form-group dob-group">
              <label htmlFor="dob">
                Birth Month & Day <span className="required">*</span>
              </label>
              <div className="dob-row">
                <select name="birthMonth" required>
                  <option value="">Month</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                <select name="birthDay" required>
                  <option value="">Day</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="country">
                Country of Residence <span className="required">*</span>
              </label>
              <select
                id="country"
                name="country"
                required
                onChange={handleCountryChange}
              >
                <option value="">-- Select Country --</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="India">India</option>
                <option value="Europe">Europe</option>
                <option value="China">China</option>
                <option value="Japan">Japan</option>
                <option value="Africa">Africa</option>
                <option value="Other">Other</option>
              </select>

              {selectedCountry === "Other" && (
                <div className="form-group">
                  <label htmlFor="otherCountry">Type your Country</label>
                  <input
                    type="text"
                    id="customCountry"
                    name="customCountry"
                    placeholder="eg., Wakanda"
                    className="custom-country-input"
                    onChange={handleCountryChange}
                    required
                    minLength={1}
                    maxLength={50}
                  />
                </div>
              )}
            </div>
            <h4>To Login</h4>
            <TextInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="srilu@mail.com"
              maxLength={100}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
              title="Enter a valid email address"
              error={formErrors.email}
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              maxLength={50}
              placeholder="Min 8 Max 50 chars"
              error={formErrors.password}
            />
            `
            <button type="submit" className="nav-button">
              Register
            </button>
          </form>

          {message && (
            <p
              className={message.type === "error" ? "error-msg" : "success-msg"}
            >
              {message.text}
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Register;
