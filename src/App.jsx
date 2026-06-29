import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";
import { getCurrentUser, logout } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const handleUnauthorized = () => {
      dispatch(logout());
    };
    window.addEventListener("auth-unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth-unauthorized", handleUnauthorized);
    };
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRouter />
    </>
  );
}

export default App;
