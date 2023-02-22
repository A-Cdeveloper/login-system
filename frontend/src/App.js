import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import SecondPage from "./pages/SecondPage";
import ThirdPage from "./pages/ThirdPage";
import LoginRegister from "./pages/LoginRegister";
import ConformationPage from "./pages/ConformationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: "second-page",
        element: (
          <ProtectedRoute redirectTo="/login">
            <SecondPage />
          </ProtectedRoute>
        ),
      },
      { path: "third-page", element: <ThirdPage /> },
      { path: "userarea", element: <LoginRegister /> },
      { path: "conformation", element: <ConformationPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
