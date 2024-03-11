import MarkdownNavbar from "markdown-navbar";
import {useContext} from "react";
import {DarkModeContent} from "@/components/DarkModeProvider/index.jsx";
import PropTypes from "prop-types";
import cx from 'classname'
import {useMediaQuery} from "@mui/material";

import './index.scss'

const PageGuideNav = ({source}) => {
  const ctx = useContext(DarkModeContent)
  const osDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const themeDarkMode = ctx.darkMode === 'auto' ? (osDarkMode ? 'dark' : 'light') : ctx.darkMode

  return <div className={cx({
    'page-guide-nav-content-wrap': true,
    'dark': themeDarkMode === 'dark'
  })}>
    <MarkdownNavbar
      className='page-guide-nav-content'
      headingTopOffset={20}
      source={source}
      ordered={false}
      updateHashAuto={false}
      declarative={false}
    />
  </div>
}

PageGuideNav.propTypes = {
  source: PropTypes.string
}

export default PageGuideNav
