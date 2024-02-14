import {
  Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from "@mui/material";
import {useContext, useLayoutEffect, useRef, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import dayjs from "dayjs";
import message from "@/components/Message/index.jsx";
import service from "@/utils/http.js";
import {UserInfoContext} from "@/components/UserInfoProvider/index.jsx";

import './index.scss'


const UserSettingProfile = () => {
  const nameInputRef = useRef(null)
  const [avatar, setAvatar] = useState(null)
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false)
  const [nameDialogOpen, setNameDialogOpen] = useState(false)
  const [userInfo, setUserInfo] = useContext(UserInfoContext)

  const fetchGetUserInfo = () => {
    return service.get('/user/getUserInfo');
  }

  const init = async () => {
    const {Data} = await fetchGetUserInfo();
    setUserInfo(Data)
  }

  useLayoutEffect(() => {
    init()
  }, []);

  if (!userInfo) {
    return null
  }

  return <div className='user-setting-profile'>
    <input
      type="file"
      name=""
      id="avatarChoose"
      accept='image/*'
      style={{display: 'none'}}
      onChange={e => {
        const file = e.target.files[0];
        setAvatar(file)
      }}
    />
    <Avatar
      src={userInfo?.Avatar || ''}
      sx={{width: 70, height: 70, cursor: 'pointer'}}
      onClick={() => {
        setAvatarDialogOpen(true)
      }}
    />
    <div className='m-t-20 flex items-center relative'>
      <span>{userInfo?.Name || `用户${userInfo?.ID}`}</span>
      <EditIcon
        fontSize='20'
        className='absolute color-primary r--30'
        onClick={() => {
          setNameDialogOpen(true)
        }}
      />
    </div>
    <div className='m-t-10 f-s-18'>注册时间：{dayjs(userInfo?.CreatedAt).format('YYYY-MM-DD')}</div>
    {/*<TextField label="昵称" variant="outlined" placeholder='请填写昵称' fullWidth margin="normal"/>*/}
    {/*<TextField type='email' label="邮箱" variant="outlined" placeholder='请填写邮箱' fullWidth margin="normal"/>*/}

    <Dialog open={nameDialogOpen}>
      <DialogTitle>修改昵称</DialogTitle>
      <DialogContent
        style={{
          padding: '10px 20px',
          minWidth: '500px'
        }}
      >
        <TextField
          fullWidth
          size='small'
          label="昵称"
          variant="outlined"
          placeholder='请输入昵称'
          defaultValue={userInfo?.Name || `用户${userInfo?.ID}`}
          inputRef={nameInputRef}
        />
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={() => {
          setNameDialogOpen(false)
        }}>
          取消
        </Button>
        <Button
          variant='contained'
          onClick={async () => {
            const nameVal = nameInputRef.current.value
            if (!nameVal) {
              message.error({
                content: '请先填写昵称'
              })
              return
            }
            const {Success, Msg} = await service.post('/user/saveName', {
              name: nameVal
            })

            if (!Success) {
              message.error({
                content: Msg || '保存错误，请联系管理员'
              })
              return
            }
            message.success({
              content: '修改成功'
            })
            const {Data} = await fetchGetUserInfo();
            setUserInfo(Data)
            setNameDialogOpen(false)
          }}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog open={avatarDialogOpen}>
      <DialogTitle>设置头像</DialogTitle>
      <DialogContent sx={{
        minHeight: '200px', minWidth: '500px',
      }}>
        <Button variant={"outlined"} onClick={() => {
          const avatarChoose = document.querySelector('#avatarChoose');
          avatarChoose.click()
        }}>{avatar ? '重新上传' : '上传头像'}</Button>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px'
        }}>
          {avatar && <img src={URL.createObjectURL(avatar)} alt='头像'
                          style={{maxWidth: '500px', maxHeight: '300px'}}/>}
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant={'outlined'} onClick={() => {
          setAvatarDialogOpen(false)
        }}>
          取消
        </Button>
        <Button
          variant='contained'
          onClick={async () => {
            if (!avatar) {
              message.error({
                content: '请先上传头像'
              })
              return
            }
            const {Success, Msg} = await service.postForm('/user/saveAvatar', {
              imgFile: avatar
            })

            if (!Success) {
              message.error({
                content: Msg || '保存错误，请联系管理员'
              })
              return
            }

            message.success({
              content: '修改成功'
            })

            const {Data} = await fetchGetUserInfo();
            setUserInfo(Data)
            setAvatar(null)
            setAvatarDialogOpen(false)
          }}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  </div>
}

export default UserSettingProfile
