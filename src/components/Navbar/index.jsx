import { useContext, useLayoutEffect, useState } from 'react'
import { DarkModeContent } from '@/components/DarkModeProvider'
import CategoryIcon from '@mui/icons-material/Category'
import Person4Icon from '@mui/icons-material/Person4'
import HouseIcon from '@mui/icons-material/House'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import UserInfo from '@/components/Navbar/UserInfo'
import { MOBILE_JUDGING_WIDTH } from '@/utils/constant'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material'
import SettingPanel from '@/components/Navbar/SettingPanel'
import SearchIcon from '@mui/icons-material/Search'
import SaSearchPanel from '@/components/SaSearchPanel/index.jsx'

import './index.scss'

const Navbar = () => {
  const theme = useTheme()
  const ctx = useContext(DarkModeContent)

  const [isMobile, setIsMobile] = useState(false)
  // const [anchorElNav, setAnchorElNav] = useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  useLayoutEffect(() => {
    const isMob = window ? window.screen.width < MOBILE_JUDGING_WIDTH : false
    setIsMobile(isMob)
  }, [ctx.switchMode])

  // 监听滚动隐藏
  // useLayoutEffect(() => {
  //   let lastScrollTop = 0;
  //
  //   const handleScroll = () => {
  //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //     const scrollDelta = Math.abs(scrollTop - lastScrollTop);
  //
  //     // 设置一个滚动阈值，例如 20px
  //     const scrollThreshold = 50;
  //
  //     if (scrollDelta > scrollThreshold) {
  //       if (scrollTop > lastScrollTop) {
  //         // 向下滚动，隐藏导航栏
  //         setShowNav(false);
  //       } else {
  //         // 向上滚动，显示导航栏
  //         setShowNav(true);
  //       }
  //       lastScrollTop = scrollTop;
  //     }
  //   };
  //
  //   window.addEventListener('scroll', handleScroll);
  //
  //   return () => {
  //     // 清除滚动事件监听器
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <>
      {!isMobile && (
        <header className="header-wrap">
          <div className="header-left">
            <Link to={'/'}>
              <h1 className="title">Saraph1nes Blog</h1>
            </Link>
            <nav className="header-nav">
              <Link to={'/'} className="nav-item">
                <HouseIcon style={{ fontSize: '16px' }} />
                <span className="nav-item-txt">首页</span>
              </Link>
              <Link to={'/category'} className="nav-item">
                <CategoryIcon style={{ fontSize: '16px' }} />
                <span className="nav-item-txt">分类</span>
              </Link>
              <Link to={'/subject'} className="nav-item">
                <Person4Icon style={{ fontSize: '16px' }} />
                <span className="nav-item-txt">专题</span>
              </Link>
              <Link to={'/about'} className="nav-item">
                <Person4Icon style={{ fontSize: '16px' }} />
                <span className="nav-item-txt">介绍</span>
              </Link>
            </nav>
          </div>
          <div className="header-right">
            <SaSearchPanel>
              <IconButton
                aria-label="搜索"
                sx={{ marginRight: '20px' }}
                color="inherit"
              >
                <SearchIcon />
              </IconButton>
            </SaSearchPanel>
            <SettingPanel>
              <IconButton
                aria-label="主题切换"
                sx={{ marginRight: '20px' }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </SettingPanel>
            <UserInfo />
            {/*<SaDarkMode/>*/}
          </div>
        </header>
      )}
      {isMobile && (
        <AppBar
          position="static"
          sx={{
            background: theme.palette.background.paper,
            color: theme.palette.color.default,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters className="mobile-header">
              <Link to={'/'}>
                <Typography noWrap>Saraph1nes Blog</Typography>
              </Link>
              <div style={{ display: 'flex' }}>
                <SettingPanel>
                  <IconButton color="inherit">
                    <MenuIcon />
                  </IconButton>
                </SettingPanel>
                <div style={{ marginLeft: '10px' }}>
                  <UserInfo />
                </div>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  )
}

export default Navbar
