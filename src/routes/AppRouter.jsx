import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";
import AdminLayout from "../components/layout/AdminLayout.jsx";
import UserLayout from "../components/layout/UserLayout.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import AdminProductEditor from "../pages/AdminProductEditor.jsx";
import AdminUsers from "../pages/AdminUsers.jsx";
import AdminSettings from "../pages/AdminSettings.jsx";
import AdminProfile from "../pages/AdminProfile.jsx";
import AdminOrders from "../pages/AdminOrders.jsx";
import UserDashboard from "../pages/UserDashboard.jsx";
import UserProducts from "../pages/UserProducts.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import UserOrders from "../pages/UserOrders.jsx";
import UserSettings from "../pages/UserSettings.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";

function HomeRedirect() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user?.role === "admin" ? "/admin" : "/dashboard"} replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/" element={<HomeRedirect />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<RoleRoute role="admin" />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductEditor />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Route>

          <Route path="/dashboard" element={<RoleRoute role="user" />}>
            <Route element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="products" element={<UserProducts />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
