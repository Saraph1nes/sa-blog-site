import {Box, Divider, Skeleton, Tab, Tabs, useTheme} from "@mui/material";
import classname from "classname";
import {Link, useNavigate} from "react-router-dom";
import ClassIcon from "@mui/icons-material/Class.js";
import LocalOfferIcon from "@mui/icons-material/LocalOffer.js";
import CommentIcon from "@mui/icons-material/Comment.js";
import dayjs from "dayjs";
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {DarkModeContent} from "@/components/DarkModeProvider/index.jsx";
import service from "@/utils/http.js";

const ArticleList = () => {
  const ctx = useContext(DarkModeContent);
  const navigate = useNavigate();
  const theme = useTheme()

  const showListBottomLoading = useRef(false)

  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(-1)
  const [pageIndex, setPageIndex] = useState(1)
  const [list, setList] = useState([])
  const [listOver, setListOver] = useState(false)

  const fetchArticles = async () => {
    return await service.get('/article', {
      params: {
        pageIndex: pageIndex,
        pageSize: 20,
        category: selectedCategory
      }
    })
  }

  const goToArticle = (id) => {
    navigate(`/article/${id}`)
  }

  const onTabsChange = (event, newValue) => {
    window.scrollTo({
      top: 0
    });
    setPageIndex(1)
    setList([])
    setListOver(false)
    setSelectedCategory(newValue)
  }

  const fetchCategory = async () => {
    return await service.get('/category')
  }

  const init = async () => {
    const fetchCategoryRes = await fetchCategory()
    setCategoryList(fetchCategoryRes.Data)
  }

  useLayoutEffect(() => {
    init()
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      showListBottomLoading.current = true
      const {Data} = await fetchArticles()
      showListBottomLoading.current = false
      const curListLength = Data?.List?.length || 0;
      if (curListLength === Data.Count) {
        setListOver(true)
      }
      if (list.length + curListLength >= Data.Count) {
        setListOver(true)
      }
      if (Data.List) {
        setList(v => ([...v, ...Data.List]))
      }
    };

    if (!listOver) {
      fetchData()
    }
  }, [pageIndex, selectedCategory]);

  const handleScroll = () => {
    const htmlHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    if (htmlHeight - (innerHeight + scrollTop) < 200 && !showListBottomLoading.current) {
      setPageIndex(c => c + 1)
    }
  };

  useLayoutEffect(() => {
    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);
    // 组件卸载时移除事件监听
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return <div className='article-list-wrap'>
    <Box
      className={
        classname({
          "article-list-category": true,
          "isMobile": ctx.isMobile
        })
      }
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        background: ctx.isMobile ? theme.palette.background.paper : theme.palette.background.default,
        color: theme.palette.color.default
      }}
    >
      <Tabs
        variant="scrollable"
        value={selectedCategory}
        onChange={onTabsChange}
      >
        <Tab disabled={showListBottomLoading.current} className='article-list-category-item' label='全部' value={-1}/>
        {categoryList.map(i => <Tab
          key={i.ID}
          disabled={showListBottomLoading.current}
          value={i.ID}
          className='article-list-category-item'
          label={i.Name}
        />)}
      </Tabs>
    </Box>
    <div className='article-list-container'>

      {list.map(item => <div key={item.ID}>
        <div className='article-item'>
          <div className='left'>
            <div
              className="article-title"
              onClick={() => {
                goToArticle(item.ID)
              }}
            >
              {item.Name}
            </div>
            {(item.CategoryName || item.TagName) && <div className='title-desc-wrap'>
              {item.CategoryName && <Link
                to={`/category/${item.CategoryId}`}
              >
                <div className='article-category'>
                  <ClassIcon style={{fontSize: '18px'}}/>
                  <span style={{marginLeft: '5px'}}>{item.CategoryName}</span>
                </div>
              </Link>}
              {item.TagName && <Link
                to={`/tag/${item.TagId}`}
              >
                <div className='article-tag'>
                  <LocalOfferIcon style={{fontSize: '18px'}}/>
                  <span style={{marginLeft: '5px'}}>{item.TagName}</span>
                </div>
              </Link>}
              {
                item.CommentCount > 0 && <div className='article-comment-count'>
                  <CommentIcon style={{fontSize: '18px'}}/>
                  <span style={{marginLeft: '5px'}}>评论({item.CommentCount})</span>
                </div>
              }
            </div>}
          </div>
          <div className='right'>
            <div className='create-time'>{dayjs(item.CreatedAt).format("MM-DD")}</div>
          </div>
        </div>
        <Divider style={{marginTop: '20px'}}/>
      </div>)}
    </div>
    {
      showListBottomLoading.current && <div className='list-bottom-loading'>
        <Skeleton variant="rectangular" height={20} style={{marginTop: '10px'}}/>
        <Skeleton variant="rectangular" height={20} style={{marginTop: '10px'}}/>
        <Skeleton variant="rectangular" height={20} style={{marginTop: '10px'}}/>
      </div>
    }
    {
      listOver && <div className='list-bottom-over'>------ 没有更多了 ------</div>
    }
  </div>
}

export default ArticleList