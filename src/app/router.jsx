import React, {Suspense, useCallback, useMemo} from "react";
import {Navigate, useRoutes} from "react-router-dom";

const Home = React.lazy(() => import("@/app/home/page"));
const Category = React.lazy(() => import("@/app/category/page"));
const PageNotFound = React.lazy(() => import("@/app/404"));
const CategoryId = React.lazy(() => import("@/app/category/id/page"));
const TagId = React.lazy(() => import("@/app/tag/id/page"));
const BookId = React.lazy(() => import("@/app/book/id/page"));
const ArticleId = React.lazy(() => import("@/app/article/id/page"));
const About = React.lazy(() => import("@/app/about/page"));
const Login = React.lazy(() => import("@/app/login/page"));
const Register = React.lazy(() => import("@/app/register/page"));
const PhotoAlbum = React.lazy(() => import("@/app/photoAlbum"));
const UserSettingLayout = React.lazy(() => import("@/app/user/setting"));
const UserSettingProfile = React.lazy(() => import("@/app/user/setting/profile"));
const UserSettingAccount = React.lazy(() => import("@/app/user/setting/account"));
const Loading = React.lazy(() => import("@/components/Loading/index.jsx"));

const Router = () => {
  const router = [
    {
      path: "/",
      element: <Home/>
    },
    {
      path: '404',
      element: <PageNotFound/>
    },
    {
      path: 'category',
      element: <Category/>
    },
    {
      path: 'category/:id',
      element: <CategoryId/>
    },
    {
      path: 'tag/:id',
      element: <TagId/>
    },
    {
      path: 'book/:id',
      element: <BookId/>
    },
    {
      path: 'article/:id',
      element: <ArticleId/>
    },
    {
      path: 'about',
      element: <About/>
    },
    {
      path: 'login',
      element: <Login/>
    },
    {
      path: 'register',
      element: <Register/>
    },
    {
      path: 'photoAlbum',
      element: <PhotoAlbum/>
    },
    {
      path: 'user',
      children: [
        {
          path: 'setting',
          element: <UserSettingLayout/>,
          children: [
            {
              path: 'profile',
              element: <UserSettingProfile/>
            },
            {
              path: 'account',
              element: <UserSettingAccount/>
            }
          ]
        }
      ]
    },
    {
      path: "*",
      element: <Navigate to="/404"/>
    }
  ]

  const routerHandler = useCallback((router) => {
    const dfs = (router) => {
      router.forEach(i => {
        if (i.children) {
          dfs(i.children)
        } else {
          i.element = <Suspense fallback={<Loading/>}>{i.element}</Suspense>
        }
      })
      return router
    }
    return dfs(router)
  }, [])

  return useRoutes(routerHandler(router))
}

export default Router;
