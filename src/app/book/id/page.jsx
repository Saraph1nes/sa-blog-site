import { useLayoutEffect, useState } from 'react'
import service from '@/utils/http'
import { Divider, IconButton } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import classname from 'classname'
import ArticleRenderer from '@/components/ArticleRenderer'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { useParams } from 'react-router-dom'
import PageGuideNav from '@/components/PageGuideNav/index.jsx'

import './page.scss'

const Book = () => {
  const params = useParams()
  const [navData, setNavData] = useState([])
  const [articleData, setArticleData] = useState({
    CategoryId: 0,
    Content: null,
    CreatedAt: '',
    DeletedAt: '',
    ID: 0,
    Name: '',
    UpdatedAt: '',
  })
  const [hideMenu, setHideMenu] = useState(false)
  const [articleSelectedId, setArticleSelectedId] = useState(0)

  const getTagsByCategoryId = async () => {
    return await service.get(`/tag/getTagsByCategoryId?id=${params.id}`)
  }

  const fetchArticleById = async (id) => {
    return await service.get(`/article/${id}`)
  }

  const init = async () => {
    const { Data } = await getTagsByCategoryId()
    const resData = []
    for (let data of Data) {
      data.isShow = true
      if (data.ArticleCount > 0) {
        resData.push(data)
      }
    }
    const firstArticleId = resData[0].ArticleList[0].ID
    const { Data: fetchArticleByIdData } = await fetchArticleById(
      firstArticleId
    )
    setArticleSelectedId(firstArticleId)
    setArticleData(fetchArticleByIdData)
    setNavData(resData)
  }

  const onSelectArticle = async (id) => {
    const { Data } = await fetchArticleById(id)
    setArticleData(Data)
    setArticleSelectedId(id)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const foldTagItem = (tagId) => {
    const idx = navData.findIndex((i) => i.ID === tagId)
    navData[idx].isShow = !navData[idx].isShow
    setNavData(JSON.parse(JSON.stringify(navData)))
  }

  const toggleMenuBtn = () => {
    setHideMenu((p) => !p)
  }

  useLayoutEffect(() => {
    init()
  }, [])

  return (
    <div className="book-page">
      <div
        className="book-page-left"
        style={{
          width: hideMenu ? '0' : '200px',
          padding: hideMenu ? '0' : '10px',
        }}
      >
        {navData.map((navItem, index) => (
          <div key={navItem.ID}>
            {index !== 0 && <Divider />}
            <div className="tag-item">
              <div
                className="tag-item-title-wrap"
                onClick={() => foldTagItem(navItem.ID)}
              >
                <div className="title">{navItem.Name}</div>
                <KeyboardArrowRightIcon
                  className={classname({
                    arrow: true,
                    show: navItem.isShow,
                  })}
                ></KeyboardArrowRightIcon>
              </div>
              {navItem.isShow && navItem.ArticleCount > 0 && (
                <div className="tag-article-list">
                  {navItem.ArticleList.map((article) => (
                    <div
                      className={classname({
                        'tag-article-item': true,
                        selected: article.ID === articleSelectedId,
                      })}
                      onClick={() => onSelectArticle(article.ID)}
                      key={article.ID}
                    >
                      {article.Name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="book-page-main">
        <IconButton color="inherit" onClick={toggleMenuBtn}>
          <MenuOpenIcon
            style={{
              transform: hideMenu ? 'rotate(180deg)' : '',
              transition: 'ease-in-out 200ms',
            }}
          />
        </IconButton>
        <h1 className="article-title">{articleData.Name}</h1>
        <div className="article-content">
          <ArticleRenderer data={articleData}></ArticleRenderer>
        </div>
      </div>
      <PageGuideNav className="book-page-right" source={articleData.Content} />
    </div>
  )
}

export default Book
