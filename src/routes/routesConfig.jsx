import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import Canvas from "../Pages/Canvas";
import Home from "../Pages/Home";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home/canvas",
    element: (
      <ProtectedRoute>
        <Canvas />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/MyUploads",
  },
]);

export { router };
