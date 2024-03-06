import { useRoutes, RouteObject, Navigate } from "react-router-dom";
import { lazy } from "react";

import AuthLayout from "../layouts/auth/AuthLayout";
import MainLayout from "../layouts/dashboard/MainLayout";
import AdminLayout from "../layouts/admin/AdminLayout";

import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";
import AdminGuard from "../guards/AdminGuard";

import Logout from "../components/auth/Logout";

const AttendancePage = lazy(() => import("../pages/dashboard/AttendancePage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const HomePage = lazy(() => import("../pages/dashboard/HomePage"));
const AdminPage = lazy(() => import("../pages/admin/AdminPage"));
const EditEmployee = lazy(() => import("../pages/admin/EditEmployee"));
const AddEmployee = lazy(() => import("../pages/admin/AddEmployee"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"/auth/login"} />,
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: (
          <GuestGuard>
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </GuestGuard>
        ),
      },
      {
        path: "signup",
        element: (
          <GuestGuard>
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </GuestGuard>
        ),
      },
    ],
  },
  {
    path: "/user",
    children: [
      {
        path: "dashboard",
        element: (
          <AuthGuard>
            <MainLayout>
              <HomePage />
            </MainLayout>
          </AuthGuard>
        ),
      },
      {
        path: "attendance",
        element: (
          <AuthGuard>
            <MainLayout>
              <AttendancePage />
            </MainLayout>
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "dashboard",
        element: (
          <AdminGuard>
            <AdminLayout>
              <AdminPage />
            </AdminLayout>
          </AdminGuard>
        ),
      },
    ],
  },
  {
    path: "/admin/dashboard/edit?/:userId",
    element: (
      <AdminLayout>
        <EditEmployee />,
      </AdminLayout>
    ),
  },
  {
    path: "/admin/dashboard/add",
    element: (
      <AdminLayout>
        <AddEmployee />
      </AdminLayout>
    ),
  },
  {
    path: "logout",
    element: <Logout />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
