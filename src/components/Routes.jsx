import React from "react";
import ProtectedRoute from "./SQL/SQL_Role_Assignment.jsx";

// Public Pages
import Home from "../pages/Public/Index.jsx";
import NotFound from "../pages/Public/NotFound.jsx";
import QAtoPot from "../pages/Public/QAtoPot.jsx";
import Why from "../pages/Public/Why.jsx";
import ChapterCheck from "../pages/Public/ChapterCheck.jsx";
import IssueTest from "../pages/Public/IssueTest.jsx";
import MemberProfiles from "../pages/Public/MemberProfiles.jsx";
import PotManifesto from "../pages/Public/Pot-Manifesto.jsx";

// Auth Pages
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import Red_Acknowledment from "../pages/Auth/Red_Ack.jsx";

// User Pages
import Profile from "../pages/Profile.jsx";

// Admin/Protected Pages
import AddQuestions from "../pages/Admin/AddQuestions.jsx";
import AdminUserManager from "../pages/Admin/UserManagement.jsx";
import AssignRolesPage from "../pages/Admin/AssignRolesPage.jsx";
import EditQuestions from "../pages/Admin/EditQuestions.jsx";
import GradeIssue from "../pages/Admin/GradeIssues.jsx";
import GradeQuestions from "../pages/Admin/GradeQuestions.jsx";
import ReviewUserPage from "../pages/Admin/ReviewUserPage.jsx";

const routes = [
  // Public Routes
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/register1", element: <Red_Acknowledment /> },
  { path: "/qa-to-pot/*", element: <QAtoPot /> },
  { path: "/why/*", element: <Why /> },
  { path: "/sample-chapter-check", element: <ChapterCheck /> },
  { path: "/sample-issue-test", element: <IssueTest /> },
  { path: "/pot-manifesto", element: <PotManifesto /> },
  { path: "/*", element: <NotFound /> },

  // Protected Routes (Any logged-in user)
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
    ),
  },
  {
    path: "/admin-user-manager",
    element: (
      <ProtectedRoute allowedRoles={["admin", "superadmin", "user", "member", "lead"]}>
        <AdminUserManager />
      </ProtectedRoute>
    ),
  },

  // Admin + Lead Routes
  {
    path: "/admin-add-questions",
    element: (
      <ProtectedRoute allowedRoles={["admin", "superadmin", "lead"]}>
        <AddQuestions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-edit-questions",
    element: (
      <ProtectedRoute allowedRoles={["admin", "superadmin", "lead"]}>
        <EditQuestions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-grade-questions",
    element: (
      <ProtectedRoute allowedRoles={["admin", "superadmin", "lead"]}>
        <GradeQuestions />
      </ProtectedRoute>
    ),
  },

  // Admin/Superadmin Exclusive
  {
    path: "/admin-grade-issues",
    element: <GradeIssue />,
  },
  {
    path: "/admin-assign-user-role",
    element: <AssignRolesPage />,
  },
  {
    path: "/admin-review-user-page",
    element: <ReviewUserPage />,
  },
];

export default routes;
