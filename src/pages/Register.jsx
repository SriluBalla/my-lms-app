import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import ConfirmMessage from "../components/ConfirmMsg";
import { supabase } from "../supabaseDB";
import "../styles/main.css";

const Register = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  const validateForm = () => {
    const errors = {};
    const { email, password, confirmPassword } = formData;

    if (!isValidEmail(email)) {
      errors.email = "Valid email address required";
    }

    if (!isValidPassword(password)) {
      errors.password =
        "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    const normalizedEmail = formData.email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: formData.password,
      options: {
        emailRedirectTo: "https://sriluballa.github.io/my-lms-app/",
      },
    });

    if (error) {
      const msg =
        error.message === "User already registered"
          ? "This email is already registered. Please log in instead."
          : error.message;

      setMessage({ type: "error", text: msg });

      if (error.message === "User already registered") {
        setTimeout(() => navigate("/login"), 1500);
      }

      setLoading(false);
      return;
    }

    // Refined success message
    setMessage({
      type: "success",
      text:
        data.user === null
          ? "This email is already registered but not confirmed. A new confirmation email was sent."
          : "Check your email to confirm your account.",
    });

    setLoading(false);
  };

  return (
    <Layout title="Register" description="Create your account">
      <section className="body__outline">
        <div className="body__center">
          <h2>Create Account</h2>
          <form onSubmit={handleRegister}>
            <TextInput
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@mail.com"
              maxLength={100}
              autoComplete="email"
              error={formErrors.email}
            />

            <PasswordInput
              id="password"
              label="Password"
              name="password"
              placeholder="8 to 50, UPPER lower !@#$ 7889"
              value={formData.password}
              onChange={handleChange}
              showRules={false}
              error={formErrors.password}
            />

            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Match the password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={formErrors.confirmPassword}
            />

            <div className="center-btn">
              <button
                type="button"
                className="button"
                id="btn-clear"
                onClick={() =>
                  setFormData({ email: "", password: "", confirmPassword: "" })
                }
              >
                Clear
              </button>

              <button
                type="submit"
                className="button"
                id="btn-Register"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <ConfirmMessage type={message?.type} text={message?.text} />
        </div>
      </section>
    </Layout>
  );
};

export default Register;
