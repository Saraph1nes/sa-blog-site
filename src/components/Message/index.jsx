'use client'

import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { createRoot } from "react-dom/client";

function Message(props) {
  const { content, duration, type, callback } = { ...props };
  // 开关控制：默认true,调用时会直接打开
  const [open, setOpen] = useState(true);
  // 关闭消息提示
  const handleClose = (event, reason) => {
    callback && callback()
    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {content}
      </Alert>
    </Snackbar>
  );
}

const createMessage = ({ content, duration = 1500, type, callback }) => {
  const dom = document.createElement('div');
  const JSXdom = <Message content={content} duration={duration} type={type} callback={callback} />;
  createRoot(dom).render(JSXdom);
  document.body.appendChild(dom);
};

const message = {
  dom: null,
  success({ content, duration = 1000, callback }) {
    this.dom = createMessage({ content, duration, callback, type: 'success' });
  },
  error({ content, duration = 1000, callback }) {
    this.dom = createMessage({ content, duration, callback, type: 'error' });
  },
  warning({ content, duration = 1000, callback }) {
    this.dom = createMessage({ content, duration, callback, type: 'warning' });
  },
  info({ content, duration = 1000, callback }) {
    this.dom = createMessage({ content, duration, callback, type: 'info' });
  }
};


export default message;
