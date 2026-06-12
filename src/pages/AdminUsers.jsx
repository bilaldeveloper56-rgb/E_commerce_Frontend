import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/slices/userSlice";

export default function AdminUsers() {
  const dispatch = useDispatch();
  const { users, totalUsers, loading, error } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">All users</h1>
            <p className="mt-2 text-slate-400">
              View and manage registered users in the system.
            </p>
          </div>
          <div className="rounded-full bg-stone-50 border border-slate-200 px-4 py-2 text-sm text-slate-700">
            {totalUsers} users
          </div>
        </div>
      </div>

      {loading && <p className="text-slate-700">Loading users...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {users.length === 0 && !loading && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">
          No users found.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 hover:border-indigo-500/40 transition"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg font-semibold text-indigo-300">
                {user.name ? user.name[0].toUpperCase() : "?"}
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  user.role === "admin"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-stone-50 text-slate-600 border border-slate-200"
                }`}
              >
                {user.role === "admin" ? "🔐 Admin" : "👤 User"}
              </span>
            </div>
            <p className="font-semibold text-slate-900 text-lg">{user.name}</p>
            <p className="mt-2 text-slate-400 truncate">{user.email}</p>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
