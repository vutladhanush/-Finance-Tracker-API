import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../services/api";
function LoginForm({ onLogin, onSwitchToSignup }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (!email || !password) {
    setError("Please enter email and password");
    return;
  }

  try {
    setLoading(true);

    await onLogin({
      email: email,
      password: password
    });

  } catch (error) {
    console.error("Login error:", error);

    setError(
      error.response?.data?.message ||
      error.message ||
      "Invalid email or password"
    );

  } finally {
    setLoading(false);
  }
};
  return (
    <div className="auth-card">

      <div className="auth-header">

        <h2>Welcome Back</h2>

        <p>
          Sign in to your FinTrack account
        </p>

      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <label>Email Address</label>

          <div className="input-wrapper">

            <Mail size={16} />

            <input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

        </div>


        <div className="form-group">

          <label>Password</label>

          <div className="input-wrapper">

            <Lock size={16} />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

        </div>


        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

      </form>


      <div className="auth-switch">

        Don't have an account?

        <button
          type="button"
          onClick={onSwitchToSignup}
        >
          Sign Up
        </button>

      </div>

    </div>
  );
}

export default LoginForm;