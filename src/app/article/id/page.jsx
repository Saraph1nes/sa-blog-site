import {useContext, useLayoutEffect, useState} from "react";
import service from "@/utils/http";
import ArticleRenderer from "@/components/ArticleRenderer";
import SaComment from "@/components/SaComment"
import classname from 'classname'
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Skeleton,
  useTheme
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate, useParams } from "react-router-dom";
import { MOBILE_JUDGING_WIDTH } from "@/utils/constant";
import dayjs from "dayjs";
import AuthModalBox from '@/components/AuthModalBox'
import {UserInfoContext} from "@/components/UserInfoProvider/index.jsx";

import './page.scss'
import MarkdownNavbar from "markdown-navbar";
import {DarkModeContent} from "@/components/DarkModeProvider/index.jsx";

function Page() {
  const ctx = useContext(DarkModeContent);
  const [userInfo] = useContext(UserInfoContext)
  const navigate = useNavigate()
  const params = useParams()
  const theme = useTheme()
  const [isMount, setIsMount] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [article, setArticle] = useState({
    Name: '',
  })
  const [comment, setComment] = useState({
    Count: 0,
    Comments: []
  })

  const fetchArticleById = async (id) => {
    return await service.get(`/article/${id}`)
  }

  const fetchGetArticleComment = async (id) => {
    return await service.get(`/article/getArticleComment?id=${id}`)
  }

  const onCommentSuccess = async () => {
    const fetchGetArticleCommentRes = await fetchGetArticleComment(params.id)
    setComment(fetchGetArticleCommentRes.Data)
  }

  const init = async () => {
    const isMob = window ? window.screen.width < MOBILE_JUDGING_WIDTH : false;
    setIsMobile(isMob)
    const [fetchArticleByIdRes, fetchGetArticleCommentRes] = await Promise.all([
      await fetchArticleById(params.id),
      await fetchGetArticleComment(params.id)
    ])
    setArticle(fetchArticleByIdRes.Data)
    setComment(fetchGetArticleCommentRes.Data)
    setIsMount(true)
  }

  useLayoutEffect(() => {
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
      <Skeleton variant="rectangular" height={50} width={600} style={{ margin: '20px auto' }} />
      <Skeleton variant="rectangular" height={80} width={200} style={{ margin: '20px auto 70px' }} />
      <Skeleton variant="rectangular" height={100} style={{ margin: '20px' }} />
      <Skeleton variant="rectangular" height={400} style={{ margin: '20px' }} />
      <Skeleton variant="rectangular" height={100} style={{ margin: '20px' }} />
      <Skeleton variant="rectangular" height={100} style={{ margin: '20px' }} />
      <Skeleton variant="rectangular" height={300} style={{ margin: '20px' }} />
    </div>
  }

  return <div className={
    classname({
      'article-page-wrap': true,
      'dark': theme.palette.mode === 'dark',
      'is-mobile': isMobile
    })
  }>
    <div className='article-page'>
      <h2 className='article-title'>{article.Name}</h2>
      <div className='article-content'>
        <ArticleRenderer data={article}/>
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
        <h2 className='article-comment-title'>评论({comment.Count})</h2>
        {
          userInfo && <SaComment articleData={article} onCommentSuccess={onCommentSuccess}/>
        }
        {
          !userInfo && <div className='comment-need-login'>
            <AuthModalBox>
              <Button variant='contained'>需要登录才可评论</Button>
            </AuthModalBox>
          </div>
        }
        {
          comment?.Comments?.length > 0 && <Paper variant='elevation' className="article-comment-list">
            <List>
              {
                comment?.Comments?.map((item, index) => <div key={item.ID}>
                  {index !== 0 && <Divider variant="inset" component="li"/>}
                  <ListItem alignItems="flex-start" className='article-comment-list-item'>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.Content}
                      secondary={`${dayjs(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss')}`}
                    />
                  </ListItem>
                </div>)
              }
            </List>
          </Paper>
        }
      </div>
    </div>
    {
      !ctx.isMobile && <div className='page-guide-nav-content-wrap'>
        <MarkdownNavbar
          className='page-guide-nav-content'
          headingTopOffset={20}
          source={article.Content}
          ordered={false}
          updateHashAuto={false}
          declarative={false}
        />
      </div>
    }
  </div>
}

export default Page
