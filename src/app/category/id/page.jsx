import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import service from '@/utils/http'

import './page.scss'

const classPrefix = 'category-detail-page'

function Page() {
  const params = useParams()

  const [category, setCategory] = useState({
    Name: '',
    ArticleList: [],
  })

  const fetchGetCategoryById = async (id) => {
    return await service.get(`/category/${id}`)
  }

  const init = async () => {
    const { Success, Data } = await fetchGetCategoryById(params.id)
    setCategory(Data)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}_title`}>{category.Name}</div>
      <div className={`${classPrefix}_list`}>
        {category.ArticleList.map((item) => (
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
