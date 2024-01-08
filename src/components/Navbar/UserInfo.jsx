'use client'

import React from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Avatar, ListItemIcon, Tooltip} from "@mui/material";
import message from "@/components/Message";
import {redirect, useNavigate} from "react-router-dom";
import {Logout, Settings} from "@mui/icons-material";

import './UserInfo.scss'

const UserInfo = ({userInfo}) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetting = () => {
    navigate('/user/profile')
    handleClose()
  }

  const handleLogout = () => {
    localStorage.removeItem('AccessToken')
    localStorage.removeItem('ExpiresIn')
    localStorage.removeItem('TokenType')
    localStorage.removeItem('UserInfo')

    handleClose()

    message.success({
      content: '登出成功，正在跳转...',
      callback: () => {
        redirect('/')
      }
    })
  }

  return <div className='user-info-area'>
    {/*{!userInfo && <Button variant='contained' href={'/login'}>登录</Button>}*/}
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
          sx={{width: 24, height: 24}}
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
      // anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
    >
      {/*<MenuItem onClick={handleClose}>*/}
      {/*  <Avatar/> 简介*/}
      {/*</MenuItem>*/}
      {/*<MenuItem onClick={handleClose}>*/}
      {/*  <Avatar/> 我的账户*/}
      {/*</MenuItem>*/}
      {/*<Divider/>*/}
      {/*<MenuItem onClick={handleClose}>*/}
      {/*  <ListItemIcon>*/}
      {/*    <PersonAdd fontSize="small"/>*/}
      {/*  </ListItemIcon>*/}
      {/*  Add another account*/}
      {/*</MenuItem>*/}
      <MenuItem onClick={handleSetting}>
        <ListItemIcon>
          <Settings fontSize="small"/>
        </ListItemIcon>
        设置
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small"/>
        </ListItemIcon>
        登出
      </MenuItem>
    </Menu>
  </div>
}

export default UserInfo
