'use client'

import React, {useEffect, useState} from "react";
import service from "@/utils/http";

import './page.scss'
import dayjs from "dayjs";
import Link from "next/link";
import {Skeleton} from "@mui/material";
import loading from "@/components/Loading";

const classPrefix = 'category-detail-page'

function Page({params}) {
  const [isMount, setIsMount] = useState(false)
  const [category, setCategory] = useState({
    Name: '',
    ArticleList: []
  })

  const fetchGetCategoryById = async (id) => {
    return await service.get(`/category/${id}`)
  }

  const init = async () => {
    loading.hide()
    const {Success, Data} = await fetchGetCategoryById(params.id)
    setCategory(Data)
    setIsMount(true)
  }

  useEffect(() => {
    init()
  }, []);

  if (!isMount) {
    return <div className={classPrefix}>
      <Skeleton style={{margin: '20px 0'}} variant="rectangular" height={100}/>
      <Skeleton style={{margin: '20px 0'}} variant="rectangular" height={100}/>
      <Skeleton style={{margin: '20px 0'}} variant="rectangular" height={100}/>
      <Skeleton style={{margin: '20px 0'}} variant="rectangular" height={100}/>
      <Skeleton style={{margin: '20px 0'}} variant="rectangular" height={100}/>
      <Skeleton style={{margin: '20px 0'}} variant="rectangular" height={100}/>
      <Skeleton style={{margin: '20px 0'}} variant="rectangular" height={100}/>
    </div>
  }

  return <div className={classPrefix}>
    <div className={`${classPrefix}_title`}>{category.Name}</div>
    <div className={`${classPrefix}_list`}>
      {
        category.ArticleList.map(item => <div className={`${classPrefix}_list-item`} key={item.ID}>
          <Link href={`/article/${item.ID}`}><span
            className={`${classPrefix}_list-item-title`}>{item.Name}</span></Link>
          <span className={`${classPrefix}_list-item-date`}>{dayjs(item.CreatedAt).format('YYYY-MM-DD')}</span>
        </div>)
      }
    </div>
  </div>
}

export default Page
