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

  const tabClass = (tab) =>
    `rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
      activeTab === tab
        ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200 shadow-sm"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
    }`;

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin settings
          </h1>
          <p className="mt-2 text-slate-400">
            Manage system configuration and security settings.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Tab sidebar */}
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/40 h-fit">
          <button type="button" onClick={() => setActiveTab("security")} className={tabClass("security")}>
            🔒 Security
          </button>
          <button type="button" onClick={() => setActiveTab("system")} className={tabClass("system")}>
            ⚙️ System
          </button>
          <button type="button" onClick={() => setActiveTab("advanced")} className={tabClass("advanced")}>
            🛠 Advanced
          </button>
        </div>

        {/* Tab content */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Security settings</h2>
                <p className="mt-2 text-slate-400">Update admin password and security preferences.</p>
              </div>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                {[
                  { name: "currentPassword", label: "Current password", placeholder: "Enter current password" },
                  { name: "newPassword", label: "New password", placeholder: "Enter new password (min. 6 characters)" },
                  { name: "confirmPassword", label: "Confirm password", placeholder: "Confirm new password" },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="text-sm font-medium text-slate-700">{label}</label>
                    <input
                      name={name}
                      type="password"
                      value={form[name]}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 transition"
                      placeholder={placeholder}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? "Updating..." : "Update password"}
                </button>
                {error && <p className="text-sm text-red-500">{error}</p>}
                {passwordSuccess && (
                  <p className="text-sm text-emerald-600 font-medium">✓ Password updated successfully!</p>
                )}
              </form>
            </div>
          )}

          {activeTab === "system" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">System settings</h2>
                <p className="mt-2 text-slate-400">Configure system-wide preferences and features.</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "System maintenance", desc: "Enable or disable system maintenance mode" },
                  { label: "Debug logging", desc: "Enable detailed system logging for debugging" },
                  { label: "Analytics collection", desc: "Collect usage analytics and system metrics", checked: true },
                ].map(({ label, desc, checked }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-stone-50 p-4 hover:border-indigo-200 transition-all duration-200"
                  >
                    <div>
                      <p className="font-medium text-slate-800">{label}</p>
                      <p className="mt-1 text-sm text-slate-400">{desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={checked}
                      className="w-5 h-5 cursor-pointer accent-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Advanced settings</h2>
                <p className="mt-2 text-slate-400">
                  Advanced configuration options for experienced administrators.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { label: "API rate limit", defaultVal: "1000", desc: "Maximum API requests allowed per minute" },
                  { label: "Session timeout", defaultVal: "3600", desc: "Admin session timeout in seconds" },
                ].map(({ label, defaultVal, desc }) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-stone-50 p-4">
                    <p className="font-medium text-slate-800">{label}</p>
                    <input
                      type="number"
                      defaultValue={defaultVal}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 transition"
                      placeholder="Value"
                    />
                    <p className="mt-2 text-xs text-slate-400">{desc}</p>
                  </div>
                ))}
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300"
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
