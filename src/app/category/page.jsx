import { useLayoutEffect, useState } from 'react'
import service from '@/utils/http'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  Skeleton,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router-dom'

import './page.scss'

const Category = () => {
  const [category, setCategory] = useState([])

  const fetchCategory = async () => {
    return await service.get('/categoryList')
  }

  const init = async () => {
    const { Data } = await fetchCategory()
    setCategory(Data)
  }

  useLayoutEffect(() => {
    init()
  }, [])

  return (
    <div className="category-page">
      {category.map((cat) => {
        if (cat.ArticleList.length === 0) return null
        return (
          <Accordion
            defaultExpanded={false}
            className="category-page-accordion"
            key={cat.ID}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>{cat.Name}</span>
                <span style={{ color: '#aaa', fontSize: '12px' }}>
                  （ {cat.ArticleCount} ）
                </span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <List className="category-article-list">
                {cat.ArticleList ? (
                  cat.ArticleList.map((arti) => (
                    <Link key={arti.ID} to={`/article/${arti.ID}`}>
                      <ListItem className="category-article-list-item">
                        <ListItemText
                          className="category-article-list-item-title"
                          primary={arti.Name}
                        />
                      </ListItem>
                    </Link>
                  ))
                ) : (
                  <div style={{ color: '#aaa' }}>暂无数据</div>
                )}
                {
                  <Link to={`/category/${cat.ID}`}>
                    <ListItem className="category-article-list-item">
                      <ListItemText
                        style={{ color: '#aaa' }}
                        primary="查看更多..."
                      />
                    </ListItem>
                  </Link>
                }
              </List>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}

export default Category
