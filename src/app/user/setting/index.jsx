import {List, ListItemButton, ListItemIcon, ListItemText, Paper} from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PersonIcon from '@mui/icons-material/Person';
import {Link, Outlet, Route, Routes} from "react-router-dom";

import './index.scss'

const UserSettingLayout = () => {

  return <div className='user-profile'>
    <Paper elevation={3} className='user-profile-menu'>
      <List className='user-profile-menu-list' component="nav" aria-label="main mailbox folders">
        <Link to={'/user/setting/profile'}>
          <ListItemButton
            className='user-profile-menu-list-item'
            selected={1}
          >
            <ListItemIcon>
              <InsertEmoticonIcon />
            </ListItemIcon>
            <ListItemText primary="个人资料" />
          </ListItemButton>
        </Link>
        <Link to={'/user/setting/account'}>
          <ListItemButton
            className='user-profile-menu-list-item'
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="账号设置" />
          </ListItemButton>
        </Link>
      </List>
    </Paper>
    <Paper elevation={3} className='user-profile-container'>
      <Outlet />
    </Paper>
  </div>
}

export default UserSettingLayout
