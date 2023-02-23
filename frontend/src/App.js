import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import LoginRegister from "./pages/users/LoginRegister";
import ConformationPage from "./pages/users/ConformationPage";
import UserVerifyPage from "./pages/users/UserVerifyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "userarea", element: <LoginRegister /> },
      { path: "dashboard", element: <HomePage /> },
      {
        path: "clients",
        element: (
          <ProtectedRoute redirectTo="/login">
            <Clients />
          </ProtectedRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <ProtectedRoute redirectTo="/login">
            <Projects />
          </ProtectedRoute>
        ),
      },

      { path: "conformation", element: <ConformationPage /> },
      { path: "users/user-verify/:user_id/:verToken", element: <UserVerifyPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
