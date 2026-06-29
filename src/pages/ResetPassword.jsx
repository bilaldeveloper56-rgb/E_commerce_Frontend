import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import authService from "../services/authService";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.resetPassword(token, password);
      if (response.success) {
        toast.success("Password reset successfully! Please log in.");
        navigate("/login");
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error(error.message || "Password reset token is invalid or has expired.");
    } finally {
      setLoading(false);
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
            Set New Password
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Please type in your new secure password
          </p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-white/80 border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                New Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
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
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700"
              >
                Confirm New Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm group-hover:border-slate-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? (
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
                  Resetting password...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Reset Password
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
          </div>

          {/* Login Redirect */}
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-500 transition-all"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
