import { Suspense, useEffect, useLayoutEffect } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";

import Home from '@/app/home/page';
import Category from '@/app/category/page';
import PageNotFound from '@/app/404';
import CategoryId from '@/app/category/id/page';
import TagId from '@/app/tag/id/page';
import BookId from '@/app/book/id/page';
import ArticleId from '@/app/article/id/page';
import About from '@/app/about/page';
import PhotoAlbum from '@/app/photoAlbum';
import UserSettingLayout from '@/app/user/setting';
import UserSettingProfile from '@/app/user/setting/profile';
import UserSettingAccount from '@/app/user/setting/account';
import Subject from '@/app/subject/index.jsx';
import Loading from '@/components/Loading/index.jsx';


const Router = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
    });
    const pageViewCount = +sessionStorage.getItem('pageViewCount') || 0;
    sessionStorage.setItem('pageViewCount', `${pageViewCount + 1}`);
  }, [location]);

  const routes = [
    { path: "/", element: <Home /> },
    { path: "404", element: <PageNotFound /> },
    { path: "category", element: <Category /> },
    { path: "category/:id", element: <CategoryId /> },
    { path: "tag/:id", element: <TagId /> },
    { path: "book/:id", element: <BookId /> },
    { path: "article/:id", element: <ArticleId /> },
    { path: "about", element: <About /> },
    { path: 'subject', element: <Subject /> },
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
