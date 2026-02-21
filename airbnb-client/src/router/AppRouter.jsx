import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import App from "../App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import HomeDetails from "../pages/HomeDetails";
import AddHome from "../pages/AddHome";
import HostHomes from "../pages/HostHomes";
import EditHome from "../pages/EditHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "home-details/:homeID",
        element: <HomeDetails />,
      },
      {
        path: "/add-home",
        element: <AddHome />,
      },
      {
        path: "/host-homes",
        element: <HostHomes />,
      },
      {
        path: "/edit-home/:editHomeID",
        element: <EditHome />,
      },
    ],
  },
]);
export default router;
