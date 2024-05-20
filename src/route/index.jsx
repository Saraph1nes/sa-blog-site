import Welcome from '@/app/welcome/page.jsx'
import PageNotFound from '@/app/404/index.jsx'
import BlogLayout from '@/app/blog/layout.jsx'
import Home from '@/app/blog/home/page.jsx'
import Category from '@/app/blog/category/page.jsx'
import CategoryId from '@/app/blog/category/id/page.jsx'
import TagId from '@/app/blog/tag/id/page.jsx'
import BookId from '@/app/blog/book/id/page.jsx'
import ArticleId from '@/app/blog/article/id/page.jsx'
import About from '@/app/blog/about/page.jsx'
import Subject from '@/app/blog/subject/index.jsx'
import PhotoAlbum from '@/app/blog/photoAlbum/index.jsx'
import UserSettingLayout from '@/app/blog/user/setting/index.jsx'
import UserSettingProfile from '@/app/blog/user/setting/profile/index.jsx'
import UserSettingAccount from '@/app/blog/user/setting/account/index.jsx'
import { Navigate } from 'react-router-dom'

const baseRoute = [
  { path: '/', element: <Welcome /> },
  { path: '404', element: <PageNotFound /> },
]

const blogRoutes = [
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
]

const route404 = { path: '*', element: <Navigate to="/404" /> }

export default [...baseRoute, ...blogRoutes, route404]
