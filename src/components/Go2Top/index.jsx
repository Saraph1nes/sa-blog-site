import {useEffect, useState} from "react";
import {Box, Fab} from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import './index.scss'

const Go2Top = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 监听滚动事件
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);

    // 在组件卸载时移除监听器，以防止内存泄漏
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
    })
  };

  return <>
    {
      isVisible && <Box
        onClick={handleClick}
        role="presentation"
        sx={{position: 'fixed', bottom: 120, right: 20}}
      >
        <Fab size='small' aria-label="go to top" color="primary">
          <ArrowDropUpIcon/>
        </Fab>
      </Box>
    }
  </>
};

export default Go2Top
