import {useEffect, useState} from "react";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {MOBILE_JUDGING_WIDTH} from "@/utils/constant";
import Typography from "@mui/material/Typography";
import GitHubIcon from '@mui/icons-material/GitHub';
import {Link} from "react-router-dom";
import {OPEN_SOURCE_PROJECT, PROJECT_LIST_DATA} from "@/app/about/constant.js";
import ProjectList from "@/app/about/ProjectList.jsx";
import LocationOnIcon from '@mui/icons-material/LocationOn'

import './page.scss'

const About = () => {
  const [mediaSelectIndex, setMediaSelectIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const onSocialMediaNavClick = (val) => {
    setMediaSelectIndex(+val)
  }

  useEffect(() => {
    const isMob = window ? window.screen.width < MOBILE_JUDGING_WIDTH : false;
    setIsMobile(isMob)
  }, []);

  return <div className='about-page'>
    <div className='about-page-left'>
      <Avatar className='avatar' alt="Saraph1nes"
              src="https://assest.sablogs.cn/imgs/blog/blog-avatar.png"
              sx={{width: 120, height: 120}}/>
      <div className='name'>
        Saraph1nes
      </div>
      <div className='located'>
        <LocationOnIcon fontSize='small' color='primary'></LocationOnIcon>
        <span className='m-l-7'>WuHan</span>
      </div>
      <Divider style={{margin: '20px 0'}}/>
      <div className="social-media">
        <ul className='social-media-nav'>
          <IconButton aria-label="wechat" onClick={() => onSocialMediaNavClick(0)}>
            <img width={20} className='social-media-icon'
                 src='https://assest.sablogs.cn/imgs/blog/logo_wechat.png'
                 alt={'wechat logo'}/>
          </IconButton>
          <IconButton aria-label="gmail" onClick={() => onSocialMediaNavClick(1)}>
            <img width={20} className='social-media-icon'
                 src='https://assest.sablogs.cn/imgs/blog/logo_gmail.png'
                 alt={'gmail logo'}/>
          </IconButton>
          <IconButton aria-label="juejin" onClick={() => onSocialMediaNavClick(2)}>
            <img width={20} className='social-media-icon'
                 src='https://assest.sablogs.cn/imgs/blog/logo_juejin.png'
                 alt={'juejin logo'}/>
          </IconButton>
          <IconButton aria-label="github" onClick={() => onSocialMediaNavClick(3)}>
            <GitHubIcon/>
          </IconButton>
        </ul>
        <div className='social-media-content'>
          {mediaSelectIndex === 0 && <div>
            <img className='wechat-qrcode'
                 src='https://assest.sablogs.cn/imgs/blog/wechat-code.jpg'
                 alt='wechat image'/>
          </div>}
          {mediaSelectIndex === 1 &&
            <Button
              className='gmail-address'
              variant="outlined"
              href={'mailto:xiayx.leo@gmail.com'}
              target='_blank'
            >
              <span>xiayx.leo@gmail.com</span>
            </Button>}
          {mediaSelectIndex === 2 &&
            <Button className='my-juejin' variant="outlined" href={'https://juejin.cn/user/2875978150062215/posts'}
                    target='_blank'>
              <span>我的掘金</span>
              <OpenInNewIcon style={{fontSize: '16px'}}/>
            </Button>}
          {mediaSelectIndex === 3 &&
            <Button
              sx={{width:'100%'}}
              variant="outlined"
              href={'https://github.com/Saraph1nes'}
              target='_blank'
            >
              <span>Saraph1nes Github</span>
            </Button>}
        </div>
      </div>
    </div>
    {isMobile ? <Divider className='divider' flexItem/> :
      <Divider className='divider' orientation="vertical" flexItem/>}
    <div className='about-page-right'>
      <div className='about-page-right-article'>
        <section>
          <h2>介绍</h2>
          <p>你好！我是Saraph1nes</p>
          <p>希望你能喜欢我的博客</p>
        </section>

        <section>
          <h2>项目</h2>
          <section>
            <h3>开源</h3>
            <ProjectList dataset={OPEN_SOURCE_PROJECT}/>
          </section>

          <section>
            <h3>个人</h3>
            <ProjectList dataset={PROJECT_LIST_DATA}/>
          </section>
        </section>

        <section>
          <h2>博客历程</h2>
          <div style={{padding: "10px 0", marginTop: '30px'}}>
            <Stepper activeStep={3} orientation="vertical" sx={{width: '100%'}}>
              <Step>
                <StepLabel
                  StepIconComponent={() => <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'orange',
                      margin: '0 10px'
                    }}/>
                  }
                  optional={<Typography variant="caption">
                    <div>Typecho 博客 + 自定义主题</div>
                    <div>部署于阿里云服务器</div>
                    <div>https://www.yxlyz.net</div>
                  </Typography>}
                >
                  <div style={{fontWeight: 'bold'}}>2018.9 - 2020.7</div>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel
                  StepIconComponent={() => <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'orange',
                      margin: '0 10px'
                    }}/>
                  }
                  optional={<Typography variant="caption">
                    <div>hexo 博客 + fluid 主题</div>
                    <div>部署于Github Pages</div>
                    <Link to='https://saraph1nes.github.io/' target='_blank'>https://saraph1nes.github.io/</Link>
                  </Typography>}
                >
                  <div style={{fontWeight: 'bold'}}>2020.7 - 2023.12</div>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel
                  StepIconComponent={() => <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'orange',
                      margin: '0 10px'
                    }}/>
                  }
                  optional={<Typography variant="caption">
                    <div>hexo 博客 + fluid 主题</div>
                    <div>同步Github应用到Gitee</div>
                    <div>部署于Gitee pages</div>
                    <Link to='https://saraph1nes.gitee.io/' target='_blank'>https://saraph1nes.gitee.io/</Link>
                  </Typography>}
                >
                  <div style={{fontWeight: 'bold'}}>2022.6 - 2023.12</div>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel
                  StepIconComponent={() => <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'orange',
                      margin: '0 10px'
                    }}/>
                  }
                  optional={<Typography variant="caption">
                    <div>前端：react + vite</div>
                    <div>后端：gin</div>
                    <div>部署于腾讯云服务器</div>
                    <div>https://www.sablogs.cn/</div>
                  </Typography>}
                >
                  <div style={{fontWeight: 'bold'}}>2023.12 - 至今</div>
                </StepLabel>
              </Step>
            </Stepper>
          </div>
        </section>
      </div>
    </div>
  </div>
}

export default About
