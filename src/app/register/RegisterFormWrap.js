import {Button, FormControl, TextField} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {isMobile} from "@/utils/common";
import service from "@/utils/http";
import message from "@/components/Message";
import {useRouter} from "next/navigation";

const RegisterFormWrap = () => {
  const router = useRouter()
  const [sendingCodeCount, setSendingCodeCount] = useState(-1)
  const intervalIdRef = useRef(null);
  const [formData, setFormData] = useState({
    mobile: '', code: '', password: '', confirmPassword: ''
  })
  const [formError, setFormError] = useState({
    mobile: {
      error: false, txt: ''
    }, code: {
      error: false, txt: ''
    }, password: {
      error: false, txt: ''
    }, confirmPassword: {
      error: false, txt: ''
    },
  })

  useEffect(() => {
    setFormError({
      mobile: {
        error: false, txt: ''
      }, code: {
        error: false, txt: ''
      }, password: {
        error: false, txt: ''
      }, confirmPassword: {
        error: false, txt: ''
      },
    })
  }, [formData]);

  const fetchSendRegisterCodeSMS = async (params) => {
    return await service.post(`/user/sendRegisterCodeSMS`, params)
  }

  const fetchRegister = async (params) => {
    return await service.post(`/user/register`, params)
  }

  const formVerify = () => {
    if (!formData.mobile) {
      setFormError(v => ({
        ...v,
        mobile: {
          error: true,
          txt: '手机号码不能为空'
        }
      }))
      return false
    }
    if (!isMobile(formData.mobile)) {
      setFormError(v => ({
        ...v,
        mobile: {
          error: true,
          txt: '手机号码格式不正确'
        }
      }))
      return false
    }
    if (!formData.code) {
      setFormError(v => ({
        ...v,
        code: {
          error: true,
          txt: '验证码不能为空'
        }
      }))
      return false
    }
    if (!formData.password) {
      setFormError(v => ({
        ...v,
        password: {
          error: true,
          txt: '密码不能为空'
        }
      }))
      return false
    }
    if (!formData.confirmPassword) {
      setFormError(v => ({
        ...v,
        confirmPassword: {
          error: true,
          txt: '确认密码不能为空'
        }
      }))
      return false
    }
    if (formData.confirmPassword !== formData.password) {
      setFormError(v => ({
        ...v,
        confirmPassword: {
          error: true,
          txt: '确认密码与密码不一致'
        }
      }))
      return false
    }
    return true
  }

  const onSubmit = async () => {
    if (!formVerify()) {
      return
    }

    const fetchRegisterRes = await fetchRegister({
      mobile: formData.mobile,
      code: formData.code,
      password: formData.password,
    })

    if (fetchRegisterRes.Success) {
      message.success({
        content: '注册成功，正在跳转...',
        callback: () => {
          router.push('/login')
        }
      })
    }
  }

  const onSendCode = async () => {
    if (!formData.mobile) {
      setFormError(v => ({
        ...v,
        mobile: {
          error: true,
          txt: '手机号码不能为空'
        }
      }))
      return
    }
    if (!isMobile(formData.mobile)) {
      setFormError(v => ({
        ...v,
        mobile: {
          error: true,
          txt: '手机号码格式不正确'
        }
      }))
      return
    }

    const fetchSendRegisterCodeSMSRes = await fetchSendRegisterCodeSMS({
      mobile: formData.mobile
    })

    if (!fetchSendRegisterCodeSMSRes.Success) {
      return
    }

    setSendingCodeCount(60);

    intervalIdRef.current = setInterval(() => {
      setSendingCodeCount((prevCount) => {
        if (prevCount === 0) {
          clearInterval(intervalIdRef.current);
          return -1;
        } else {
          return prevCount - 1;
        }
      });
    }, 1000);
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  return <form className='login-panel-input-wrap'>
    <TextField
      fullWidth
      error={formError.mobile.error}
      helperText={formError.mobile.txt}
      label="手机号"
      variant="standard"
      value={formData.mobile}
      onChange={e => {
        setFormData(v => ({...v, mobile: e.target.value}))
      }}
    />
    <div
      className='input-item' style={{display: 'flex', alignItems: 'baseline'}}>
      <FormControl margin='normal' style={{flex: '1'}}>
        <TextField
          fullWidth
          error={formError.code.error}
          helperText={formError.code.txt}
          label="验证码"
          variant="standard"
          value={formData.code}
          onChange={e => {
            setFormData(v => ({...v, code: e.target.value}))
          }}
        />
      </FormControl>
      <Button variant="contained" style={{width: '150px', marginLeft: '20px'}} onClick={onSendCode}
              disabled={sendingCodeCount > 0}>
        {sendingCodeCount > 0 ? `${sendingCodeCount}秒后可再次发送` : '发送验证码'}
      </Button>
    </div>
    <TextField
      className='input-item'
      fullWidth
      error={formError.password.error}
      helperText={formError.password.txt}
      label="密码"
      variant="standard"
      value={formData.password}
      onChange={e => {
        setFormData(v => ({...v, password: e.target.value}))
      }}
      type='password'
    />

    <TextField
      className='input-item'
      fullWidth
      error={formError.confirmPassword.error}
      helperText={formError.confirmPassword.txt}
      label="确认密码"
      variant="standard"
      value={formData.confirmPassword}
      onChange={e => {
        setFormData(v => ({...v, confirmPassword: e.target.value}))
      }}
      type='password'
    />
    <Button className='register-btn' variant="contained" onClick={onSubmit}>立即注册</Button>
  </form>
}

export default RegisterFormWrap
