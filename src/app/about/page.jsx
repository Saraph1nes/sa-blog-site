import {useEffect, useState} from "react";
import {
  Avatar,
  Button,
  Card, CardActionArea, CardActions, CardContent,
  CardMedia,
  Divider, Grid, IconButton, Paper,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {MOBILE_JUDGING_WIDTH} from "@/utils/constant";
import Typography from "@mui/material/Typography";
import GitHubIcon from '@mui/icons-material/GitHub';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import LinkIcon from '@mui/icons-material/Link';
import {Link} from "react-router-dom";

import './page.scss'

const projectListData = [
  {
    img: 'https://assest.sablogs.cn/imgs/blog/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_17047717689960.png',
    name: 'translationX',
    desc: '易用的 VSCode 翻译插件',
    githubLink: 'https://github.com/Saraph1nes/vscode-transX',
    microsoftLink: 'https://marketplace.visualstudio.com/items?itemName=Saraph1nes.translationX',
    outerLink: ''
  },
  {
    img: 'https://assest.sablogs.cn/imgs/blog/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_17047720734846.png',
    name: 'Ninja',
    desc: 'chrome 插件 新标签页 基于chrome收藏夹功能实现',
    githubLink: 'https://github.com/Saraph1nes/ninja-chrome-extensions',
    microsoftLink: '',
    outerLink: ''
  },
  {
    img: 'https://assest.sablogs.cn/imgs/blog/buff-helper-demo.png',
    name: '油猴网易BUFF脚本',
    desc: 'CS2 油猴网易 BUFF 脚本，利润分析',
    githubLink: 'https://github.com/Saraph1nes/163BuffHelper',
    microsoftLink: '',
    outerLink: ''
  },
  // {
  //   img: 'https://assest.sablogs.cn/imgs/blog/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_17047722746718.png',
  //   name: '跨端业务组件库',
  //   desc: '基于 lit 的 web-component 跨框架组件库',
  //   githubLink: '',
  //   microsoftLink: '',
  //   outerLink: 'https://fe-material.ezrpro.work/ezrgame/docs-site/zh/components/game-task-panel/'
  // },
  // {
  //   img: 'https://assest.sablogs.cn/imgs/blog/ezrpc-analyz-cli-demo.png',
  //   name: 'ezrpc-analyz-cli',
  //   desc: 'ezrpc 组件库使用分析 脚手架工具',
  //   githubLink: 'https://github.com/Saraph1nes/ezrpc-analyz-cli',
  //   microsoftLink: '',
  //   outerLink: ''
  // }
]

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
        <span className='m-l-7'>湖北 - 武汉</span>
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
          <p>生于98年</p>
          <p>我喜欢编程、运动、音乐、摄影、看剧</p>
          <p>我的网名 “Saraph1nes” 取自古英语 “Saraphines”，是 “炽天使” 的意思</p>
          <p>写博客是为了记录生活，希望能遇到更多志同道合的朋友</p>
          <p>也希望更多的人喜欢上我的博客</p>
        </section>

        <section>
          <h2>个人项目</h2>
          <div className="my-project-list">
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
              {
                projectListData.map(project =>
                  <Grid item xs={2} sm={4} md={4} key={project.name}>
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          sx={{height: 140}}
                          image={project.img}
                          title={project.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {project.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {project.desc}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          {
                            project.githubLink &&
                            <IconButton aria-label="github-link" href={project.githubLink} target='_blank'>
                              <GitHubIcon/>
                            </IconButton>
                          }
                          {
                            project.microsoftLink &&
                            <IconButton aria-label="microsoft-link" href={project.microsoftLink} target='_blank'>
                              <MicrosoftIcon/>
                            </IconButton>
                          }
                          {
                            project.outerLink &&
                            <IconButton aria-label="outer-link" href={project.outerLink} target='_blank'>
                              <LinkIcon/>
                            </IconButton>
                          }
                        </CardActions>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
              }
            </Grid>
          </div>
        </section>

        <section>
          <h2>博客历程</h2>
          <Paper sx={{padding: "10px", marginTop: '30px'}} variant={0}>
            <Stepper activeStep={3} orientation="vertical" sx={{width:'100%'}}>
              <Step>
                <StepLabel
                  StepIconComponent={() => <div
                    style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'orange'}}/>
                  }
                  optional={<Typography variant="caption">
                    <div>Typecho 博客 + 自定义主题</div>
                    <div>部署于阿里云服务器</div>
                    <div>https://www.yxlyz.net</div>
                  </Typography>}
                >
                  <div>2018.9 - 2020.7</div>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel
                  StepIconComponent={() => <div
                    style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'orange'}}/>
                  }
                  optional={<Typography variant="caption">
                    <div>hexo 博客 + fluid 主题</div>
                    <div>部署于Github Pages</div>
                    <Link to='https://saraph1nes.github.io/' target='_blank'>https://saraph1nes.github.io/</Link>
                  </Typography>}
                >
                  <div>2020.7 - 2023.12</div>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel
                  StepIconComponent={() => <div
                    style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'orange'}}/>
                  }
                  optional={<Typography variant="caption">
                    <div>hexo 博客 + fluid 主题</div>
                    <div>同步Github应用到Gitee</div>
                    <div>部署于Gitee pages</div>
                    <Link to='https://saraph1nes.gitee.io/' target='_blank'>https://saraph1nes.gitee.io/</Link>
                  </Typography>}
                >
                  <div>2022.6 - 2023.12</div>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel
                  StepIconComponent={() => <div
                    style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'orange'}}/>
                  }
                  optional={<Typography variant="caption">
                    <div>前端：react + vite</div>
                    <div>后端：gin</div>
                    <div>部署于腾讯云服务器</div>
                    <div>https://www.sablogs.cn/</div>
                  </Typography>}
                >
                  <div>2023.12 - 至今</div>
                </StepLabel>
              </Step>
            </Stepper>
          </Paper>
        </section>
      </div>
    </div>
  </div>
}

export default About
