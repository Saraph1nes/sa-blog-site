import { Divider, Paper } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Person4Icon from '@mui/icons-material/Person4'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { DarkModeContent } from '@/components/DarkModeProvider'
import HomeIcon from '@mui/icons-material/Home'
import CategoryIcon from '@mui/icons-material/Category'
import classname from 'classname'

import './index.scss'

const Footer = () => {
  const ctx = useContext(DarkModeContent)
  const navigate = useNavigate()

  const pathname = window.location.pathname

  return (
    <>
      <div className="footer-wrap">
        <Divider />
        <footer
          className={classname({
            footer: true,
            isMobile: ctx.isMobile,
          })}
        >
          <div className="copyright-information">
            <div className="copyright-information-title">版权信息</div>
            <div className="m-t-20">© 2024 Saraph1nes Blog</div>
          </div>
          {/*<div className='friendly-link'>*/}
          {/*  <div className='friendly-link-title'>友情链接</div>*/}
          {/*  <div className='m-t-20'>123</div>*/}
          {/*</div>*/}
          {/*<div className='contact-information'>联系方式</div>*/}
          <div className="internet-content-provider">
            <div className="internet-content-provider-title">备案号</div>
            <Link
              to="https://beian.miit.gov.cn/"
              target="_blank"
              style={{ display: 'block' }}
              className="m-t-20"
            >
              鄂ICP备2022013786号
            </Link>
          </div>
        </footer>
      </div>

      {ctx.isMobile && ['/', '/category', '/about'].includes(pathname) && (
        <Paper elevation={12} className="mobile-footer-wrap">
          <BottomNavigation
            showLabels
            value={pathname}
            onChange={(_, newValue) => {
              navigate(newValue)
            }}
          >
            <BottomNavigationAction
              value="/"
              label="首页"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              value="/category"
              label="分类"
              icon={<CategoryIcon />}
            />
            <BottomNavigationAction
              value="/about"
              label="关于"
              icon={<Person4Icon />}
            />
          </BottomNavigation>
        </Paper>
      )}
    </>
  )
}

export default Footer
