import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { loginUser, clearAuthError } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    // Clear errors when mounting
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Logged in successfully!");
    } else {
      toast.error(resultAction.payload || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-stone-50 via-white to-stone-100 px-4 relative overflow-hidden">
      {/* Abstract Glowing Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md z-10 transition-all duration-300">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-linear-to-br from-indigo-500 to-fuchsia-500 rounded-2xl shadow-lg shadow-indigo-500/30 mb-3 animate-pulse">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-600">
            Welcome Back
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Sign in to access your secure panel
          </p>
        </div>

        {/* Login Form Card */}
        <div className="backdrop-blur-xl bg-white/80 border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm flex items-center gap-2 animate-shake">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0"></span>
              <span className="flex-1 truncate">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm group-hover:border-slate-300"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm group-hover:border-slate-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative flex items-center justify-center py-3 px-4 bg-linear-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none text-sm group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Sign In
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400">
                New around here?
              </span>
            </div>
          </div>

          {/* Signup Redirect */}
          <div className="text-center">
            <p className="text-slate-400 text-xs font-semibold">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-400 hover:from-indigo-300 hover:to-fuchsia-300 transition-all"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
