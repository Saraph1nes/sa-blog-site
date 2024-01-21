import {Button, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, TextField} from "@mui/material";
import PropTypes from "prop-types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useContext, useEffect, useRef, useState} from "react";
import service from "@/utils/http.js";
import message from "@/components/Message/index.jsx";
import {UserInfoContext} from "@/components/UserInfoProvider/index.jsx";
import {isMobile} from "@/utils/common.js";

const MobileLogin = ({setMode, handleClose}) => {
  const [, setUserInfo] = useContext(UserInfoContext)
  const intervalIdRef = useRef(null);
  const [sendingCodeCount, setSendingCodeCount] = useState(-1)
  const formRef = useRef(null);

  const fetchSendRegisterCodeSMS = async (params) => {
    return await service.post(`/user/sendRegisterCodeSMS`, params)
  }

  const fetchLogin = async (params) => {
    return await service.post(`/user/login`, params)
  }

  const fetchRegister = async (params) => {
    return await service.post(`/user/register`, params)
  }

  const onSendCode = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const formJson = Object.fromEntries(formData.entries());

    if (!formJson.mobile) {
      message.error({
        content: '手机号码不能为空'
      })
      return
    }

    if (!isMobile(formJson.mobile)) {
      message.error({
        content: '手机号码格式不正确'
      })
      return
    }

    const fetchSendRegisterCodeSMSRes = await fetchSendRegisterCodeSMS({
      mobile: formJson.mobile
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

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (!isMobile(formJson.mobile)) {
      message.error({
        content: '手机号码格式不正确'
      })
      return
    }

    if (formJson.confirmPassword !== formJson.password) {
      message.error({
        content: '确认密码与密码不一致'
      })
      return
    }

    const fetchRegisterRes = await fetchRegister(formJson)

    if (!fetchRegisterRes.Success) {
      return
    }

    const fetchLoginRes = await fetchLogin(formJson)
    if (!fetchLoginRes.Success) {
      return
    }
    localStorage.setItem('AccessToken', fetchLoginRes.Data.AccessToken)
    localStorage.setItem('ExpiresIn', fetchLoginRes.Data.ExpiresIn)
    localStorage.setItem('TokenType', fetchLoginRes.Data.TokenType)
    localStorage.setItem('UserInfo', JSON.stringify(fetchLoginRes.Data))

    message.success({
      content: '注册成功,已登录',
    })

    setUserInfo(fetchLoginRes.Data)
    handleClose();
  }

  return <form onSubmit={onSubmit} ref={formRef}>
    <DialogTitle>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <IconButton onClick={() => {
          setMode('login')
        }}>
          <ArrowBackIcon/>
        </IconButton>
        <span style={{marginLeft: '10px'}}>手机号登录</span>
      </div>
    </DialogTitle>
    <DialogContent style={{padding: '0 24px'}}>
      <TextField
        name='mobile'
        required
        fullWidth
        label="手机号"
        variant="standard"
        type='mobile'
        placeholder="请输入手机号"
      />
      <div
        className='input-item' style={{display: 'flex', alignItems: 'baseline'}}>
        <FormControl margin='normal' style={{flex: '1'}}>
          <TextField
            name='code'
            required
            fullWidth
            label="验证码"
            variant="standard"
            placeholder="请输入验证码"
          />
        </FormControl>
        <Button
          variant="contained"
          style={{width: '150px', marginLeft: '20px'}}
          onClick={onSendCode}
          disabled={sendingCodeCount > 0}
        >
          {sendingCodeCount > 0 ? `${sendingCodeCount}秒后可再次发送` : '发送验证码'}
        </Button>
      </div>
    </DialogContent>
    <DialogActions style={{padding: '24px'}}>
      <Button variant='contained' type="submit" fullWidth>登录</Button>
    </DialogActions>
  </form>
}

MobileLogin.propTypes = {
  setMode: PropTypes.func,
  handleClose: PropTypes.func,
}

export default MobileLogin
