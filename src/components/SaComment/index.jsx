import {useContext, useRef, useState} from 'react';
import {Button, IconButton, useTheme} from '@mui/material';
import Popover from '@mui/material/Popover';
import EmojiPicker from 'emoji-picker-react';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import message from "@/components/Message";
import classname from "classname";
import service from "@/utils/http.js";
import PropTypes from "prop-types";

import './index.scss'
import {UserInfoContext} from "@/components/UserInfoProvider/index.jsx";

const Comment = ({articleData,onCommentSuccess}) => {
  const [, setUserInfo] = useContext(UserInfoContext)
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText] = useState('')
  const textareaRef = useRef(null);

  const [textareaPos, setTextareaPos] = useState({
    startPos: 0,
    endPos: 0
  })

  const onTextareaBlur = () => {
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    setTextareaPos({
      startPos,
      endPos
    })
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEmojiClick = (e) => {
    const emoji = e.emoji;

    const newText =
      text.substring(0, textareaPos.startPos) + emoji + text.substring(textareaPos.endPos);

    setTextareaPos(v => ({
      startPos: v.startPos + emoji.length,
      endPos: v.endPos + emoji.length
    }))

    setText(newText);

    handleClose()
  };

  const onReset = (e) => {
    e.preventDefault()
    setText('')
    message.success({
      content: '重置成功'
    })
  }

  const onVerify = () => {
    if (!text) {
      message.error({
        content: '评论不能为空'
      })
      return false
    }
    return true
  }

  const fetchSaveArticleComment = (params) => {
    return service.post('/article/saveArticleComment', params)
  }

  const onSubmit = async () => {
    if (!onVerify()) {
      return;
    }
    const fetchArticleCommentRes = await fetchSaveArticleComment({
      comment: text,
      articleId: articleData.ID
    })
    if (fetchArticleCommentRes.Code === 40100){
      localStorage.removeItem('AccessToken')
      localStorage.removeItem('ExpiresIn')
      localStorage.removeItem('TokenType')
      localStorage.removeItem('UserInfo')
      setUserInfo(null)
      return
    }
    if (!fetchArticleCommentRes.Success){
      message.error({
        content: fetchArticleCommentRes.Msg || '评论失败'
      })
      return
    }
    message.success({
      content: '评论成功'
    })
    setText('')
    onCommentSuccess && onCommentSuccess()
  }

  const open = Boolean(anchorEl);

  return <div className={
    classname({
      'comment': true,
      'dark': theme.palette.mode === 'dark'
    })
  }>
    <IconButton
      className='comment-textarea-icon-btn'
      onClick={handleClick}
    >
      <AddReactionIcon/>
    </IconButton>
    <div className='comment-textarea-wrap'>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={e => setText(e.target.value)} className="comment-textarea"
        rows={5}
        onBlur={onTextareaBlur}
      />
    </div>
    <div className='comment-btn-area'>
      <Button style={{marginRight: '20px'}} variant='outlined' onClick={onReset}>重置</Button>
      <Button variant='contained' onClick={onSubmit}>提交</Button>
    </div>
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <EmojiPicker
        className='comment-emoji-picker'
        emojiStyle='apple'
        searchDisabled
        skinTonesDisabled
        autoFocusSearch={false}
        onEmojiClick={onEmojiClick}
      />
    </Popover>
  </div>
}

Comment.propTypes = {
  articleData: PropTypes.object,
  onCommentSuccess: PropTypes.func
}

export default Comment;
