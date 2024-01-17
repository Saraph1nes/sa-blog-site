import {useContext, useLayoutEffect, useState} from 'react'
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
import {Link} from 'react-router-dom'
import {useTheme} from "@mui/material";
import SettingPanel from "@/components/Navbar/SettingPanel";

import './index.scss'

const Navbar = () => {
  const theme = useTheme();
  const ctx = useContext(DarkModeContent);
  const [isMobile, setIsMobile] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useLayoutEffect(() => {
    const isMob = window ? window.screen.width < MOBILE_JUDGING_WIDTH : false;
    if (isMob){
      ctx.switchMode.toggleDarkMode('auto')
    }
    setIsMobile(isMob)
  }, [ctx.switchMode]);

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

  return <header className={`header ${ctx.darkMode}`} style={{background: theme.palette.background.default}}>
    {
      !isMobile && <div className='header-wrap'>
        <div className='header-left'>
          <Link to={'/'}>
            <h1 className="title">Saraph1nes Blog</h1>
          </Link>
          <nav className='header-nav'>
            <Link to={'/'} className="nav-item">
              <HouseIcon style={{fontSize: '16px'}}/>
              <span className='nav-item-txt'>首页</span>
            </Link>
            <Link to={'/category'} className="nav-item">
              <CategoryIcon style={{fontSize: '16px'}}/>
              <span className='nav-item-txt'>分类</span>
            </Link>
            {/*<a href={'/photoAlbum'} className="nav-item">*/}
            {/*  <CategoryIcon style={{fontSize: '16px'}}/>*/}
            {/*  <span className='nav-item-txt'>相册</span>*/}
            {/*</a>*/}
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
            <Link to={'/about'} className="nav-item">
              <Person4Icon style={{fontSize: '16px'}}/>
              <span className='nav-item-txt'>介绍</span>
            </Link>
          </nav>
        </div>
        <div className='header-right'>
          <UserInfo/>
          <SettingPanel>
            <IconButton
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
          </SettingPanel>
          {/*<SaDarkMode/>*/}
        </div>
      </div>
    }
    {
      isMobile && <div className='mobile-header-wrap'>
        <AppBar position="static" style={{backgroundColor: 'rgba(0,0,0,0)', backgroundImage: "none"}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters className='mobile-header'>
              <Link to={'/'}>
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
                    <Link to={'/'}>
                      <div className="nav-item">
                        <HouseIcon style={{fontSize: '16px'}}/>
                        <span className='nav-item-txt'>首页</span>
                      </div>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={'/category'}>
                      <div className="nav-item">
                        <CategoryIcon style={{fontSize: '16px'}}/>
                        <span className='nav-item-txt'>分类</span>
                      </div>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={'/about'}>
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
