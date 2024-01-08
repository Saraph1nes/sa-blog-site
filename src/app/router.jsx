import {Navigate, useRoutes} from "react-router-dom";
import Home from "@/app/home/page";

const Router = () => {
  const router = [
    {
      path:"/",
      element:<Navigate to="/home"/>
    },
    {
      path: '/home/*',
      element: <Home />
    },
    {
      path:"*",
      element:<Navigate to="/home"/>
    }
  ]

  return useRoutes(router)
}

export default Router;
