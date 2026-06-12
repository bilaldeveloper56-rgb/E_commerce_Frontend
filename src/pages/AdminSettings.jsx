import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/slices/userSlice";

export default function AdminSettings() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("security");
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!form.newPassword || !form.confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (form.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    dispatch(updateUserProfile({ password: form.newPassword }));
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordSuccess(true);
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/30">
        <div>
          <h1 className="text-3xl font-semibold text-white">Admin settings</h1>
          <p className="mt-2 text-slate-400">
            Manage system configuration and security settings.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-slate-900/80 p-3 shadow-xl shadow-slate-950/30">
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeTab === "security"
                ? "bg-indigo-500/20 text-indigo-300"
                : "text-slate-300 hover:bg-slate-800/50"
            }`}
          >
            Security
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("system")}
            className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeTab === "system"
                ? "bg-indigo-500/20 text-indigo-300"
                : "text-slate-300 hover:bg-slate-800/50"
            }`}
          >
            System
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("advanced")}
            className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeTab === "advanced"
                ? "bg-indigo-500/20 text-indigo-300"
                : "text-slate-300 hover:bg-slate-800/50"
            }`}
          >
            Advanced
          </button>
        </div>

        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/30">
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Security settings
                </h2>
                <p className="mt-2 text-slate-400">
                  Update admin password and security preferences.
                </p>
              </div>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300">
                    Current password
                  </label>
                  <input
                    name="currentPassword"
                    type="password"
                    value={form.currentPassword}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300">
                    New password
                  </label>
                  <input
                    name="newPassword"
                    type="password"
                    value={form.newPassword}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    placeholder="Enter new password (min. 6 characters)"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300">
                    Confirm password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-400 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update password"}
                </button>
                {error && <p className="text-sm text-red-400">{error}</p>}
                {passwordSuccess && (
                  <p className="text-sm text-green-400">
                    ✓ Password updated successfully!
                  </p>
                )}
              </form>
            </div>
          )}

          {activeTab === "system" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  System settings
                </h2>
                <p className="mt-2 text-slate-400">
                  Configure system-wide preferences and features.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950/80 p-4">
                  <div>
                    <p className="font-medium text-white">System maintenance</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Enable or disable system maintenance mode
                    </p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 cursor-pointer" />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950/80 p-4">
                  <div>
                    <p className="font-medium text-white">Debug logging</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Enable detailed system logging for debugging
                    </p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 cursor-pointer" />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950/80 p-4">
                  <div>
                    <p className="font-medium text-white">
                      Analytics collection
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Collect usage analytics and system metrics
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Advanced settings
                </h2>
                <p className="mt-2 text-slate-400">
                  Advanced configuration options for experienced administrators.
                </p>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-4">
                  <p className="font-medium text-white">API rate limit</p>
                  <input
                    type="number"
                    defaultValue="1000"
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-slate-100"
                    placeholder="Requests per minute"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Maximum API requests allowed per minute
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-4">
                  <p className="font-medium text-white">Session timeout</p>
                  <input
                    type="number"
                    defaultValue="3600"
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-slate-100"
                    placeholder="Seconds"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Admin session timeout in seconds
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-700 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-600 transition"
                >
                  Save settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
