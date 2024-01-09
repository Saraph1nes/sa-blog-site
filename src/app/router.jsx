import {Navigate, useRoutes} from "react-router-dom";
import Home from "@/app/home/page";
import Category from "@/app/category/page";
import CategoryId from "@/app/category/id/page";
import TagId from "@/app/tag/id/page";
import BookId from "@/app/book/id/page";
import ArticleId from "@/app/article/id/page";
import About from "@/app/about/page";
import Login from "@/app/login/page";
import Register from "@/app/register/page";
import UserProfile from "@/app/user/profile/page";
import PhotoAlbum from "@/app/photoAlbum/index.jsx";

const Router = () => {
  const router = [
    {
      path:"/",
      element: <Home />
    },
    {
      path: '/category',
      element: <Category />
    },
    {
      path: '/category/:id',
      element: <CategoryId />
    },
    {
      path: '/tag/:id',
      element: <TagId />
    },
    {
      path: '/book/:id',
      element: <BookId />
    },
    {
      path: '/article/:id',
      element: <ArticleId />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/photoAlbum',
      element: <PhotoAlbum />
    },
    {
      path: '/user',
      children: [
        {
          path: 'profile',
          element: <UserProfile />
        }
      ]
    },
    {
      path:"*",
      element:<Navigate to="/"/>
    }
  ]

  return useRoutes(router)
}

export default Router;
