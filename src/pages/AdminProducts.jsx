import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminProducts() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">
              Product Management
            </p>
            <h1 className="text-3xl font-semibold">Edit product listings</h1>
            <p className="mt-2 text-slate-400">
              Signed in as {user?.name || "Administrator"}.
            </p>
          </div>
          <Link
            to="/admin"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white backdrop-blur-md px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all duration-300"
          >
            Back to dashboard
          </Link>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white backdrop-blur-xl p-8 shadow-xl shadow-slate-200/50">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
          <p className="text-slate-400">
            This page shows admin-only tools for editing products. Replace these
            placeholder cards with your product create, edit, and delete UI when
            you are ready.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="group rounded-2xl border border-slate-200 bg-stone-50 p-6 transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Add new product</h2>
              <p className="mt-3 text-slate-400">
                Create product entries, upload images, and set prices.
              </p>
            </div>
            <div className="group rounded-2xl border border-slate-200 bg-stone-50 p-6 transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Manage inventory</h2>
              <p className="mt-3 text-slate-400">
                Update stock levels and remove outdated products.
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
