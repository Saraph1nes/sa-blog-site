import {Divider} from "@mui/material";

import './index.scss'
import {Link} from "react-router-dom";

const Footer = () => {
  return <div className='footer-wrap'>
    <Divider/>
    <footer className='footer'>
      <div className='copyright-information'>
        <div className='copyright-information-title'>版权信息</div>
        <div className='m-t-20'>© 2023 Saraph1nes Blog</div>
      </div>
      {/*<div className='friendly-link'>*/}
      {/*  <div className='friendly-link-title'>友情链接</div>*/}
      {/*  <div className='m-t-20'>123</div>*/}
      {/*</div>*/}
      {/*<div className='contact-information'>联系方式</div>*/}
      <div className='internet-content-provider'>
        <div className='internet-content-provider-title'>备案号</div>
        <Link
          to='https://beian.miit.gov.cn/'
          target='_blank'
          style={{display: 'block'}}
          className='m-t-20'
        >
          鄂ICP备2022013786号
        </Link>
      </div>
    </footer>
  </div>
}

export default Footer
