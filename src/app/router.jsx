import { Suspense, useLayoutEffect } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import Loading from '@/components/Loading/index.jsx'
import DarkModeProvider from '@/components/DarkModeProvider/index.jsx'
import UserInfoProvider from '@/components/UserInfoProvider/index.jsx'
import routes from '@/route/index.jsx'

const Router = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    const pageViewCount = +sessionStorage.getItem('pageViewCount') || 0
    sessionStorage.setItem('pageViewCount', `${pageViewCount + 1}`)
  }, [location])

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
