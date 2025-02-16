import { useEffect, useCallback } from 'react'
import * as d3 from 'd3'
import { useTheme } from '@mui/material'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import './index.scss'

const Heatmap = ({ heatmapDataset }) => {
  const theme = useTheme()

  const generateDataset = useCallback((options = {}) => {
    const forwardDays = 14 * 7 // 列 * 行
    const config = { fill: {}, ...options }

    const days = new Array(forwardDays)
      .fill(null)
      .map((_, idx) => {
        const date = dayjs().subtract(idx, 'days').format('YYYY-MM-DD')
        const total = config.fill[date]
        return { date, ...(total && { total }) }
      })
      .reverse()

    return { days }
  }, [])

  const init = useCallback(() => {
    const ele = document.getElementById('sa_heatmap')
    if (ele.innerHTML) {
      ele.innerHTML = ''
    }

    const dataset = generateDataset({
      fill: heatmapDataset.reduce((result, { Date, Total }) => {
        result[Date] = (result[Date] || 0) + Total
        return result
      }, {}),
    })

    // 设置图表参数
    const width = 240
    const height = 143
    const margin = 0
    const weekBoxWidth = 0
    const monthBoxHeight = 15
    const cellMargin = 4
    const cellSize =
      (height - margin - monthBoxHeight - cellMargin * 6 - 10) / 7

    const svg = d3
      .select('#sa_heatmap')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const cellBox = svg
      .append('g')
      .attr('transform', `translate(${margin + weekBoxWidth}, ${margin + 10})`)

    // Build color scale
    const myColor = d3
      .scaleLinear()
      .domain([0, 5])
      .range([`${theme.palette.primary.main}40`, theme.palette.primary.main])

    // create a tooltip
    const tooltip = d3
      .select('#sa_heatmap')
      .append('div')
      .style('opacity', 0)
      .style('font-size', '12px')
      .style('color', theme.palette.mode === 'dark' ? '#fff' : '#333')
      .style('background-color', 'rgba(255, 255, 255, 0.1)')
      .style('backdrop-filter', 'blur(10px)')
      .style('-webkit-backdrop-filter', 'blur(10px)')
      .style('position', 'fixed')
      .style('border', '1px solid rgba(255, 255, 255, 0.2)')
      .style('border-radius', '8px')
      .style('padding', '8px 12px')
      .style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)')

    let cellCol = 0

    cellBox
      .selectAll('rect')
      .data(dataset.days)
      .enter()
      .append('rect')
      .attr('x', (_, i) => {
        if (i % 7 === 0) cellCol++
        const x = (cellCol - 1) * cellSize
        return cellCol > 1 ? x + cellMargin * (cellCol - 1) : x
      })
      .attr('y', (_, i) => {
        const y = i % 7
        return y > 0 ? y * cellSize + cellMargin * y : y * cellSize
      })
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('rx', 4)
      .style('fill', ({ total }) => {
        if (!total) {
          return theme.palette.mode === 'dark' ? '#fff' : '#eeeeee'
        }
        return myColor(total)
      })
      .on('mouseover', function () {
        tooltip.style('opacity', 1)
        d3.select(this).style('opacity', 1).style('stroke', '#333')
      })
      .on('mousemove', (event, d) => {
        tooltip
          .html(d.date)
          .style('top', `${event.clientY + 20}px`)
          .style('left', `${event.clientX + 20}px`)
      })
      .on('mouseleave', function () {
        tooltip.style('opacity', 0)
        d3.select(this).style('stroke', 'none').style('opacity', 1)
      })
  }, [
    generateDataset,
    heatmapDataset,
    theme.palette.mode,
    theme.palette.primary.main,
  ])

  useEffect(() => {
    init()
  }, [init])

  return <div id="sa_heatmap" />
}

Heatmap.propTypes = {
  heatmapDataset: PropTypes.arrayOf(
    PropTypes.shape({
      Date: PropTypes.string.isRequired,
      Total: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default Heatmap
