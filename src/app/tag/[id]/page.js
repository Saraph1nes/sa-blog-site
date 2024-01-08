'use client'

import React, {useEffect, useState} from "react";
import service from "@/utils/http";
import dayjs from "dayjs";
import Link from "next/link";
import loading from "@/components/Loading";

import './page.scss'

const classPrefix = 'tag-detail-page'

function Page({params}) {
  const [data, setData] = useState({
    Name: '',
    ArticleList: []
  })

  const fetchGetTagById = async (id) => {
    return await service.get(`/tag/GetTagById?id=${id}`)
  }

  const init = async () => {
    loading.hide()
    const {Success, Data} = await fetchGetTagById(params.id)
    setData(Data)
  }

  useEffect(() => {
    init()
  }, []);

  return <div className={classPrefix}>
    <div className={`${classPrefix}_title`}>{data.Name}</div>
    <div className={`${classPrefix}_list`}>
      {
        data.ArticleList.map(item => <div className={`${classPrefix}_list-item`} key={item.ID}>
          <Link href={`/article/${item.ID}`}><span
            className={`${classPrefix}_list-item-title`}>{item.Name}</span></Link>
          <span className={`${classPrefix}_list-item-date`}>{dayjs(item.CreatedAt).format('YYYY-MM-DD')}</span>
        </div>)
      }
    </div>
  </div>
}

export default Page
