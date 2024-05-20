import React, { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Tooltip,
  useTheme,
} from '@mui/material'
import message from '@/components/Message'
import { useNavigate } from 'react-router-dom'
import { Logout } from '@mui/icons-material'
import { UserInfoContext } from '@/components/UserInfoProvider/index.jsx'
import AuthModalBox from '@/components/AuthModalBox/index.jsx'

import './UserInfo.scss'

const UserInfo = () => {
  const [userInfo, setUserInfo] = useContext(UserInfoContext)
  const theme = useTheme()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSetting = () => {
    navigate('/blog/user/setting/profile')
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

    navigate('/blog')
  }

  return (
    <div
      className="user-info-area"
      style={{ color: theme.palette.primary.main }}
    >
      {!userInfo && (
        <AuthModalBox>
          <Button variant="contained">登录</Button>
        </AuthModalBox>
      )}
      {userInfo && (
        <Tooltip title="帐户设置">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{ width: 30, height: 30 }}
              alt={'头像'}
              src={userInfo?.Avatar || ''}
            />
          </IconButton>
        </Tooltip>
      )}
      <Menu
        classes={{
          root: 'user-info-area-menu',
        }}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        // transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleSetting}>
          <Avatar src={userInfo?.Avatar} />
          <div style={{ marginLeft: '20px' }}>
            {userInfo?.Name ||
              `${userInfo?.Mobile.substring(0, 3)}****${userInfo?.Mobile.substring(7)}` ||
              ''}
          </div>
        </MenuItem>
        <Divider />
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
        <MenuItem
          sx={{ alignItems: 'center', justifyContent: 'center' }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <div>退出登录</div>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default UserInfo
