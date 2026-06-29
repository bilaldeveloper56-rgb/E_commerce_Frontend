import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, confirmOrder } from "../redux/slices/orderSlice";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleConfirmOrder = (orderId) => {
    if (window.confirm("Confirming this order will decrease product stock. Proceed?")) {
      dispatch(confirmOrder(orderId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Manage Orders
            </h1>
            <p className="mt-2 text-slate-500">
              View and confirm user orders. New orders start in "Processing" state.
            </p>
          </div>
          <button
            onClick={() => dispatch(fetchAllOrders())}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh Orders"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {orders.length === 0 && !loading && (
          <p className="text-slate-400 text-center py-10">No orders found.</p>
        )}
        
        {orders.map((order) => (
          <article
            key={order._id}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:border-indigo-300 hover:-translate-y-1"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-900">Order {order._id}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "Confirmed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : order.status === "Processing"
                        ? "bg-sky-500/20 text-sky-400"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                
                <div className="text-sm text-slate-500">
                  <p>Customer: <span className="text-slate-800">{order.user?.name || order.user}</span></p>
                  <p>Email: <span className="text-slate-800">{order.user?.email || "Unknown"}</span></p>
                  <p>Placed on: <span className="text-slate-800">{new Date(order.createdAt).toLocaleString()}</span></p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-slate-500">Total Amount</p>
                <p className="text-2xl font-bold text-slate-900">${order.totalPrice.toFixed(2)}</p>
                
                {order.status === "Processing" && (
                  <button
                    onClick={() => handleConfirmOrder(order._id)}
                    disabled={loading}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Confirm Order
                  </button>
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <p className="text-sm font-semibold text-slate-600 mb-4">Order Items ({order.items.length})</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 rounded-2xl bg-stone-50 p-3 border border-slate-200">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
