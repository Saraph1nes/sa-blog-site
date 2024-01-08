import React, {useLayoutEffect, useState} from "react";
import {Box, LinearProgress, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

const TimeFlies = () => {

  const getYearPassedPercent = () => {
    const nowTime = dayjs().toDate().getTime();
    const yearStartTime = dayjs().startOf('year').toDate().getTime()
    const yearEndTime = dayjs().endOf('year').toDate().getTime()
    const wholeYearTime = yearEndTime - yearStartTime;
    const yearPassedTime = yearEndTime - nowTime
    return Number(((1 - (yearPassedTime / wholeYearTime)) * 100).toFixed(3))
  }

  const getTodayPassedPercent = () => {
    const nowTime = dayjs().toDate().getTime();
    const todayStartTime = dayjs().startOf('day').toDate().getTime()
    const todayEndTime = dayjs().endOf('day').toDate().getTime()
    const wholeTodayTime = todayEndTime - todayStartTime;
    const todayPassedTime = nowTime - todayStartTime;
    return Number((todayPassedTime / wholeTodayTime * 100).toFixed(3))
  }

  const [yearHavePassed, setYearHavePassed] = useState(getYearPassedPercent())
  const [todayHavePassed, setTodayHavePassed] = useState(getTodayPassedPercent())

  useLayoutEffect(() => {
    const inter = setInterval(() => {
      setTodayHavePassed(getTodayPassedPercent())
      setYearHavePassed(getYearPassedPercent())
    }, 1000)

    return () => {
      clearInterval(inter)
    }
  }, []);

  return <Paper className='time-flies-panel' elevation={1}>
    <h4>{dayjs().format('YYYY-MM-DD HH:mm:ss')}</h4>
    <Box sx={{width: '100%', marginTop: '20px'}}>
      <h5>今天已过</h5>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{width: '100%', mr: 1}}>
          <LinearProgress variant="determinate" value={todayHavePassed}/>
        </Box>
        <Box sx={{minWidth: 70}}>
          <Typography variant="body2" color="text.secondary">
            {`${todayHavePassed}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
    <Box sx={{width: '100%', marginTop: '20px'}}>
      <h5>今年已过</h5>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{width: '100%', mr: 1}}>
          <LinearProgress variant="determinate" value={yearHavePassed}/>
        </Box>
        <Box sx={{minWidth: 70}}>
          <Typography variant="body2" color="text.secondary">
            {`${yearHavePassed}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Paper>
}

export default TimeFlies
