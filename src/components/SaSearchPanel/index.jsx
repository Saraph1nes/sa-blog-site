import PropTypes from 'prop-types'
import { cloneElement, useRef, useState } from 'react'
import { Divider, Paper, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import CloseIcon from '@mui/icons-material/Close'
import classname from 'classname'
import service from '@/utils/http.js'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import debounce from 'lodash/debounce'

import './index.scss'

const POPULAR_SEARCHES = [
  '浏览器',
  '算法',
  '工具',
  'react',
  'vue',
  'useState',
  'hooks',
]

// TODO 支持移动端搜索

const SaSearchPanel = ({ children }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const childrenRef = useRef(null)
  const [isShow, setIsShow] = useState(false)
  const [isMaskShow, setIsMaskShow] = useState(false)
  const [searchResult, setSearchResult] = useState({
    Articles: [],
    TotalCount: 0,
  })

  const inputRef = useRef(null)

  const searchTxt = inputRef?.current?.value || ''

  const setSearchTxt = (txt = '') => {
    if (!inputRef?.current) {
      return
    }
    inputRef.current.value = txt
  }

  const fetchArticleSearch = (params) => {
    return service.get('/article/search', {
      params: params,
    })
  }

  const handlePanelShow = () => {
    setIsMaskShow(true)
    const timer = setTimeout(() => {
      setIsShow(true)
      clearTimeout(timer)
    }, 200)
  }

  const handlePanelClose = () => {
    setIsShow(false)
    const timer = setTimeout(() => {
      setIsMaskShow(false)
      clearTimeout(timer)
    }, 200)
  }

  const initSearchResult = () => {
    setSearchResult({
      Articles: [],
      TotalCount: 0,
    })
  }

  const handleInput = debounce(async (txt) => {
    txt = txt.trim()

    setSearchTxt(txt)

    if (!txt) {
      initSearchResult()
      return
    }

    if (txt.length < 2) {
      return
    }

    const { Data } = await fetchArticleSearch({
      k: txt,
    })
    setSearchResult({
      Articles: Data.Articles,
      TotalCount: Data.TotalCount,
    })
  }, 300)

  const handleSearchResultItemClick = (id) => {
    navigate(`/article/${id}`)
    handlePanelClose()
  }

  const handleLookingSuggestClick = (txt) => {
    setSearchTxt(txt)
    handleInput(txt)
  }

  const renderHighlightSearchTxt = (str, substr) => {
    return str.split(new RegExp(`(${substr})`, 'gi')).map((part, index) =>
      part.toLowerCase() === substr.toLowerCase() ? (
        <span
          key={index}
          style={{ background: theme.palette.primary.main, fontWeight: 'bold' }}
        >
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    )
  }

  const handleArrowBack = () => {
    initSearchResult()
    setSearchTxt('')
  }

  return (
    <>
      {cloneElement(children, {
        ref: (ref) => {
          childrenRef.current = ref
        },
        onClick: () => {
          setSearchTxt('')
          initSearchResult()
          handlePanelShow()
        },
      })}
      {isMaskShow && (
        <div className="search-panel-mask" onClick={handlePanelClose}>
          <Paper
            className={classname({
              'search-panel': true,
              show: isShow,
            })}
            elevation={24}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <div className="search-input-wrap">
              {!searchTxt && (
                <SearchIcon className="search-input-icon search" />
              )}
              {!!searchTxt && (
                <>
                  <ArrowBackIcon
                    className="search-input-icon back"
                    onClick={handleArrowBack}
                  />
                  <Divider orientation="vertical" flexItem />
                </>
              )}
              <input
                ref={inputRef}
                autoFocus
                type="text"
                className="search-input"
                style={{
                  caretColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                }}
                onChange={(e) => {
                  handleInput(e.target.value)
                }}
                placeholder="在此输入你想搜索的内容"
              />
              <Divider orientation="vertical" flexItem />
              <CloseIcon
                className="search-input-icon close"
                onClick={handlePanelClose}
              />
            </div>
            <Divider />
            {!!searchTxt && (
              <div className="search-result">
                <div className="search-result-label">
                  <SearchIcon sx={{ fontSize: '16px' }}></SearchIcon>
                  <span>搜索结果({searchResult.TotalCount})</span>
                </div>
                <div className="search-result-list">
                  {searchResult.Articles.map((i, idx) => (
                    <>
                      {idx !== 0 && <Divider sx={{ margin: '6px 0' }} />}
                      <div
                        key={i.ID}
                        className="search-result-list-item"
                        onClick={() => handleSearchResultItemClick(i.ID)}
                      >
                        <div className="search-result-list-item-title">
                          {renderHighlightSearchTxt(i.Name, searchTxt)}
                        </div>
                        <div className="search-result-list-item-content">
                          {renderHighlightSearchTxt(i.Content, searchTxt)}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            )}
            {!searchTxt && (
              <>
                <div className="looking-suggest">
                  <div className="looking-suggest-label">
                    <LocalFireDepartmentIcon
                      sx={{ fontSize: '16px' }}
                    ></LocalFireDepartmentIcon>
                    <span>热门搜索</span>
                  </div>
                  <div className="looking-suggest-list">
                    {POPULAR_SEARCHES.map((i) => (
                      <div
                        key={i}
                        className="looking-suggest-list-item"
                        onClick={() => handleLookingSuggestClick(i)}
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                </div>
                {/*<Divider/>*/}
                {/*<div className='search-history'>*/}
                {/*  <div className="search-history-label">*/}
                {/*    <HistoryIcon sx={{fontSize: '16px'}}></HistoryIcon>*/}
                {/*    <span>历史搜索记录</span>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </>
            )}
          </Paper>
        </div>
      )}
    </>
  )
}

SaSearchPanel.propTypes = {
  children: PropTypes.node,
}

export default SaSearchPanel
