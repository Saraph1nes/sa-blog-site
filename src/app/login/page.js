'use client'

import {useTheme} from "@mui/material";
import React, {useState} from "react";
import classname from 'classname'
import LoginFormWrap from "@/app/login/LoginFormWrap";

import './page.scss'

const Login = () => {
  const theme = useTheme()

  return <div className={classname({
    "page-login-wrap": true, 'dark': theme.palette.mode === 'dark'
  })}>
    <div className='page-login'>
      <div className='login-panel'>
        <div className='login-panel-logo-wrap'>
          <img alt='sablog-logo' className="login-panel-logo"
               src='https://assest.sablogs.cn/imgs/blog/logo_sablogs.png'/>
        </div>
        <LoginFormWrap/>
        {/*{forgotPasswordMode && <ForgotPasswordFormWrap*/}
        {/*  forgotPasswordMode={forgotPasswordMode}*/}
        {/*  setForgotPasswordMode={setForgotPasswordMode}*/}
        {/*/>}*/}
      </div>
    </div>
  </div>
}

export default Login
