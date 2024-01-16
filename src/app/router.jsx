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
import PhotoAlbum from "@/app/photoAlbum";
import UserSettingLayout from "@/app/user/setting";
import UserSettingProfile from "@/app/user/setting/profile";
import UserSettingAccount from "@/app/user/setting/account";
import PageNotFound from "@/app/404";

const Router = () => {
  const router = [
    {
      path:"/",
      element: <Home />
    },
    {
      path: '404',
      element: <PageNotFound />
    },
    {
      path: 'category',
      element: <Category />
    },
    {
      path: 'category/:id',
      element: <CategoryId />
    },
    {
      path: 'tag/:id',
      element: <TagId />
    },
    {
      path: 'book/:id',
      element: <BookId />
    },
    {
      path: 'article/:id',
      element: <ArticleId />
    },
    {
      path: 'about',
      element: <About />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
    },
    {
      path: 'photoAlbum',
      element: <PhotoAlbum />
    },
    {
      path: 'user',
      children: [
        {
          path: 'setting',
          element: <UserSettingLayout />,
          children: [
            {
              path: 'profile',
              element: <UserSettingProfile />
            },
            {
              path: 'account',
              element: <UserSettingAccount />
            }
          ]
        }
      ]
    },
    {
      path:"*",
      element:<Navigate to="/404"/>
    }
  ]

  return useRoutes(router)
}

export default Router;
