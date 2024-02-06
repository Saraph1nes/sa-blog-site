import {useEffect, useLayoutEffect, useState} from "react";
import {useTheme} from "@mui/material";
import classname from 'classname'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import './welcome.scss'

const Welcome = () => {
  const theme = useTheme();

  const [showArrowDownwardIcon, setShowArrowDownwardIcon] = useState(true)
  const [welcomeTxtPercentage, setWelcomeTxtPercentage] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)

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


  const listenerShow = () => {
    if (!showWelcome) {
      document.removeEventListener('scroll', listenerShow)
      return;
    }
    const articleListWrap = document.querySelector('.article-list-wrap')
    if (articleListWrap && document.documentElement.scrollTop > articleListWrap?.offsetTop) {
      sessionStorage.setItem('showWelcomeStorage', 'false')
      setShowWelcome(false)
    }
  }

  useLayoutEffect(() => {
    const storage = sessionStorage.getItem('showWelcomeStorage')
    if (storage === 'false') {
      setShowWelcome(false)
      return
    }
    document.addEventListener('scroll', listenerShow)
    return () => {
      document.removeEventListener('scroll', listenerShow)
    }
  }, [])

  if (!showWelcome) {
    return null
  }

  return <section id='welcome-wrap' className={classname({
    'dark': theme.palette.mode === 'dark'
  })}>
    <div className="welcome">
      <div
        id='welcome-text'
        style={{backgroundPositionX: `calc(100% - ${welcomeTxtPercentage}%)`}}
      >
        <div>Hello, Welcome To Saraph1nes Blog</div>
        {/*<div>你好，欢迎来到我的博客</div>*/}
      </div>
      {
        showArrowDownwardIcon && <div className='drop-down-icon'>
          <div>
            <div>Scroll Down</div>
            {/*<div>向下滑动</div>*/}
          </div>
          <ArrowDownwardIcon sx={{fontSize: '40px'}}/>
        </div>
      }
    </div>
  </section>
}

export default Welcome;
