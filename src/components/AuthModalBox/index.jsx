import PropTypes from 'prop-types'
import {
  Dialog,
  Slide,
} from "@mui/material";
import React, {useContext, useState} from "react";
import {UserInfoContext} from "@/components/UserInfoProvider/index.jsx";
import PasswordLogin from "@/components/AuthModalBox/PasswordLogin.jsx";
import Register from "@/components/AuthModalBox/Register.jsx";
import MobileLogin from "@/components/AuthModalBox/MobileLogin.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AuthModalBox = ({children}) => {
  const [mode, setMode] = useState('login')
  const [, setUserInfo] = useContext(UserInfoContext)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }


  return <>
    <span onClick={() => {
      setOpen(true)
    }}>{children}</span>
    <Dialog
      fullWidth
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}
    >
      {
        mode === 'login' && <PasswordLogin setMode={setMode} handleClose={handleClose}></PasswordLogin>
      }
      {
        mode === 'register' && <Register setMode={setMode} handleClose={handleClose}></Register>
      }
      {
        mode === 'mobileLogin' && <MobileLogin setMode={setMode} handleClose={handleClose}></MobileLogin>
      }
    </Dialog>
  </>
}

AuthModalBox.propTypes = {
  children: PropTypes.node
}

export default AuthModalBox
