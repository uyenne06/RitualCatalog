/* eslint-disable react-refresh/only-export-components */
import MainLayout from "@/features/auth/components/layouts/MainLayout";
// import DashboardPage from "@/features/ritual/pages/DashboardPage";
import HomePage from "@/features/auth/pages/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import { lazy, Suspense, type ReactNode } from "react";

const Adminlyaout = lazy(() => import("@/features/auth/pages/Adminlyaout"));

const DashboardPage = lazy(
  () => import("@/features/ritual/pages/DashboardPage"),
);

const ManageRitualCreate = lazy(
  () => import("@/features/ritual/pages/ManageRitualCreate"),
);
const UserManagement = lazy(
  () => import("@/features/ritual/pages/UserManagement"),
);

const ManageRitualEdit = lazy(
  () => import("@/features/ritual/pages/ManageRitualEdit"),
);

const ManageRitualList = lazy(
  () => import("@/features/ritual/pages/ManageRitualList"),
);

const withSuspense = (children: ReactNode) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};
// import ManageRitualCreate from "@/features/ritual/pages/ManageRitualCreate";
// import ManageRitualEdit from "@/features/ritual/pages/ManageRitualEdit";
import NotFoundPage from "@/features/ritual/pages/NotFoundPage";
import ProfilePage from "@/features/auth/pages/Profile";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import RitualsCatalog from "@/features/ritual/pages/RitualsCatalog";
import RitualsDetails from "@/features/ritual/pages/RitualsDetails";
import UnauthorizedPage from "@/features/ritual/pages/UnauthorizedPage";
// import UserManagement from "@/features/ritual/pages/UserManagement";
import { GuestRoute } from "@/shared/components/guards/GuestRoute";
import { ProtectedRoute } from "@/shared/components/guards/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

// 1. Sử dụng createBrowserRouter - API mới nhất của v6
export const router = createBrowserRouter([
  {
    //   path: "/", // Đường dẫn gốc
    //   element: <MainLayout />, // Layout bọc ngoài (Cái nhà)
    //   children: [
    //     // Các trang con (Nội thất)
    //     {
    //       index: true, // Trang mặc định khi vào "/"
    //       element: <HomePage />,
    //     },
    //     {
    //       element: <RequireAuth />, // Guard bọc ở đây
    //       children: [
    //         { path: "profile", element: <ProfilePage /> },
    //         { path: "settings", element: <SettingsPage /> },
    //         { path: "register", element: <RegisterPage /> },
    //       ],
    //     },
    //     {
    //       element: <RequireUnAuth />, // Guard bọc ở đây
    //       children: [{ path: "login", element: <LoginPage /> }],
    //     },
    //   ],
    // },

    // {
    //   path: "admin",
    // },
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "rituals", element: <RitualsCatalog /> },
      { path: "rituals/:id", element: <RitualsDetails /> },

      // { path: "profile", element: <ProfilePage /> },
      // { path: "settings", element: <SettingsPage /> },
      // { path: "register", element: <RegisterPage /> },
      {
        path: "login",
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        ),
      },
      {
        path: "unauthorized",
        element: <UnauthorizedPage />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },

      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            {withSuspense(<Adminlyaout />)}
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "rituals",
            element: <ManageRitualList />,
          },
          {
            path: "rituals/create",
            element: <ManageRitualCreate />,
          },
          {
            path: "rituals/:id/edit",
            element: <ManageRitualEdit />,
          },
          {
            path: "users",
            element: <UserManagement />,
          },
        ],
      },
    ],
  },
]);
