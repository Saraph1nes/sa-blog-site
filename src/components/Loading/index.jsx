'use client'

import React from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import {createRoot} from "react-dom/client";

const createBackdrop = () => {
  const dom = document.createElement('div');
  dom.id = 'page-loading'
  const JSXDom = <Backdrop
    open={true}
  >
    <CircularProgress color="inherit"/>
  </Backdrop>;
  createRoot(dom).render(JSXDom);
  document.body.appendChild(dom);
  return dom;
};

const loading = {
  dom: null,
  show() {
    this.dom = createBackdrop();
  },
  hide() {
    const dom = document.getElementById('page-loading');
    if (dom) {
      dom.remove()
    }
  }
}

export default loading
