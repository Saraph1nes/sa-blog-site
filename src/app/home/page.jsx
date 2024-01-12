import service from "@/utils/http";
import {useEffect, useLayoutEffect, useState} from "react";
import {Box, Chip, debounce, Divider, Paper, Skeleton, Stack, Tab, Tabs, useTheme} from "@mui/material";
import {useNavigate, Link} from "react-router-dom";
import ClassIcon from "@mui/icons-material/Class";
import dayjs from "dayjs";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import classname from 'classname'
import CountUp from "react-countup";
import Heatmap from "@/components/Heatmap";
import CommentIcon from '@mui/icons-material/Comment';
// import TimeFlies from "@/components/TimeFlies";
import {MOBILE_JUDGING_WIDTH} from "@/utils/constant";

import './page.scss'

const tagColorArr = [
  "#FF6B6B",
  "#6B5B95",
  "#88B04B",
  "#F7CAC9",
  "#F4B400",
  "#69D2E7",
  "#DAA520",
  "#00CED1",
  "#FFD700",
  "#C71585"
]

function Home() {
  const navigate = useNavigate();
  const theme = useTheme()
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(15)
  const [pageIndex, setPageIndex] = useState(1)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [listOver, setListOver] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(-1)
  const [hitokoto, setHitokoto] = useState({
    hitokoto: '', from_who: '', from: ''
  })
  const [heatmapDataset, setHeatmapDataset] = useState({
    Calendar: [],
    TotalCount: 0
  })
  const [tagListDataset, setTagListDataset] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [showListBottomLoading, setShowListBottomLoading] = useState(false)

  const fetchArticles = async () => {
    return await service.get('/article', {
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        category: selectedCategory
      }
    })
  }

  const fetchGetArticleHeatmap = async () => {
    return await service.get('/article/getArticleHeatmap')
  }

  const fetchGetAllTags = async () => {
    return await service.get('/tag/GetAllTags')
  }

  const fetchCategory = async () => {
    return await service.get('/category')
  }

  const fetchHitokoto = async () => {
    return await service.get('https://international.v1.hitokoto.cn?c=i&c=k&c=f&encode=json')
  }

  const onPaperClick = (type) => {
    if (type === 'frontend') {
      navigate('/book/1')
    }
    if (type === 'backend') {
      navigate('/book/2')
    }
    if (type === 'algorithm') {
      navigate('/book/14')
    }
  }

  const goToArticle = (id) => {
    navigate(`/article/${id}`)
  }

  const init = async () => {
    const [fetchGetArticleHeatmapRes, fetchCategoryRes, fetchGetAllTagsRes] = await Promise.all([
      await fetchGetArticleHeatmap(),
      await fetchCategory(),
      await fetchGetAllTags()
    ])
    setTagListDataset(fetchGetAllTagsRes.Data)
    setHeatmapDataset(fetchGetArticleHeatmapRes.Data)
    const isMob = window ? window.screen.width < MOBILE_JUDGING_WIDTH : false;
    setIsMobile(isMob)
    setCategoryList(fetchCategoryRes.Data)
    setIsMounted(true)
  }

  const onPageChange = (e, value) => {
    setPageIndex(value);
  }

  useLayoutEffect(() => {
    init()
  }, []);

  useLayoutEffect(() => {
    const fetchData = async () => {
      setShowListBottomLoading(true)
      const {Data} = await fetchArticles()
      setShowListBottomLoading(false)
      const curListLength = Data?.List?.length || 0;
      if (curListLength === Data.Count) {
        setListOver(true)
      }
      if (list.length + curListLength >= Data.Count) {
        setListOver(true)
      }
      if (Data.List) {
        setCount(Data.Count)
        setList(v => ([...v, ...Data.List]))
      }
    }
    if (!listOver) {
      fetchData()
    }
  }, [pageIndex, pageSize, selectedCategory]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const htmlHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

      if (innerHeight + scrollTop > htmlHeight - 50 && !showListBottomLoading) {
        setPageIndex(v => v + 1)
      }
    };

    // 添加滚动事件监听
    window.addEventListener('scroll', debounce(handleScroll));

    // 组件卸载时移除事件监听
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onTabsChange = (event, newValue) => {
    setPageIndex(1)
    setList([])
    setCount(0)
    setListOver(false)
    setSelectedCategory(newValue)
  }

  if (!isMounted) {
    return <main className='main'></main>
  }

  return (<main
    className={classname({
      'main': true,
      'dark': theme.palette.mode === 'dark',
      'mobile': isMobile,
    })}
  >
    <section className='container-wrap'>
      {
        !isMobile && <div className='special-subject-wrap'>
          <h2 className='special-subject-title'>专题</h2>
          <Stack
            className='special-subject-list'
            direction={isMobile ? "column" : "row"}
            spacing={3}
          >
            <Paper
              square={false}
              elevation={3}
              className="special-subject-list-item frontend"
              onClick={() => onPaperClick('frontend')}
            >
              <h3 className='special-subject-list-item-title'>前端</h3>
              <img
                className='special-subject-list-item-img'
                src="https://assest.sablogs.cn/imgs/blog/React.png"
                alt=""
              />
            </Paper>
            <Paper square={false} elevation={3} className="special-subject-list-item backend"
                   onClick={() => onPaperClick('backend')}>
              <h3 className='special-subject-list-item-title'>后端</h3>
              <img className='special-subject-list-item-img' src="https://assest.sablogs.cn/imgs/blog/nodejs.png"
                   alt=""/>
            </Paper>
            <Paper square={false} elevation={3} className="special-subject-list-item algorithm"
                   onClick={() => onPaperClick('algorithm')}>
              <h3 className='special-subject-list-item-title'>算法</h3>
              <img className='special-subject-list-item-img' src="https://assest.sablogs.cn/imgs/blog/suanfa.png"
                   alt=""/>
            </Paper>
          </Stack>
        </div>
      }
      <div className='article-list-wrap'>
        <Box className="article-list-category"
             sx={{
               borderBottom: 1,
               borderColor: 'divider',
               background: theme.palette.background.default,
               color: theme.palette.color.default
             }}
        >
          <Tabs
            variant="scrollable"
            value={selectedCategory}
            onChange={onTabsChange}
          >
            <Tab disabled={showListBottomLoading} className='article-list-category-item' label='全部' value={-1}/>
            {categoryList.map(i => <Tab
              key={i.ID}
              disabled={showListBottomLoading}
              value={i.ID}
              className='article-list-category-item'
              label={i.Name}
            />)}
          </Tabs>
        </Box>
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
        {
          showListBottomLoading && <div className='list-bottom-loading'>
            <Skeleton variant="rectangular" height={20} style={{marginTop: '10px'}}/>
            <Skeleton variant="rectangular" height={20} style={{marginTop: '10px'}}/>
            <Skeleton variant="rectangular" height={20} style={{marginTop: '10px'}}/>
          </div>
        }
        {
          listOver && <div className='list-bottom-over'>------ 没有更多了 ------</div>
        }
      </div>
      {/*{list.length > 0 && <div className='pagination-wrap'>*/}
      {/*  <Pagination*/}
      {/*    className='pagination'*/}
      {/*    count={Math.ceil(count / pageSize)}*/}
      {/*    showFirstButton*/}
      {/*    showLastButton*/}
      {/*    onChange={onPageChange}*/}
      {/*  />*/}
      {/*</div>}*/}
    </section>
    {
      !isMobile && <aside className='aside-wrap'>
        <Paper className='statistical-panel' elevation={1}>
          <div className='heatmap-nums'>
            <div className="heatmap-nums-item">
              <div className='heatmap-nums-count'><CountUp end={dayjs().diff('2018-03-07', 'day')}/></div>
              <div className='heatmap-nums-title'>天</div>
            </div>
            {/*<Divider orientation="vertical" flexItem/>*/}
            {/*<div className="heatmap-nums-item">*/}
            {/*  <div className='heatmap-nums-count'><CountUp end={400}/></div>*/}
            {/*  <div className='heatmap-nums-title'>PV</div>*/}
            {/*</div>*/}
            <Divider orientation="vertical" flexItem/>
            <div className="heatmap-nums-item">
              <div className='heatmap-nums-count'><CountUp end={heatmapDataset.TotalCount}/></div>
              <div className='heatmap-nums-title'>文章</div>
            </div>
          </div>
          <Divider className='statistical-panel-standard-divider'/>
          <Heatmap heatmapDataset={heatmapDataset.Calendar}/>
        </Paper>

        <Paper className='tag-panel' elevation={1}>
          <div className='tag-panel-title'>标签</div>
          <Divider sx={{marginTop: '10px'}}/>
          {
            tagListDataset.map((tag, tagIdx) => <Chip
              key={tag.ID}
              style={{
                border: `1px solid ${tagColorArr[tagIdx % 10]}80`,
                background: `${tagColorArr[tagIdx % 10]}33`
              }}
              label={tag.Name}
              sx={{marginTop: '20px', marginRight: '10px'}}
              size="small"
              variant="outlined"
              onClick={() => {
                navigate(`/tag/${tag.ID}`)
              }}
            />)
          }
        </Paper>

        {/*<TimeFlies/>*/}
        <section className='aside-footer'>
          <a
            style={{marginTop: '20px', display: 'block'}}
            href='https://beian.miit.gov.cn/'
            rel="noreferrer"
            target='_blank'
          >
            鄂ICP备2022013786号
          </a>
          <a
            style={{marginTop: '20px', display: 'block'}}
            href='https://beian.miit.gov.cn/'
            rel="noreferrer"
            target='_blank'
          >
            鄂ICP备2022013786号-1
          </a>
          <div style={{marginTop: '20px', display: 'block'}}>© 2023 Saraph1nes Blog</div>
        </section>
      </aside>
    }
  </main>)
}

export default Home
