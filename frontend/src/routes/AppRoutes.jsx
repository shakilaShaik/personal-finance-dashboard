// routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import AddLog from "../pages/AddLog";
import ShowLog from "../pages/ShowLog";
import Analytics from "../pages/Analytics";
import ProtectedLayout from "../layout/ProtectedLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes with Sidebar Layout */}
      <Route
        path="/home"
        element={
          <ProtectedLayout>
            <Home />
          </ProtectedLayout>
        }
      />
      <Route
        path="/add-log"
        element={
          <ProtectedLayout>
            <AddLog />
          </ProtectedLayout>
        }
      />
      <Route
        path="/show-logs"
        element={
          <ProtectedLayout>
            <ShowLog />
          </ProtectedLayout>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedLayout>
            <Analytics />
          </ProtectedLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
