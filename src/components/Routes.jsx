import React from "react";
import ProtectedRoute from "./SQL/SQL_Role_Assignment.jsx";
import Home from "../pages/Public/Index.jsx";
import NotFound from "../pages/Public/NotFound.jsx"; 
import QAtoPot from "../pages/Public/QAtoPot.jsx";
import Why from "../pages/Public/Why.jsx";
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import Profile from "../pages/Profile.jsx";
import MemberProfiles from "../pages/Public/MemberProfiles.jsx";
import Red_Acknowledment from "../pages/Auth/Red_Ack.jsx";
import PotManifesto from "../pages/Public/Pot-Manifesto.jsx";
import AdminUserManager from "../pages/Admin/AdminUserManagement.jsx";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/qa-to-pot/*",
    element: <QAtoPot />,
  },
  {
    path: "/register1",
    element: <Red_Acknowledment />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/why/*",
    element: <Why />,
  },
  {
    path: "/pot-manifesto",
    element: <PotManifesto />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={["admin", "superadmin", "user", "member", "lead"]}>
        <Profile />
      </ProtectedRoute>
    ),
  },
  
  {
    path: "/member-profiles",
    element: (
    <ProtectedRoute allowedRoles={["admin", "superadmin", "user", "member", "lead"]}>
        <MemberProfiles />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin-user-manager",
    element: (
      <ProtectedRoute allowedRoles={["admin", "superadmin", "user", "member", "lead"]}>
        <AdminUserManager />
      </ProtectedRoute>
    ),
  },
  
];

export default routes;
