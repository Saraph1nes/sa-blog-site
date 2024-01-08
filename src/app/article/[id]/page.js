'use client'

import React, {useEffect, useState} from "react";
import service from "@/utils/http";
import MDRenderer from "@/components/MDRenderer";
import Comment from "@/components/Comment"
import classname from 'classname'
import {Skeleton, useTheme} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from "next/link";
import {MOBILE_JUDGING_WIDTH} from "@/utils/constant";
import loading from "@/components/Loading";

import './page.scss'

function Page({params}) {
  const theme = useTheme()
  const [isMount, setIsMount] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [article, setArticle] = useState({
    Name: '',
  })

  const fetchArticleById = async (id) => {
    return await service.get(`/article/${id}`)
  }

  const init = async () => {
    loading.hide()
    const isMob = window ? window.screen.width < MOBILE_JUDGING_WIDTH : false;
    setIsMobile(isMob)
    const {Success, Data} = await fetchArticleById(params.id)
    if (Success) {
      setArticle(Data)
    }
    setIsMount(true)
  }

  useEffect(() => {
    init()
  }, [])

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
          <Link
            href={`/article/${article.PrevArticle.ID}`}
            className="article-switching-item article-switching-prev"
          >
            <ChevronLeftIcon/>
            <div>
              <div className='article-switching-item-title'>上一篇</div>
              <div className='article-switching-item-name'>{article.PrevArticle.Name}</div>
            </div>
          </Link>
        }
        {
          !!article?.NextArticle?.ID &&
          <Link
            href={`/article/${article.NextArticle.ID}`}
            className="article-switching-item article-switching-next"
          >
            <div>
              <div className='article-switching-item-title'>下一篇</div>
              <div className='article-switching-item-name'>{article.NextArticle.Name}</div>
            </div>
            <ChevronRightIcon/>
          </Link>
        }
      </div>
    </div>
    <div className="article-comment-wrap">
      <h2 className='article-comment-title'>评论</h2>
      <Comment/>
    </div>
  </div>
}

export default Page
