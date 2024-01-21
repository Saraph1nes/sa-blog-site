import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";

const Home = React.lazy(() => import("@/app/home/page"));
const Category = React.lazy(() => import("@/app/category/page"));
const PageNotFound = React.lazy(() => import("@/app/404"));
const CategoryId = React.lazy(() => import("@/app/category/id/page"));
const TagId = React.lazy(() => import("@/app/tag/id/page"));
const BookId = React.lazy(() => import("@/app/book/id/page"));
const ArticleId = React.lazy(() => import("@/app/article/id/page"));
const About = React.lazy(() => import("@/app/about/page"));
const PhotoAlbum = React.lazy(() => import("@/app/photoAlbum"));
const UserSettingLayout = React.lazy(() => import("@/app/user/setting"));
const UserSettingProfile = React.lazy(() => import("@/app/user/setting/profile"));
const UserSettingAccount = React.lazy(() => import("@/app/user/setting/account"));
const Loading = React.lazy(() => import("@/components/Loading/index.jsx"));

const Router = () => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "404", element: <PageNotFound /> },
    { path: "category", element: <Category /> },
    { path: "category/:id", element: <CategoryId /> },
    { path: "tag/:id", element: <TagId /> },
    { path: "book/:id", element: <BookId /> },
    { path: "article/:id", element: <ArticleId /> },
    { path: "about", element: <About /> },
    { path: "photoAlbum", element: <PhotoAlbum /> },
    {
      path: "user",
      element: <UserSettingLayout />,
      children: [
        { path: "setting/profile", element: <UserSettingProfile /> },
        { path: "setting/account", element: <UserSettingAccount /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" /> },
  ];

  const mapRoutes = (routes) => {
    return routes.map((route) => ({
      ...route,
      element: (
        <Suspense fallback={<Loading />}>{route.element}</Suspense>
      ),
      children: route.children ? mapRoutes(route.children) : undefined,
    }));
  };

  const mappedRoutes = mapRoutes(routes);

  return useRoutes(mappedRoutes);
};

export default Router;
