import React, {useLayoutEffect, useState} from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Avatar, Button, Divider, ListItemIcon, Tooltip} from "@mui/material";
import message from "@/components/Message";
import {useNavigate} from "react-router-dom";
import {Logout, Person, Settings} from "@mui/icons-material";

import './UserInfo.scss'

const UserInfo = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetting = () => {
    navigate('/user/setting/profile')
    handleClose()
  }

  const handleLogout = () => {
    localStorage.removeItem('AccessToken')
    localStorage.removeItem('ExpiresIn')
    localStorage.removeItem('TokenType')
    localStorage.removeItem('UserInfo')

    handleClose()

    setUserInfo(null)

    message.success({
      content: '登出成功',
    })
  }

  const onLogin = () => {
    navigate(`/login?redirect_to=${window.location.pathname}`)
  }

  useLayoutEffect(() => {
    const UserInfo = localStorage.getItem('UserInfo')
    if (UserInfo) {
      const userInfoParse = JSON.parse(UserInfo)
      setUserInfo(userInfoParse)
    }
  }, []);

  return <div className='user-info-area'>
    {!userInfo && <Button variant='contained' onClick={onLogin}>登录</Button>}
    {userInfo && <Tooltip title="帐户设置">
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ml: 2}}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          sx={{width: 30, height: 30}}
          alt={userInfo.Name || userInfo.Mobile}
          src={userInfo.Avatar || ''}
        />
      </IconButton>
    </Tooltip>}
    <Menu
      classes={{
        root: 'user-info-area-menu'
      }}
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      // transformOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
    >
      <MenuItem onClick={handleSetting}>
        <Avatar/>
        <div style={{marginLeft: '20px'}}>Saraph1nes</div>
      </MenuItem>
      <Divider/>
      {/*<MenuItem onClick={handleSetting}>*/}
      {/*  <ListItemIcon>*/}
      {/*    <Person fontSize="small"/>*/}
      {/*  </ListItemIcon>*/}
      {/*  <div>个人资料</div>*/}
      {/*</MenuItem>*/}
      {/*<MenuItem onClick={handleSetting}>*/}
      {/*  <ListItemIcon>*/}
      {/*    <Settings fontSize="small"/>*/}
      {/*  </ListItemIcon>*/}
      {/*  <div>系统设置</div>*/}
      {/*</MenuItem>*/}
      <MenuItem sx={{alignItems: 'center', justifyContent: 'center'}} onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small"/>
        </ListItemIcon>
        <div>退出登录</div>
      </MenuItem>
    </Menu>
  </div>
}

export default UserInfo
