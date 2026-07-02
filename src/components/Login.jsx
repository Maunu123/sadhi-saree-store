
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const { login, signup } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    const result = login(loginEmail, loginPassword);

    if (result.success) {
      alert("Login Successful 🎉");

      setLoginEmail("");
      setLoginPassword("");

      navigate("/user");
    } else {
      alert(result.message);
    }
  };

  // SIGNUP
  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      alert("Please fill all fields");
      return;
    }

    const result = signup({
      name,
      email,
      phone,
      password,
    });

    if (result.success) {
      alert("Account Created Successfully 🎉");

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");

      navigate("/user");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        {isLogin ? (
          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />

            <button type="submit">
              Login
            </button>

          </form>
        ) : (
          <form onSubmit={handleSignup}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">
              Create Account
            </button>

          </form>
        )}

        <p className="switch">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{
              color: "#ff3f6c",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;

