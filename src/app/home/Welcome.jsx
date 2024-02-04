import {useEffect, useState} from "react";
import {useTheme} from "@mui/material";
import classname from 'classname'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import './welcome.scss'

const Welcome = () => {
  const theme = useTheme();

  const [showArrowDownwardIcon, setShowArrowDownwardIcon] = useState(true)
  const [welcomeTxtPercentage, setWelcomeTxtPercentage] = useState(0)

  const listener = () => {
    const welcomeWrap = document.querySelector('#welcome-wrap')
    if (document.documentElement.scrollTop < 150) {
      setShowArrowDownwardIcon(true)
    } else {
      setShowArrowDownwardIcon(false)
    }

    let scrolled = Math.max(document.documentElement.scrollTop - welcomeWrap.offsetTop, 0) / (welcomeWrap.clientHeight - document.documentElement.clientHeight)
    setWelcomeTxtPercentage(Math.min(scrolled * 100, 100))
  }

  useEffect(() => {
    document.addEventListener('scroll', listener)

    return () => {
      document.removeEventListener('scroll', listener)
    }
  }, [])

  return <section id='welcome-wrap' className={classname({
    'dark': theme.palette.mode === 'dark'
  })}>
    <div className="welcome">
      <div
        id='welcome-text'
        style={{backgroundPositionX: `calc(100% - ${welcomeTxtPercentage}%)`}}
      >
        <div>Welcome To Saraph1nes Blog</div>
        <div>欢迎来到我的博客</div>
      </div>
      {
        showArrowDownwardIcon && <div className='drop-down-icon'>
          <ArrowDownwardIcon sx={{fontSize: '60px'}}/>
        </div>
      }
    </div>
  </section>
}

export default Welcome;
