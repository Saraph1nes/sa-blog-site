import {useEffect, useState} from "react";
import {Avatar, Button, Divider, Tooltip} from "@mui/material";
import classname from 'classname';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {MOBILE_JUDGING_WIDTH} from "@/utils/constant";
import {useNavigate} from "react-router-dom";

import './page.scss'

const About = () => {
  const navigate = useNavigate()
  const [mediaSelectIndex, setMediaSelectIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const onSocialMediaNavClick = (e) => {
    const val = e.target.getAttribute('value');
    setMediaSelectIndex(+val)
  }

  const goMailTo = () => {
    navigate('mailto:xiayx.leo@gmail.com')
  }

  useEffect(() => {
    const isMob = window ? window.screen.width < MOBILE_JUDGING_WIDTH : false;
    setIsMobile(isMob)
  }, []);

  return <div className='about-page'>
    <div className='about-page-left'>
      <Avatar className='avatar' alt="Saraph1nes"
              src="https://assest.sablogs.cn/imgs/blog/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_1699446683764.png"
              sx={{width: 120, height: 120}}/>
      <div className='name'>
        Saraph1nes
      </div>
      <div className='located'>
        <LocationOnIcon fontSize='small' color='primary'></LocationOnIcon>
        <span className='m-l-7'>湖北 - 武汉</span>
      </div>
      <Divider style={{margin: '20px 0'}}/>
      <div className="social-media">
        <ul className='social-media-nav' onClick={onSocialMediaNavClick}>
          <li value={0} className={classname({
            'social-media-nav-item': true, 'selected': mediaSelectIndex === 0
          })}>
            <img value={0} width={20} className='social-media-icon'
                 src='https://assest.sablogs.cn/imgs/blog/logo_wechat.png'
                 alt={'wechat logo'}/>
          </li>
          <li value={1} className={classname({
            'social-media-nav-item': true, 'selected': mediaSelectIndex === 1
          })}>
            <img value={1} width={20} className='social-media-icon'
                 src='https://assest.sablogs.cn/imgs/blog/logo_gmail.png'
                 alt={'gmail logo'}/>
          </li>
          <li value={2} className={classname({
            'social-media-nav-item': true, 'selected': mediaSelectIndex === 2
          })}>
            <img value={2} width={20} className='social-media-icon'
                 src='https://assest.sablogs.cn/imgs/blog/logo_juejin.png'
                 alt={'juejin logo'}/>
          </li>
        </ul>
        <div className='social-media-content'>
          {mediaSelectIndex === 0 && <div>
            <img className='wechat-qrcode'
                 src='https://assest.sablogs.cn/imgs/blog/wechat-code.jpg'
                 alt='wechat image'/>
          </div>}
          {mediaSelectIndex === 1 && <div className='gmail-address'>
            <span>xiayx.leo@gmail.com</span>
            <Tooltip title={'contact me'}>
              <SendIcon className='gmail-address-send-btn' onClick={goMailTo}></SendIcon>
            </Tooltip>
          </div>}
          {mediaSelectIndex === 2 &&
            <Button className='my-juejin' variant="outlined" href={'https://juejin.cn/user/2875978150062215/posts'}
                    target='_blank'>
              <span>我的掘金</span>
              <OpenInNewIcon style={{fontSize: '16px'}}/>
            </Button>}
        </div>
      </div>
    </div>
    {isMobile ? <Divider className='divider' flexItem/> :
      <Divider className='divider' orientation="vertical" flexItem/>}
    <div className='about-page-right'>
      <div className='about-page-right-article'>

        <p>嗨，大家好！我是Saraph1nes</p>

        <p>建立站点的初衷有以下几点</p>

        <p>· 整理自己的知识体系</p>

        <p>· 希望在互联网上有属于自己的一些痕迹</p>

        <p>· 希望通过文字可以帮助到他人</p>

        <p>· 希望结识同好</p>


        <h3>TODO</h3>
        <p>
          ✅ <del>完善个人页面</del>
        </p>
        <p>
          ✅ <del>移动端适配</del>
        </p>
        <p>
          🔳 搜索功能
        </p>
        <p>
          🔳 文章详情页，标题菜单锚点高亮
        </p>
        <p>
          ✅ 登录功能
        </p>
        <p>
          🔳 评论功能
        </p>
      </div>
    </div>
  </div>
}

export default About
