import {useEffect, useState} from "react";
import service from "@/utils/http";
import MDRenderer from "@/components/MDRenderer";
import SaComment from "@/components/SaComment"
import classname from 'classname'
import {Box, Button, Paper, Skeleton, useTheme} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Link, useNavigate, useParams} from "react-router-dom";
import {MOBILE_JUDGING_WIDTH} from "@/utils/constant";

import './page.scss'

function Page() {
  const navigate = useNavigate()
  const params = useParams()
  const theme = useTheme()
  const [isMount, setIsMount] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [article, setArticle] = useState({
    Name: '',
  })


  const UserInfoStr = localStorage.getItem('UserInfo')
  let UserInfo = null
  if (UserInfoStr) {
    UserInfo = JSON.parse(UserInfoStr)
  }

  const fetchArticleById = async (id) => {
    return await service.get(`/article/${id}`)
  }

  const fetchGetArticleComment = async (id) => {
    return await service.get(`/article/getArticleComment?id=${id}`)
  }

  const init = async () => {
    const isMob = window ? window.screen.width < MOBILE_JUDGING_WIDTH : false;
    setIsMobile(isMob)
    const [fetchArticleByIdRes, fetchGetArticleCommentRes] = await Promise.all([
      await fetchArticleById(params.id),
      await fetchGetArticleComment(params.id)
    ])
    console.log('fetchArticleByIdRes,fetchGetArticleCommentRes', fetchArticleByIdRes, fetchGetArticleCommentRes)
    // if (Success) {
    //   setArticle(Data)
    // }
    // setIsMount(true)
  }

  const goLogin = () => {
    navigate(`/login?redirect_to=${window.location.pathname}`)
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
    init()
  }, [params.id])

  if (!isMount) {
    return <div className={
      classname({
        'article-page': true,
        'dark': theme.palette.mode === 'dark',
        'is-mobile': isMobile
      })
    }>
      <Skeleton variant="rectangular" height={50} width={600} style={{margin: '20px auto'}}/>
      <Skeleton variant="rectangular" height={80} width={200} style={{margin: '20px auto 70px'}}/>
      <Skeleton variant="rectangular" height={100} style={{margin: '20px'}}/>
      <Skeleton variant="rectangular" height={400} style={{margin: '20px'}}/>
      <Skeleton variant="rectangular" height={100} style={{margin: '20px'}}/>
      <Skeleton variant="rectangular" height={100} style={{margin: '20px'}}/>
      <Skeleton variant="rectangular" height={300} style={{margin: '20px'}}/>
    </div>
  }

  return <div className={
    classname({
      'article-page': true,
      'dark': theme.palette.mode === 'dark',
      'is-mobile': isMobile
    })
  }>
    <h2 className='article-title'>{article.Name}</h2>
    <div className='article-content'>
      <MDRenderer data={article}/>
    </div>
    <div className="article-switching-wrap">
      <h2 className='article-switching-title'>其他文章</h2>
      <div className="article-switching">
        {
          !!article?.PrevArticle?.ID &&
          <Paper
            elevation={1}
            className="article-switching-item article-switching-prev"
            onClick={() => {
              navigate(`/article/${article.PrevArticle.ID}`)
            }}>
            <ChevronLeftIcon/>
            <div>
              <div className='article-switching-item-title'>上一篇</div>
              <div className='article-switching-item-name'>{article.PrevArticle.Name}</div>
            </div>
          </Paper>
        }
        {
          !!article?.NextArticle?.ID &&
          <Paper
            elevation={1}
            className="article-switching-item article-switching-next"
            onClick={() => {
              navigate(`/article/${article.NextArticle.ID}`)
            }}
          >
            <div>
              <div className='article-switching-item-title'>下一篇</div>
              <div className='article-switching-item-name'>{article.NextArticle.Name}</div>
            </div>
            <ChevronRightIcon/>
          </Paper>
        }
      </div>
    </div>
    <div className="article-comment-wrap">
      <h2 className='article-comment-title'>评论</h2>
      {
        UserInfo && <SaComment articleData={article}/>
      }
      {
        !UserInfo && <div className='comment-need-login'>
          <div>登录后可评论</div>
          <Button variant='contained' style={{marginTop: '20px'}} onClick={goLogin}>去登录</Button>
        </div>
      }
    </div>
  </div>
}

export default Page
