'use client'

import {useRef, useState} from 'react';
import {Button, IconButton, useTheme} from '@mui/material';
import Popover from '@mui/material/Popover';
import EmojiPicker from 'emoji-picker-react';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import message from "@/components/Message";
import './index.scss'
import classname from "classname";

const Comment = () => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText] = useState('')
  const textareaRef = useRef(null);

  const [textareaPos, setTextareaPos] = useState({
    startPos: 0,
    endPos: 0
  })

  const onTextareaBlur = e => {
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

  const onSubmit = () => {
    console.log('text', text);
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
        rows={10}
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

export default Comment;
