import {useContext} from "react";
import classname from "classname";
import {
  ToggleButton,
  ToggleButtonGroup,
  Tooltip
} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import {DarkModeContent} from "@/components/DarkModeProvider";

import './index.scss'

const DarkModeButton = () => {
  const ctx = useContext(DarkModeContent);

  return <div
    className={
      classname({
        'dark-mode-button': true,
        'dark': ctx.darkMode === 'dark'
      })
    }
  >
    <ToggleButtonGroup
      color="primary"
      size="small"
      exclusive
      aria-label="模式切换"
      value={ctx.darkMode}
      onChange={(e, data) => {
        if (data) {
          ctx.switchMode.toggleDarkMode(data)
        }
      }}
    >
      <ToggleButton value="light" aria-label="明亮模式">
        <Tooltip title='明亮模式'>
          <Brightness7Icon></Brightness7Icon>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="dark" aria-label="暗黑模式">
        <Tooltip title='暗黑模式'>
          <Brightness4Icon></Brightness4Icon>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="auto" aria-label="自动模式">
        <Tooltip title='自动模式'>
          <BrightnessAutoIcon></BrightnessAutoIcon>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
}

export default DarkModeButton
