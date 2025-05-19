import React, { useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabaseDB";
import TextInput from "../components/TextInput";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");

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
        <div className="body__center">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            
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
              minLength={8}
              maxLength={50}
              placeholder="Min 8 Max 50 chars"
              error={formErrors.password}
            />
            
            <div className="center-btn">
            <button type="submit" className="button">
              Cancel
            </button>
            <button type="submit" className="button">
              Register
            </button>
            </div>
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
