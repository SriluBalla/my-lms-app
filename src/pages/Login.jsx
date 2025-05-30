import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseDB";
import Layout from "../components/Layout";
import TextInput from "../components/Input_TextField";
import PasswordInput from "../components/Input_Password";
import ConfirmMessage from "../components/Msg_in_Body";
import ConsoleLog from "../components/Msg_ConsoleLog";
import "../styles/main.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const normalizedEmail = formData.email.trim().toLowerCase();
    const { password } = formData;

    // Validation before API call
    if (!normalizedEmail || !password) {
      setMessage({ type: "error", text: "Both fields are required." });
      setLogs((prev) => [...prev, "Validation failed: empty fields"]);
      return;
    }

    if (!normalizedEmail.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      setLogs((prev) => [...prev, "Validation failed: invalid email"]);
      return;
    }

    setLogs((prev) => [...prev, "Attempting login with Supabase..."]);

    const { error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: password,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
      setLogs((prev) => [...prev, "Login failed", error]);
    } else {
      setMessage({ type: "success", text: "Logged in successfully!" });
      setLogs((prev) => [...prev, "Login successful"]);
      setTimeout(() => navigate("/profile"), 1500);
    }
  };

  return (
    <Layout title="Login" description="Log into your account">
      <section className="body__outline">
        <div className="body__center">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
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
              error={message.email}
            />
            <PasswordInput
              id="password"
              data-testid="password"
              label="Password"
              name="password"
              placeholder="Registered password as is"
              value={formData.password}
              onChange={handleChange}
              showRules={false}
              error={message.password}
            />

            <div className="center-btn">
              <button
                type="button"
                className="button"
                data-testid="btn-clear"
                onClick={() => setFormData({ email: "", password: "" })}
              >
                Clear
              </button>

              <button type="submit" className="button" id="btn-Login">
                Login
              </button>

              <button type="button" className="button" id="btn-forgotPassword">
                Forgot Password
              </button>
            </div>
          </form>

          {/* ✅ Show message and logs below the form */}
          <ConfirmMessage type={message.type} text={message.text} />
          {/* <ConsoleLog title="Login Debug Log" logs={logs} /> */}
        </div>
      </section>
    </Layout>
  );
};

export default Login;
