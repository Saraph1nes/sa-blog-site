'use client'

import React, {useContext} from "react";
import {IconButton, Tooltip} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {DarkModeContent} from "@/components/DarkModeProvider";

const DarkModeButton = () => {
  const ctx = useContext(DarkModeContent);

  return <Tooltip title={ctx.darkMode === 'dark' ? 'light attract bugs :(' : 'i love dark mode :)'}>
    <IconButton sx={{ ml: 1 }} onClick={ctx.switchMode.toggleDarkMode} color="inherit">
      {ctx.darkMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  </Tooltip>
}

export default DarkModeButton
