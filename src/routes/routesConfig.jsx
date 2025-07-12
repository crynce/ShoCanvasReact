import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import Canvas from "../Pages/Canvas";
import Home from "../Pages/Home";

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
    element: <Canvas />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/MyUploads",
  },
]);

export { router };
