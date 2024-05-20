import { Suspense, useLayoutEffect } from 'react'
import { Navigate, useLocation, useRoutes } from 'react-router-dom'

import Welcome from '@/app/welcome/page.jsx'
import Home from '@/app/blog/home/page'
import Category from '@/app/blog/category/page'
import PageNotFound from '@/app/404'
import CategoryId from '@/app/blog/category/id/page'
import TagId from '@/app/blog/tag/id/page'
import BookId from '@/app/blog/book/id/page'
import ArticleId from '@/app/blog/article/id/page'
import About from '@/app/blog/about/page'
import PhotoAlbum from '@/app/blog/photoAlbum'
import UserSettingLayout from '@/app/blog/user/setting'
import UserSettingProfile from '@/app/blog/user/setting/profile'
import UserSettingAccount from '@/app/blog/user/setting/account'
import Subject from '@/app/blog/subject/index.jsx'
import Loading from '@/components/Loading/index.jsx'
import DarkModeProvider from '@/components/DarkModeProvider/index.jsx'
import UserInfoProvider from '@/components/UserInfoProvider/index.jsx'
import BlogLayout from '@/app/blog/layout.jsx'

const Router = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    const pageViewCount = +sessionStorage.getItem('pageViewCount') || 0
    sessionStorage.setItem('pageViewCount', `${pageViewCount + 1}`)
  }, [location])

  const routes = [
    { path: '/', element: <Welcome /> },
    { path: '404', element: <PageNotFound /> },
    {
      path: 'blog',
      element: <BlogLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'category', element: <Category /> },
        { path: 'category/:id', element: <CategoryId /> },
        { path: 'tag/:id', element: <TagId /> },
        { path: 'book/:id', element: <BookId /> },
        { path: 'article/:id', element: <ArticleId /> },
        { path: 'about', element: <About /> },
        { path: 'subject', element: <Subject /> },
        { path: 'photoAlbum', element: <PhotoAlbum /> },
        {
          path: 'user',
          element: <UserSettingLayout />,
          children: [
            { path: 'setting/profile', element: <UserSettingProfile /> },
            { path: 'setting/account', element: <UserSettingAccount /> },
          ],
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" /> },
  ]

  const mapRoutes = (routes) => {
    return routes.map((route) => ({
      ...route,
      element: <Suspense fallback={<Loading />}>{route.element}</Suspense>,
      children: route.children ? mapRoutes(route.children) : undefined,
    }))
  }

  const mappedRoutes = mapRoutes(routes)

  const Router = useRoutes(mappedRoutes)

  return (
    <DarkModeProvider>
      <UserInfoProvider>{Router}</UserInfoProvider>
    </DarkModeProvider>
  )
}

export default Router
