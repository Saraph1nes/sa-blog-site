import {Button} from "@mui/material";

import './index.scss'

const PageNotFound = () => {

  return <div className='page-not-found'>
    <div className='page-not-found-container'>
      <div className='page-not-found-container-left'>
        <div>ERROR 404</div>
        <div style={{fontSize: '80px'}}>嘿！</div>
        <div style={{fontSize:'30px'}}>我没能找到你正在寻找的页面</div>
        <Button style={{marginTop: '80px'}} href='/' variant='contained'>回主页</Button>
      </div>
      <div className='page-not-found-container-right'>
        <img src="https://assest.sablogs.cn/imgs/blog/ghost-img.png" alt=""/>
        <div className='ghost-shadow'></div>
      </div>
    </div>
  </div>
}

export default PageNotFound
