import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseDB";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import ConfirmMessage from "../components/ConfirmMsg";
import "../styles/Main.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Logged in successfully!" });
      setTimeout(() => navigate("/profile"), 1500); // redirect after success
    }
  };

  return (
    <Layout title="Login" 
    description="Log into your account">
      <section className="register-page">
        <div className="body__center">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
            />
            <PasswordInput
              id="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              showRules={false}
            />

            <div className="center-btn">
              <button
                type="button"
                className="button"
                id="btn-clear"
                onClick={() => 
                    setFormData({ email: "", password: "" })}
              >
                Clear
              </button>

              <button 
               type="submit" 
              className="button"
              id="btn-Login">
                Login
              </button>

             <button 
               type="button" 
              className="button"
              id="btn-forgotPassword">
                Forgot Password
              </button>
              </div>
             </form>

          <ConfirmMessage type={message?.type} text={message?.text} />
        
        </div>
      </section>
    </Layout>
  );
};

export default Login;
