import { useEffect, useState } from 'react'
import service from '@/utils/http'
import dayjs from 'dayjs'
import { Link, useParams } from 'react-router-dom'
import loading from '@/components/Loading'

import './page.scss'

const classPrefix = 'tag-detail-page'

function Page() {
  const params = useParams()
  const [data, setData] = useState({
    Name: '',
    ArticleList: [],
  })

  const fetchGetTagById = async (id) => {
    return await service.get(`/tag/GetTagById?id=${id}`)
  }

  const init = async () => {
    const { Success, Data } = await fetchGetTagById(params.id)
    setData(Data)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}_title`}>{data.Name}</div>
      <div className={`${classPrefix}_list`}>
        {data.ArticleList.map((item) => (
          <Link to={`/article/${item.ID}`}>
            <div className={`${classPrefix}_list-item`} key={item.ID}>
              <span className={`${classPrefix}_list-item-title`}>
                {item.Name}
              </span>
              <span className={`${classPrefix}_list-item-date`}>
                {dayjs(item.CreatedAt).format('YYYY-MM-DD')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page
