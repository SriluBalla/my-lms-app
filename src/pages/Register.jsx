import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import ConfirmMessage from "../components/ConfirmMsg";
import { supabase } from "../supabaseDB";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { email, password } = formData;

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setMessage({ type: "error", text: signUpError.message });
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage({ type: "error", text: userError?.message || "User not found" });
      return;
    }

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      first_name: null,
      last_name: null,
      preferred_name: null,
      gender: null,
      birth_day: null,
      birth_month: null,
      country: null,
      profile_image_url: null,
      years_experience: null,
      self_intro: null,
      linkedin: null,
      github: null,
    });

    if (profileError) {
      setMessage({ type: "error", text: profileError.message });
      return;
    }

    setMessage({
      type: "success",
      text: "Check your email to confirm your account!",
    });

    // Redirect to profile page
    navigate("/profile");
  };

  return (
    <Layout title="Register" description="Create your account">
      <section className="register-page">
        <div className="body__center">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
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
              value={formData.password}
              onChange={handleChange}
              showRules={false}
              error={formErrors.password}
            />

            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={formErrors.confirmPassword}
            />

            <div className="center-btn">
              <button type="button" className="button">
                Cancel
              </button>
              <button type="submit" className="button">
                Register
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
