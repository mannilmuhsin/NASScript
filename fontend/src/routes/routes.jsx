import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Protect from "./protect";
import Login from "../pages/Login";
import Home from "../pages/Home";
import CompanyForm from "../pages/CompanyForm";
import CompanyDetails from "../pages/CompanyDetails";
import Congratulations from "../pages/SuccessPage";
import AdminHome from "../pages/AdminHome";
import EditNfc from "../pages/EditNfc";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/add-company',
        element: <CompanyForm />
      },
      {
        path: "/congratulations/:nfcCode",
        element: <Congratulations />
      }
    ],
  },
  {
    path: '/:nfcCode',
    element: <CompanyDetails />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin-home",
    element: <Protect><AdminHome /></Protect>,
  },
  {
    path: "/editnfc/:nfcCode",
    element: <Protect><EditNfc /></Protect>,
  },
]);

export default appRouter;
