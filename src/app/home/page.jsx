import service from "@/utils/http";
import {useLayoutEffect, useState, useContext, useMemo} from "react";
import {Chip, Divider, Paper, Skeleton, useTheme} from "@mui/material";
import {useNavigate, Link} from "react-router-dom";
import dayjs from "dayjs";
import classname from 'classname'
import CountUp from "react-countup";
import Heatmap from "@/components/Heatmap";
import {DarkModeContent} from "@/components/DarkModeProvider";
import {TAG_COLOR_ARR} from "@/app/home/constant.js";
// import SubjectPanel from "@/app/home/SubjectPanel.jsx";
import ArticleList from "@/app/home/ArticleList.jsx";

import './page.scss'

function Home() {
  const ctx = useContext(DarkModeContent);
  const navigate = useNavigate();
  const theme = useTheme()
  const [pageLoading, setPageLoading] = useState(true)
  const [heatmapDataset, setHeatmapDataset] = useState({
    Calendar: [],
    TotalCount: 0
  })
  const [tagListDataset, setTagListDataset] = useState([])
  const [pageViewCount, setPageViewCount] = useState(0)

  // 从tagListDataset随机取10个标签
  const tagListDatasetRandom = useMemo(() => tagListDataset.toSorted(() => Math.random() - 0.5).slice(0, 10), [tagListDataset])

  const fetchGetArticleHeatmap = async () => {
    return await service.get('/article/getArticleHeatmap')
  }

  const fetchGetAllTags = async () => {
    return await service.get('/tag/GetAllTags')
  }

  const fetchGetPV = async () => {
    return await service.get('/open/sablogs/getPV')
  }

  const init = async () => {
    const [fetchGetArticleHeatmapRes, fetchGetAllTagsRes, fetchGetPVRes] = await Promise.all([
      await fetchGetArticleHeatmap(),
      await fetchGetAllTags(),
      await fetchGetPV(),
    ])
    setTagListDataset(fetchGetAllTagsRes.Data)
    setHeatmapDataset(fetchGetArticleHeatmapRes.Data)
    setPageViewCount(fetchGetPVRes.Data.PV)
    setPageLoading(false)
  }

  useLayoutEffect(() => {
    init()
  }, []);

  return (<main
    className={classname({
      'main': true,
      'dark': theme.palette.mode === 'dark',
      'mobile': ctx.isMobile,
    })}
  >
    {/*<Banner />*/}

    {/*<Welcome/>*/}

    <section className='container-wrap'>
      <div className='container'>

        {/*专题*/}
        {/*<SubjectPanel/>*/}

        <ArticleList/>
      </div>

      {
        !ctx.isMobile && <aside className='aside-wrap'>
          <Paper className='data-panel' elevation={1}>
            <div className='data-panel-title'>数据</div>
            <Divider sx={{marginTop: '10px'}}/>
            <div className='heatmap-nums'>
              <div className="heatmap-nums-item">
                <div className='heatmap-nums-count'>
                  <CountUp end={dayjs().diff('2018-03-07', 'day')}/>
                  <span>天</span>
                </div>
                <div className='heatmap-nums-title'>已运行</div>
              </div>
              <Divider orientation="vertical" flexItem/>
              <div className="heatmap-nums-item">
                <div className='heatmap-nums-count'>
                  <CountUp end={heatmapDataset.TotalCount}/>
                  <span>篇</span>
                </div>
                <div className='heatmap-nums-title'>文章</div>
              </div>
            </div>
            <Divider/>
            <div className='heatmap-nums'>
              <div className="heatmap-nums-item">
                <div className='heatmap-nums-count'>
                  <CountUp end={pageViewCount}/>
                </div>
                <div className='heatmap-nums-title'>PV</div>
              </div>
              <Divider orientation="vertical" flexItem/>
              <div className="heatmap-nums-item">
                <div className='heatmap-nums-count'>
                  <CountUp end={dayjs().diff('2021-03-01', 'months')}/>
                  <span>个月</span>
                </div>
                <div className='heatmap-nums-title'>秃头练习时长</div>
              </div>
            </div>
            <Divider/>
          </Paper>

          <Paper className='statistical-panel' elevation={1}>
            <div className='statistical-panel-title'>贡献</div>
            <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>
            <Heatmap className='heatmap-chart' heatmapDataset={heatmapDataset.Calendar}/>
          </Paper>

          <Paper className='tag-panel' elevation={1}>
            <div className='tag-panel-title'>标签</div>
            <Divider sx={{marginTop: '10px'}}/>
            {
              pageLoading ? <>
                <Skeleton variant="rectangular" style={{marginTop: '10px'}}/>
                <Skeleton variant="rectangular" style={{marginTop: '10px'}}/>
                <Skeleton variant="rectangular" style={{marginTop: '10px'}}/>
              </> : <>
                {
                  tagListDatasetRandom.map((tag, tagIdx) => {
                    if (tagIdx > 10) return null
                    return <Chip
                      key={tag.ID}
                      style={{
                        border: `1px solid ${TAG_COLOR_ARR[tagIdx % 10]}80`,
                        background: `${TAG_COLOR_ARR[tagIdx % 10]}33`
                      }}
                      label={tag.Name}
                      sx={{marginTop: '20px', marginRight: '10px'}}
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        navigate(`/tag/${tag.ID}`)
                      }}
                    />
                  })
                }
              </>
            }
          </Paper>

          {/*<TimeFlies/>*/}
          <section className='aside-footer'>
            <Link
              style={{marginTop: '20px', display: 'block'}}
              to='https://beian.miit.gov.cn/'
              rel="noreferrer"
              target='_blank'
            >
              鄂ICP备2022013786号
            </Link>
            <Link
              style={{marginTop: '20px', display: 'block'}}
              to='https://beian.miit.gov.cn/'
              rel="noreferrer"
              target='_blank'
            >
              鄂ICP备2022013786号-1
            </Link>
            <div style={{marginTop: '20px', display: 'block'}}>© 2024 Saraph1nes Blog</div>
          </section>
        </aside>
      }
    </section>
  </main>)
}

export default Home
