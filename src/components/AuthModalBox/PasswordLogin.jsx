import {Button, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import PropTypes from "prop-types";
import service from "@/utils/http.js";
import message from "@/components/Message/index.jsx";
import {useContext} from "react";
import {UserInfoContext} from "@/components/UserInfoProvider/index.jsx";

const PasswordLogin = ({setMode, handleClose}) => {
  const [, setUserInfo] = useContext(UserInfoContext)

  const fetchLogin = async (params) => {
    return await service.post(`/user/login`, params)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const {Success, Data} = await fetchLogin(formJson)
    if (!Success) {
      return
    }
    localStorage.setItem('AccessToken', Data.AccessToken)
    localStorage.setItem('ExpiresIn', Data.ExpiresIn)
    localStorage.setItem('TokenType', Data.TokenType)
    localStorage.setItem('UserInfo', JSON.stringify(Data))
    message.success({
      content: '登录成功',
    })
    setUserInfo(Data)
    handleClose();
  }

  return <form onSubmit={onSubmit}>
    <DialogTitle>
      <div>登录</div>
    </DialogTitle>
    <DialogContent style={{padding: '0 24px'}}>
      <TextField
        name='mobile'
        fullWidth
        autoFocus
        required
        margin="normal"
        label="手机号"
        variant="standard"
        placeholder="请输入手机号"
      />
      <TextField
        name='password'
        fullWidth
        autoFocus
        required
        margin="normal"
        label="密码"
        variant="standard"
        type='password'
        placeholder="请输入密码"
      />
    </DialogContent>
    <DialogContent
      style={{
        padding: '5px 24px 0',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
      <Button style={{padding:'0'}} onClick={() => {setMode('register')}}>注册用户</Button>
      <Button style={{padding:'0'}} onClick={() => {setMode('mobileLogin')}}>手机号登录</Button>
    </DialogContent>
    <DialogActions style={{padding: '24px'}}>
      <Button variant='contained' type="submit" fullWidth>登录</Button>
    </DialogActions>
  </form>
}

PasswordLogin.propTypes = {
  setMode: PropTypes.func,
  handleClose: PropTypes.func
}

export default PasswordLogin
