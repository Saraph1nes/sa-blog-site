'use client'

import {useTheme} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, {useState} from "react";
import classname from 'classname'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RegisterFormWrap from "@/app/register/RegisterFormWrap";
import Link from "next/link";

import './page.scss'

const Register = () => {
  const theme = useTheme()

  return <div className={classname({
    "page-login-wrap": true, 'dark': theme.palette.mode === 'dark'
  })}>
    <div className='page-login'>
      <div className='login-panel'>
        <Link href={'/login'}>
          <IconButton className='back-btn' color="inherit">
            <ArrowBackIosNewIcon/>
          </IconButton>
        </Link>
        <div className='login-panel-logo-wrap'>
          <img alt='sablog-logo' className="login-panel-logo"
               src='https://assest.sablogs.cn/imgs/blog/logo_sablogs.png'/>
        </div>
        <RegisterFormWrap/>
      </div>
    </div>
  </div>
}

export default Register
