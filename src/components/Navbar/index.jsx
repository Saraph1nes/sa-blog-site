import React, {useContext, useEffect, useState} from 'react'
import DarkModeButton from "@/components/DarkModeButton";
import {DarkModeContent} from "@/components/DarkModeProvider";
import CategoryIcon from '@mui/icons-material/Category';
import Person4Icon from '@mui/icons-material/Person4';
import HouseIcon from '@mui/icons-material/House';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import UserInfo from "@/components/Navbar/UserInfo";
import {MOBILE_JUDGING_WIDTH} from "@/utils/constant";

import './index.scss'

const Navbar = () => {
  const ctx = useContext(DarkModeContent);
  const [isMobile, setIsMobile] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isMounted, setIsMounted] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [userInfo, setUserInfo] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    const isMob = window ? window.screen.width < MOBILE_JUDGING_WIDTH : false;
    setIsMobile(isMob)
    setIsMounted(true)
  }, []);

  // 监听滚动隐藏
  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDelta = Math.abs(scrollTop - lastScrollTop);

      // 设置一个滚动阈值，例如 20px
      const scrollThreshold = 50;

      if (scrollDelta > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
          // 向下滚动，隐藏导航栏
          setShowNav(false);
        } else {
          // 向上滚动，显示导航栏
          setShowNav(true);
        }
        lastScrollTop = scrollTop;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // 清除滚动事件监听器
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const UserInfo = localStorage.getItem('UserInfo')
    if (UserInfo) {
      const userInfoParse = JSON.parse(UserInfo)
      setUserInfo(userInfoParse)
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return <header className={`header ${ctx.darkMode}`}>
    {
      !isMobile && <div className='header-wrap'>
        <div className='header-left'>
          <a href={'/'}>
            <h1 className="title">Saraph1nes Blog</h1>
          </a>
        </div>
        <div className='header-right'>
          <nav className='header-nav'>
            <a href={'/'} className="nav-item">
              <HouseIcon style={{fontSize: '16px'}}/>
              <span className='nav-item-txt'>首页</span>
            </a>
            <a href={'/category'} className="nav-item">
              <CategoryIcon style={{fontSize: '16px'}}/>
              <span className='nav-item-txt'>分类</span>
            </a>
            {/*<Link href={'/archives'}>*/}
            {/*  <div className="nav-item">*/}
            {/*    <AutoStoriesIcon style={{fontSize: '16px'}}/>*/}
            {/*    <span className='nav-item-txt'>归档</span>*/}
            {/*  </div>*/}
            {/*</Link>*/}
            {/*<Link href={'/book/1'} className="nav-item">*/}
            {/*  <AutoStoriesIcon style={{fontSize: '16px'}}/>*/}
            {/*  <span className='nav-item-txt'>前端</span>*/}
            {/*</Link>*/}
            {/*<Link href={'/book/2'} className="nav-item">*/}
            {/*  <AutoStoriesIcon style={{fontSize: '16px'}}/>*/}
            {/*  <span className='nav-item-txt'>后端</span>*/}
            {/*</Link>*/}
            {/*<Link href={'/book/3'}>*/}
            {/*  <div className="nav-item">*/}
            {/*    <AutoStoriesIcon style={{fontSize: '16px'}}/>*/}
            {/*    <span className='nav-item-txt'>算法</span>*/}
            {/*  </div>*/}
            {/*</Link>*/}
            <a href={'/about'} className="nav-item">
              <Person4Icon style={{fontSize: '16px'}}/>
              <span className='nav-item-txt'>介绍</span>
            </a>
          </nav>
          <DarkModeButton/>
          <UserInfo userInfo={userInfo}></UserInfo>
        </div>
      </div>
    }
    {
      isMobile && showNav && <div className='mobile-header-wrap'>
        <AppBar position="static" style={{backgroundColor: 'rgba(0,0,0,0)', backgroundImage: "none"}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters className='mobile-header'>
              <Link href={'/'}>
                <Typography
                  noWrap
                >
                  Saraph1nes Blog
                </Typography>
              </Link>

              <Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon/>
                </IconButton>
                <DarkModeButton/>
                <Menu
                  className='mobile-header-nav'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: {xs: 'block', md: 'none'},
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href={'/'}>
                      <div className="nav-item">
                        <HouseIcon style={{fontSize: '16px'}}/>
                        <span className='nav-item-txt'>首页</span>
                      </div>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href={'/category'}>
                      <div className="nav-item">
                        <CategoryIcon style={{fontSize: '16px'}}/>
                        <span className='nav-item-txt'>分类</span>
                      </div>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href={'/about'}>
                      <div className="nav-item">
                        <Person4Icon style={{fontSize: '16px'}}/>
                        <span className='nav-item-txt'>介绍</span>
                      </div>
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    }
  </header>
}

export default Navbar
