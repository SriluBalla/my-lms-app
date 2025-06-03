import React from "react";
import ProtectedRoute from "./SQL/SQL_Role_Assignment.jsx";
import Home from "../pages/Index.jsx";
import NotFound from "../pages/NotFound.jsx"; 
import QAtoPot from "../pages/QAtoPot.jsx";
import Why from "../pages/Why.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Profile from "../pages/Profile.jsx";
import MemberProfiles from "../pages/MemberProfiles.jsx";
import Red_Acknowledment from "../pages/Red_Ack.jsx";
import PotManifesto from "../pages/Pot-Manifesto.jsx";
import AdminUserManager from "../pages/AdminUserManagement.jsx";

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
