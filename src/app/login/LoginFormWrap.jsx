import {Button, CircularProgress, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import service from "@/utils/http";
import {isMobile} from "@/utils/common";
import message from "@/components/Message";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";

const LoginFormWrap = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const [formError, setFormError] = useState({
    mobile: {
      error: false, txt: ''
    }, password: {
      error: false, txt: ''
    }
  })
  useEffect(() => {
    setFormError({
      mobile: {
        error: false, txt: ''
      }, password: {
        error: false, txt: ''
      },
    })
  }, [formData]);

  const fetchLogin = async (params) => {
    return await service.post(`/user/login`, params)
  }

  const formVerify = () => {
    if (!formData.mobile) {
      setFormError(v => ({
        ...v, mobile: {
          error: true, txt: '手机号码不能为空'
        }
      }))
      return false
    }
    if (!isMobile(formData.mobile)) {
      setFormError(v => ({
        ...v, mobile: {
          error: true, txt: '手机号码格式不正确'
        }
      }))
      return false
    }
    if (!formData.password) {
      setFormError(v => ({
        ...v, password: {
          error: true, txt: '密码不能为空'
        }
      }))
      return false
    }
    return true
  }

  const onLogin = async () => {
    if (!formVerify()) {
      console.log('formVerify失败', formData)
      return
    }
    setBtnLoading(true)
    const {Success, Data} = await fetchLogin({
      mobile: formData.mobile, password: formData.password
    })
    setBtnLoading(false)
    if (Success && localStorage) {
      localStorage.setItem('AccessToken', Data.AccessToken)
      localStorage.setItem('ExpiresIn', Data.ExpiresIn)
      localStorage.setItem('TokenType', Data.TokenType)
      localStorage.setItem('UserInfo', JSON.stringify(Data))
      const redirectTo = searchParams.get('redirect_to');
      message.success({
        content: '登录成功, 正在跳转...',
        callback: () => {
          window.location.replace(redirectTo || '/')
        }
      })
    }
  }

  return <form className='login-panel-input-wrap' autoComplete="on">
    <TextField
      fullWidth
      error={formError.mobile.error}
      helperText={formError.mobile.txt}
      label="手机号"
      disabled={btnLoading}
      variant="standard"
      value={formData.mobile}
      onChange={e => {
        setFormData(v => ({...v, mobile: e.target.value}))
      }}
    />
    <TextField
      className='input-item'
      fullWidth
      error={formError.password.error}
      helperText={formError.password.txt}
      label="密码"
      disabled={btnLoading}
      variant="standard"
      value={formData.password}
      onChange={e => {
        setFormData(v => ({...v, password: e.target.value}))
      }}
      type='password'
    />
    <div className='other-action-bar'>
      <div className='new-vip'>
        <Link to={'/register'}>
          新用户注册
        </Link>
      </div>
      {/*<div className='forgot-password' onClick={handleForgotPassword}>忘记密码</div>*/}
    </div>
    <Button disabled={btnLoading} className='login-btn' variant="contained" onClick={onLogin}>
      {btnLoading ? <CircularProgress/> : '登录'}
    </Button>
    {/*<div className='other-login-methods'>*/}
    {/*  <img className='other-login-methods-item wechat' src="https://assest.sablogs.cn/imgs/blog/wechat.png" alt="" width={50}/>*/}
    {/*</div>*/}
  </form>
}

export default LoginFormWrap
