import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Hardcoded credentials - temporary system
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin_authenticated", "true");
      setLoading(false);
      navigate("/admin");
    } else {
      setLoading(false);
      setError("Invalid credentials. Use admin / admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-section-dark px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="Bright Horizon" className="h-20 mx-auto mb-4 drop-shadow-lg object-contain" />
          <h1 className="font-display text-2xl text-primary-foreground font-semibold">Admin Login</h1>
          <p className="font-body text-sm text-primary-foreground/50 mt-1">Bright Horizon Travel & Tours</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-dark rounded-2xl p-8 space-y-5">
          {error && (
            <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-3">
              <p className="text-sm text-destructive font-body">{error}</p>
            </div>
          )}

          <div>
            <label className="block font-body text-xs tracking-wider uppercase text-primary-foreground/60 mb-2">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block font-body text-xs tracking-wider uppercase text-primary-foreground/60 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="font-body text-xs text-primary-foreground/50 text-center">
              <strong className="text-primary">Credentials:</strong><br />
              Username: admin<br />
              Password: admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
