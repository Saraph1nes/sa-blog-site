import {Button, FormControl, Input, InputAdornment, InputLabel} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useState} from "react";
import service from "@/utils/http";

const ForgotPasswordFormWrap = ({forgotPasswordMode, setForgotPasswordMode}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = () => {
    setForgotPasswordMode(true)
  }

  const fetchLogin = async () => {
    return await service.post(`/auth/login`, {
      mobile: '123',
      password: 'ccccccc'
    })
  }

  const onLogin = async () => {
    const res = await fetchLogin()
    console.log(res)
  }

  return <form className='login-panel-input-wrap'>
    <FormControl fullWidth margin='normal'>
      <InputLabel htmlFor="standard-adornment-password">手机号</InputLabel>
      <Input
      />
    </FormControl>
    <div style={{display: 'flex', alignItems: 'baseline'}}>
      <FormControl margin='normal' style={{flex: '1'}}>
        <InputLabel htmlFor="standard-adornment-password">验证码</InputLabel>
        <Input
        />
      </FormControl>
      <Button variant="contained" style={{width: '140px', marginLeft: '20px'}}>
        发送验证码
        {/*59秒后再次发送*/}
      </Button>
    </div>
    <FormControl fullWidth margin='normal'>
      <InputLabel htmlFor="standard-adornment-password">新密码</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        endAdornment={<InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOff/> : <Visibility/>}
          </IconButton>
        </InputAdornment>}
      />
    </FormControl>
    <FormControl fullWidth margin='normal'>
      <InputLabel htmlFor="standard-adornment-password">确认密码</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        endAdornment={<InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOff/> : <Visibility/>}
          </IconButton>
        </InputAdornment>}
      />
    </FormControl>
    <Button className='register-btn' variant="contained" onClick={onLogin}>确认修改</Button>
  </form>
}

export default ForgotPasswordFormWrap
