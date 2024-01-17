import {useEffect} from "react";
import * as d3 from "d3";
import {useTheme} from "@mui/material";
import PropTypes from "prop-types";

import './index.scss'
import dayjs from "dayjs";

const Heatmap = ({heatmapDataset}) => {
  const theme = useTheme()

  const init = async () => {
    const ele = document.getElementById('sa_heatmap')

    if (ele.innerHTML) {
      ele.innerHTML = ''
    }

    const generateDataset = (options = {}) => {
      const forwardDays = 14 * 7 // 列 * 行
      const config = Object.assign({
        fill: {},
      }, options)
      const days = new Array(forwardDays)
        .fill(null)
        .map((itm, idx) => {
          const itmDate = dayjs().subtract(idx, 'days').format('YYYY-MM-DD');
          const itmTotal = config.fill[dayjs().subtract(idx, 'days').format('YYYY-MM-DD')];
          if (itmTotal){
            return {
              date: itmDate,
              total: itmTotal
            }
          }
          return {
            date: itmDate,
          }
        })
        .reverse()
      return {days: days}
    }

    const dataset = generateDataset({
      fill: heatmapDataset.reduce((result, entry) => {
        const date = entry.Date;
        const total = entry.Total;
        if (!result[date]) {
          result[date] = 0;
        }
        result[date] += total;
        return result;
      }, {})
    })

    // 设置图表参数
    const width = 280
    const height = 160
    const margin = 0
    const weekBoxWidth = 0
    const monthBoxHeight = 15

    const svg = d3.select("#sa_heatmap")
      .append("svg")
      .attr('width', width)
      .attr('height', height)

    // 绘制月份坐标
    // const monthBox = svg.append('g').attr(
    //   'transform',
    //   'translate(' + (margin + weekBoxWidth) + ', ' + margin + ')')
    // const monthScale = d3.scaleLinear()
    //   .domain([0, dataset.months.length])
    //   .range([0, width - margin - weekBoxWidth + 10])

    // monthBox.selectAll('text').data(dataset.months).enter()
    //   .append('text')
    //   .text(v => {
    //     return v
    //   })
    //   .attr('font-size', '12px')
    //   .attr('fill', '#999')
    //   .attr('x', (v, i) => {
    //     return monthScale(i)
    //   })

    // 设置周坐标数据
    // const weeks = ['一', '三', '五', '日']
    // 绘制周坐标
    // const weekBox = svg.append('g').attr(
    //   'transform',
    //   'translate(' + (margin - 10) + ', ' + (margin + monthBoxHeight) + ')')
    // const weekScale = d3.scaleLinear()
    //   .domain([0, weeks.length])
    //   .range([0, height - margin - monthBoxHeight + 14])

    // weekBox.selectAll('text').data(weeks).enter()
    //   .append('text')
    //   .text(v => {
    //     return v
    //   })
    //   .attr('font-size', '12px')
    //   .attr('fill', '#CCC')
    //   .attr('y', (v, i) => {
    //     return weekScale(i)
    //   })

    // 绘制日期方块
    const cellBox = svg.append('g').attr(
      'transform',
      'translate(' + (margin + weekBoxWidth) + ', ' + (margin + 10) + ')')

    const cellMargin = 4
    const cellSize = (height - margin - monthBoxHeight - cellMargin * 6 - 10) / 7
    let cellCol = 0;

    // Build color scale
    const myColor = d3.scaleLinear([0, 5], ["white", theme.palette.primary.main])

    // create a tooltip
    const Tooltip = d3.select("#sa_heatmap")
      .append("div")
      .style("opacity", 0)
      .style("font-size", "12px")
      .style("color", "#333")
      .style("background-color", "white")
      .style("position", "fixed")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    const mouseover = function (event, d) {
      Tooltip
        .style("opacity", 1)

      d3.select(this)
        .style("opacity", 1)
        .style("stroke", "#333")
    };
    const mousemove = function (event, d) {
      Tooltip
        .html(d.total ? `${d.date}</br>发布 ${d.total || 0} 篇文章` : d.date)
        .style("top", `${event.pageY + 20}px`)
        .style("left", `${event.pageX + 20}px`)
    };
    const mouseleave = function (d) {
      Tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 1)
    };

    const cell = cellBox
      .selectAll('rect')
      .data(dataset.days)
      .enter()
      .append('rect')
      .attr('x', (v, i) => {
        if (i % 7 === 0) {
          cellCol++
        }
        const x = (cellCol - 1) * cellSize;
        return cellCol > 1 ? x + cellMargin * (cellCol - 1) : x
      })
      .attr('y', (v, i) => {
        const y = i % 7;
        return y > 0 ? y * cellSize + cellMargin * y : y * cellSize
      })
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('rx', 4)
      .style("fill", function (d) {
        if (!d.total) {
          if (theme.palette.mode === 'dark') {
            return '#fff'
          } else {
            return '#eeeeee'
          }
        }
        return myColor(d.total)
      })
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
  }

  useEffect(() => {
    init()
  })
  return <div id='sa_heatmap'></div>
}

Heatmap.propTypes = {
  heatmapDataset: PropTypes.array
}

export default Heatmap
