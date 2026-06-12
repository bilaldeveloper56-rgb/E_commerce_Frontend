import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/slices/userSlice";

export default function UserSettings() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("account");
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

    // Update password through profile update
    dispatch(updateUserProfile({ password: form.newPassword }));
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordSuccess(true);
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
          <p className="mt-2 text-slate-400">
            Manage your account security and preferences.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/50">
          <button
            type="button"
            onClick={() => setActiveTab("account")}
            className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeTab === "account"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Account settings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeTab === "security"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Security & password
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preferences")}
            className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeTab === "preferences"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Preferences
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
          {activeTab === "account" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Account settings
                </h2>
                <p className="mt-2 text-slate-400">
                  Manage your account information and email.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Current email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-500 cursor-not-allowed"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    To change your email, visit your profile page.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Account type
                  </p>
                  <div className="mt-2 rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3">
                    <p className="text-slate-900 font-medium">
                      {user?.role === "admin"
                        ? "🔐 Administrator"
                        : "👤 Regular User"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Security & password
                </h2>
                <p className="mt-2 text-slate-400">
                  Update your password to keep your account secure.
                </p>
              </div>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Current password
                  </label>
                  <input
                    name="currentPassword"
                    type="password"
                    value={form.currentPassword}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    placeholder="Enter your current password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    New password
                  </label>
                  <input
                    name="newPassword"
                    type="password"
                    value={form.newPassword}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    placeholder="Enter a new password (min. 6 characters)"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Confirm password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    placeholder="Confirm your new password"
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

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Preferences
                </h2>
                <p className="mt-2 text-slate-400">
                  Customize your experience on the platform.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-stone-50 p-4">
                  <div>
                    <p className="font-medium text-slate-900">
                      Email notifications
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Receive updates about orders and promotions
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-stone-50 p-4">
                  <div>
                    <p className="font-medium text-slate-900">Order updates</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Get notified when orders are processed
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-stone-50 p-4">
                  <div>
                    <p className="font-medium text-slate-900">Newsletter</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Subscribe to our weekly newsletter
                    </p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 cursor-pointer" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
