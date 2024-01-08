'use client'

import {useEffect} from "react";
import * as d3 from "d3";
import {useTheme} from "@mui/material";

import './index.scss'

const Heatmap = ({heatmapDataset}) => {
  const theme = useTheme()

  const init = async () => {
    const ele = document.getElementById('sa_heatmap')

    if (ele.innerHTML) {
      ele.innerHTML = ''
    }

    const generateDataset = (forwardMonth, options = {}) => {
      const config = Object.assign({}, {
        endDate: null,
        fill: {},
      }, options)
      const months = []
      const days = []
      // 计算需要填充的日期
      for (let i = forwardMonth; i > 0; i--) {
        let referDate = config.endDate
          ? new Date(config.endDate)
          : new Date()
        referDate.setMonth(referDate.getMonth() - i + 2)
        referDate.setDate(0)
        let month = referDate.getMonth() + 1
        month = month < 10 ? '0' + month : month
        for (let d = 1; d <= referDate.getDate(); d++) {
          let day = d < 10 ? '0' + d : d
          let data = {
            date: referDate.getFullYear() + '-' + month + '-' + day,
          }
          if (config.fill.hasOwnProperty(data.date)) {
            data.total = config.fill[data.date]
          }
          days.push(data)
        }
        months.push(referDate.getFullYear() + '-' + month)
      }
      // 确保第一个日期是从星期一开始
      // 不是星期一就向前追加相应的天数
      let firstDate = days[0].date
      let d = new Date(firstDate)
      let day = d.getDay()
      if (day === 0) {
        day = 7
      }
      for (let i = 1; i < day; i++) {
        let d = new Date(firstDate)
        d.setDate(d.getDate() - i)
        let v = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
        if (v[1] < 10) {
          v[1] = '0' + v[1];
        }
        if (v[2] < 10) {
          v[2] = '0' + v[2];
        }
        days.unshift({date: v.join('-')})
      }
      return {days: days, months: months}
    }

    const dataset = generateDataset(3, {
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
    const width = 282
    const height = 160
    const margin = 20
    const weekBoxWidth = 0
    const monthBoxHeight = 10

    const svg = d3.select("#sa_heatmap")
      .append("svg")
      .attr('width', width)
      .attr('height', height)

    // 绘制月份坐标
    const monthBox = svg.append('g').attr(
      'transform',
      'translate(' + (margin + weekBoxWidth) + ', ' + margin + ')')
    const monthScale = d3.scaleLinear()
      .domain([0, dataset.months.length])
      .range([0, width - margin - weekBoxWidth + 10])

    monthBox.selectAll('text').data(dataset.months).enter()
      .append('text')
      .text(v => {
        return v
      })
      .attr('font-size', '12px')
      .attr('fill', '#999')
      .attr('x', (v, i) => {
        return monthScale(i)
      })

    // 设置周坐标数据
    const weeks = ['一', '三', '五', '日']
    // 绘制周坐标
    const weekBox = svg.append('g').attr(
      'transform',
      'translate(' + (margin - 10) + ', ' + (margin + monthBoxHeight) + ')')
    const weekScale = d3.scaleLinear()
      .domain([0, weeks.length])
      .range([0, height - margin - monthBoxHeight + 14])

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
    const myColor = d3.scaleLinear([0, 5], ["white", "green"])

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

export default Heatmap
