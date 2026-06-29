import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
  resetUserSuccess,
} from "../redux/slices/userSlice";

export default function AdminProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, loading, error, success } = useSelector(
    (state) => state.user,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (success) {
      setIsEditing(false);
      dispatch(resetUserSuccess());
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(form));
  };

  const displayUser = profile || user;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Admin profile</h1>
            <p className="mt-2 text-slate-500">
              Manage your administrator account information and settings.
            </p>
          </div>
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-400 transition"
            >
              Edit profile
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
          <h2 className="text-2xl font-semibold text-slate-900">
            Edit admin profile
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20"
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-400 transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            {success && (
              <p className="text-sm text-green-400">
                Profile updated successfully!
              </p>
            )}
          </form>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
            <h2 className="text-lg font-semibold text-slate-900">
              Personal information
            </h2>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-slate-500">Full name</p>
                <p className="mt-2 text-lg text-slate-900 font-medium">
                  {displayUser?.name || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email address</p>
                <p className="mt-2 text-lg text-slate-900 font-medium">
                  {displayUser?.email || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Administrator level</p>
                <p className="mt-2 inline-flex items-center rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-300">
                  ⭐ Full access
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
            <h2 className="text-lg font-semibold text-slate-900">
              Account details
            </h2>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-slate-500">Admin since</p>
                <p className="mt-2 text-lg text-slate-900 font-medium">
                  {displayUser?.createdAt
                    ? new Date(displayUser.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Administrator ID</p>
                <p className="mt-2 font-mono text-sm text-slate-600 break-all">
                  {displayUser?._id || "—"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Account status</p>
                <p className="mt-2 inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-300">
                  ✓ Active
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
