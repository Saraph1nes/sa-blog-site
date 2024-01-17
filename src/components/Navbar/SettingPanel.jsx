import {useContext, useState} from "react";
import classname from "classname";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import {DarkModeContent} from "@/components/DarkModeProvider";
import SaColorPicker from "@/components/SaColorPicker/index.jsx";
import PropTypes from "prop-types";
import DarkModeButton from "@/components/SaDarkMode/index.jsx";

import './index.scss'

const SettingPanel = ({children}) => {
  const ctx = useContext(DarkModeContent);
  const theme = useTheme()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const onSaColorPickerChange = (color) => {
    ctx.switchColor.setPrimaryMain(color)
  }

  return <div
    className={
      classname({
        'dark-mode-button': true,
        'dark': ctx.darkMode === 'dark'
      })
    }
  >
    <div onClick={() => setIsDrawerOpen(true)}>{children}</div>
    <Drawer
      anchor={'right'}
      open={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false)
      }}
    >
      <Box
        sx={{minWidth: '300px'}}
        role="presentation"
      >
        <List
        >
          <ListItem>
            <ListItemText primary="暗黑模式"/>
            <DarkModeButton/>
          </ListItem>
        </List>
        <List
        >
          <ListItem>
            <ListItemText primary="主题色"/>
          </ListItem>
          <ListItem>
            <SaColorPicker
              value={theme.palette.primary.main}
              onChange={onSaColorPickerChange}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  </div>
}

SettingPanel.propTypes = {
  children: PropTypes.node
}

export default SettingPanel
