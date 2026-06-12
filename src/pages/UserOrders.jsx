import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  placeOrder,
  resetOrderSuccess,
} from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";

export default function UserOrders() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { orders, loading, error, success } = useSelector(
    (state) => state.order,
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
      dispatch(resetOrderSuccess());
    }
  }, [success, dispatch]);

  const handlePlaceOrder = () => {
    if (!cart.items.length) return;
    dispatch(
      placeOrder({
        items: cart.items,
        totalPrice: cart.totalPrice,
        createdAt: new Date().toISOString(),
        status: "Processing",
      }),
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Your orders</h1>
              <p className="mt-2 text-slate-400">
                Completed orders and current cart items are stored locally.
              </p>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={!cart.items.length || loading}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {cart.items.length > 0 ? "Place order" : "Add products first"}
            </button>
          </div>
        </header>

        {cart.items.length ? (
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
            <h2 className="text-xl font-semibold text-slate-900">Current cart</h2>
            <div className="mt-4 space-y-3">
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="grid gap-3 rounded-2xl border border-slate-200 bg-stone-50 p-5 transition-all duration-300 hover:border-sky-500/30 sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-slate-400">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-slate-400">
                      Price per unit: ${item.price}
                    </p>
                  </div>
                  <p className="text-right text-lg font-semibold text-slate-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-slate-700">
                Total quantity: {cart.totalQuantity}
              </p>
              <p className="text-xl font-semibold text-slate-900">
                Order total: ${cart.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-xl shadow-slate-200/50">
            <p className="text-slate-400">Your cart is empty.</p>
            <p className="mt-3 text-sm text-slate-500">
              Press "Order product" in products to add items here.
            </p>
          </div>
        )}

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <h2 className="text-xl font-semibold text-slate-900">Order history</h2>
          {loading && (
            <p className="mt-4 text-slate-700">Loading past orders...</p>
          )}
          {error && <p className="mt-4 text-red-400">{error}</p>}
          {!loading && orders.length === 0 && (
            <p className="mt-4 text-slate-400">
              You have not placed any completed orders yet.
            </p>
          )}
          <div className="mt-4 space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="group rounded-2xl border border-slate-200 bg-stone-50 p-6 transition-all duration-300 hover:border-indigo-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-slate-900 font-semibold">Order {order._id}</p>
                  <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-sm text-slate-700 shadow-sm">
                    {order.status}
                  </span>
                </div>
                <p className="mt-2 text-slate-400">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-2 text-slate-600">
                  Items: {order.items.length}
                </p>
                <p className="mt-1 text-slate-600">
                  Total: ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
