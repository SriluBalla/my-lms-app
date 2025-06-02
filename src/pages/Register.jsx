import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TextInput from "../components/Input_TextField";
import PasswordInput from "../components/Input_Password";
import ConfirmMessage from "../components/Msg_in_Body";
import { supabase } from "../supabaseDB";
import "../styles/main.css";

const Register = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
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
      setMessage({ type: "error", text: "Valid email address required." });
      return false;
    }

    if (!isValidPassword(password)) {
      setMessage({
        type: "warn",
        text: "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters.",
      });
      return false;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "warn", text: "Passwords do not match." });
      return false;
    }

    setFormErrors(errors);
    return true;
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   if (loading) return;

  //   setMessage({ type: "", text: "" });

  //   if (!validateForm()) return;

  //   setLoading(true);

  //   const normalizedEmail = formData.email.trim().toLowerCase();

  //   const { error } = await supabase.auth.signUp({
  //     email: normalizedEmail,
  //     password: formData.password,
  //     options: {
  //       emailRedirectTo: "https://sriluballa.github.io/my-lms-app/",
  //     },
  //   });

  //   if (error) {
  //     const msg =
  //       error.message === "User already registered"
  //         ? "This email is already registered. Please log in instead."
  //         : error.message;

  //     setMessage({ type: "error", text: msg });

  //     if (error.message === "User already registered") {
  //       setTimeout(() => navigate("/login"), 2000);
  //     }

  //     setLoading(false);
  //     return;
  //   }

  //   setMessage({
  //     type: "success",
  //     text: "Check your email to confirm your account 📬",
  //   });
  //   setTimeout(() => navigate("/profile"), 1500);
  //   setLoading(false);
  // };

  // Inside your Register.jsx component's handleRegister function:
  const handleRegister = async (e) => {
    e.preventDefault(); // Ensure this is present
    // ... (your validation logic) ...

    if (isValid) {
      // Assuming you have an isValid check
      console.log("handleRegister: Validation passed, attempting signup..."); // <--- ADD THIS
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        // ... rest of your logic
      } catch (error) {
        console.error("Supabase signUp threw an error:", error); // <--- ADD THIS
        // ...
      }
    } else {
      console.log("handleRegister: Validation failed, not calling signUp."); // <--- ADD THIS
    }
  };
  return (
    <Layout title="Register" description="Create your account">
      
      <section className="body__outline">
      
        <div className="hero bGreen-bgGreen">
          <h2>Create Account</h2>

          <form onSubmit={handleRegister}>
            <TextInput
              id="email"
              data-testid="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@mail.com"
              maxLength={100}
              autoComplete="email"
              message={formErrors.email}
            />

            <PasswordInput
              id="password"
              data-testid="password"
              label="Password"
              name="password"
              placeholder="8 to 50, UPPER lower !@#$ 7889"
              maxLength={100}
              value={formData.password}
              onChange={handleChange}
              showRules={false}
              message={formErrors.password}
              type="error"
            />

            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Match the password"
              value={formData.confirmPassword}
              onChange={handleChange}
              message={formErrors.confirmPassword}
              type="error"
            />

            <div className="center-btn">
              <button
                type="button"
                className="button"
                id="btn-clear"
                data-testid="btn-clear"
                onClick={() =>
                  setFormData({
                    email: "",
                    password: "",
                    confirmPassword: "",
                  })
                }
              >
                Clear
              </button>

              <button
                type="submit"
                className="button"
                id="btn-register"
                data-testid="btn-register"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register for your account"}
              </button>
            </div>
          </form>
          <ConfirmMessage type={message.type} text={message.text} />
        </div>
      </section>
    </Layout>
  );
};

export default Register;
