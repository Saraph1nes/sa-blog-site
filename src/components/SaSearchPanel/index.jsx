import PropTypes from "prop-types";
import {cloneElement, useEffect, useRef, useState} from "react";
import {Divider, Paper, useTheme} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HistoryIcon from '@mui/icons-material/History';
import classname from 'classname'
import service from "@/utils/http.js";
import {useNavigate} from "react-router-dom";

import './index.scss'

const POPULAR_SEARCHES = ['浏览器', '算法', '工具', '工程化']

const SaSearchPanel = ({children}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const childrenRef = useRef(null)
  const [isShow, setIsShow] = useState(false)
  const [isMaskShow, setIsMaskShow] = useState(false)
  const [searchResult, setSearchResult] = useState({
    Articles: [],
    TotalCount: 0
  })
  const [searchTxt, setSearchTxt] = useState('')

  const fetchArticleSearch = (params) => {
    return service.get('/article/search', {
      params: params
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

  const handleInput = async (txt) => {
    txt = txt.trim();
    setSearchTxt(txt)

    if (!txt) {
      setSearchResult({
        Articles: [],
        TotalCount: 0
      })
      return
    }

    if (txt.length < 2) {
      return
    }

    const {Data} = await fetchArticleSearch({
      k: txt
    })
    setSearchResult({
      Articles: Data.Articles || [],
      TotalCount: Data.TotalCount || 0
    })
  }

  const handleSearchResultItemClick = (id) => {
    navigate(`/article/${id}`)
    handlePanelClose()
  }

  const handleLookingSuggestClick = (txt) => {
    setSearchTxt(txt)
    handleInput(txt)
  }

  const renderHighlightSearchTxt = (str, substr) => {
    return str.split(new RegExp(`(${substr})`, 'gi')).map((part, index) => (
      part.toLowerCase() === substr.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        <span key={index}>{part}</span>
      )
    ))
  }

  return (
    <>
      {cloneElement(children, {
        ref: (ref) => {
          childrenRef.current = ref;
        },
        onClick: () => {
          setSearchTxt('')
          setSearchResult({
            Articles: [],
            TotalCount: 0
          })
          handlePanelShow()
        }
      })}
      {
        isMaskShow && <div className='search-panel-mask' onClick={handlePanelClose}>
          <Paper
            className={
              classname({
                'search-panel': true,
                'show': isShow
              })
            }
            elevation={24}
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <div className='search-input-wrap'>
              <SearchIcon sx={{margin: '0 6px', fontSize: '30px', color: `${theme.palette.primary.main}`}}/>
              <input
                type="text"
                className='search-input'
                style={{
                  caretColor: theme.palette.primary.main,
                  color: theme.palette.primary.main
                }}
                value={searchTxt}
                onChange={(e) => handleInput(e.target.value)}
                placeholder='上下方向键选择结果，回车确认搜索'
              />
            </div>
            <Divider/>
            {
              !!searchTxt && <div className='search-result'>
                <div className="search-result-label">
                  <SearchIcon sx={{fontSize: '16px'}}></SearchIcon>
                  <span>搜索结果({searchResult.TotalCount})</span>
                </div>
                <div className="search-result-list">
                  {
                    searchResult.Articles.map((i, idx) => <>
                      {idx !== 0 && <Divider/>}
                      <div key={i.ID} className="search-result-list-item"
                           onClick={() => handleSearchResultItemClick(i.ID)}>
                        <div className='search-result-list-item-title'>{i.Name}</div>
                        <div className='search-result-list-item-content'>
                          {renderHighlightSearchTxt(i.Content, searchTxt)}
                        </div>
                      </div>
                    </>)
                  }
                </div>
              </div>
            }
            {
              !searchTxt && <>
                <div className='looking-suggest'>
                  <div className="looking-suggest-label">
                    <LocalFireDepartmentIcon sx={{fontSize: '16px'}}></LocalFireDepartmentIcon>
                    <span>热门搜索</span>
                  </div>
                  <div className="looking-suggest-list">
                    {
                      POPULAR_SEARCHES.map(i => <div
                        key={i}
                        className="looking-suggest-list-item"
                        onClick={() => handleLookingSuggestClick(i)}
                      >
                        {i}
                      </div>)
                    }
                  </div>
                </div>
                <Divider/>
                <div className='search-history'>
                  <div className="search-history-label">
                    <HistoryIcon sx={{fontSize: '16px'}}></HistoryIcon>
                    <span>历史搜索记录</span>
                  </div>
                </div>
              </>
            }
          </Paper>
        </div>
      }
    </>
  );
}

SaSearchPanel.propTypes = {
  children: PropTypes.node
}

export default SaSearchPanel
