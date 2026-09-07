import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { createUser } from "../services/api";

function SignupForm({ onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createUser({
        name,
        email,
        password
      });

      setSuccess(
        "Account created successfully. Please login."
      );

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">

      <div className="auth-header">
        <h2>Create Account</h2>
        <p>Start tracking your expenses</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Full Name</label>

          <div className="input-wrapper">
            <User size={16} />

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>
        </div>

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
          className="primary-button"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

      </form>

      <div className="auth-switch">
        Already have an account?

        <button onClick={onSwitchToLogin}>
          Sign In
        </button>
      </div>

    </div>
  );
}

export default SignupForm;