import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Loader2, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import authService from "../services/authService";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [devLink, setDevLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        toast.success("Password reset email sent!");
        setSuccess(true);
        if (response.devResetUrl) {
          setDevLink(response.devResetUrl);
        }
      } else {
        toast.error(response.message || "Failed to send reset link");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
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
            Reset Password
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-white/80 border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-8">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative flex items-center justify-center py-3 px-4 bg-linear-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none text-sm group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending link...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    Send Reset Link
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-600 font-medium">
                Check your inbox! If an account exists with that email address, you will receive a reset link shortly.
              </div>

              {devLink && (
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 text-left">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                    ⚠️ Development Helper
                  </p>
                  <p className="text-xs text-slate-600 mb-3">
                    Click the URL below to proceed with the password reset without needing a SMTP server config:
                  </p>
                  <a
                    href={devLink}
                    className="text-xs font-semibold text-indigo-600 hover:underline break-all block"
                  >
                    {devLink}
                  </a>
                </div>
              )}

              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                  setDevLink("");
                }}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Send link to another email
              </button>
            </div>
          )}

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
