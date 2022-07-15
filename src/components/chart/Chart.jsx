import React, { useState, useEffect } from 'react'
import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import moment from 'moment';

const Chart = ({ data, type }) => {

  const [chartData, setChartData] = useState([])


  const processHomeData = () => {
    const monthHashmap = new Map()
    monthHashmap.set('1', 'January')
    monthHashmap.set('2', 'February')
    monthHashmap.set('3', 'March')
    monthHashmap.set('4', 'April')
    monthHashmap.set('5', 'May')
    monthHashmap.set('6', 'June')
    monthHashmap.set('7', 'July')
    monthHashmap.set('8', 'August')
    monthHashmap.set('9', 'September')
    monthHashmap.set('10', 'October')
    monthHashmap.set('11', 'November')
    monthHashmap.set('12', 'December')

    const chartData = []
    for (let i = 0; i < 10; i++) {
      const month = moment().subtract(i, 'months').month()
      const year = moment().subtract(i, 'months').year()
      const usersInThisMonth = data.filter((val) => {
        return moment(val).month() == month && moment(val).year() == year
      })
      chartData.push({ Name: monthHashmap.get((month + 1).toString()), Total: usersInThisMonth.length })
    }

    setChartData(chartData.reverse())

  }

  const processTrailDetailData = () => {
    const chartData = data.xlabel.map((xlabel, index) => {
      return { Distance: xlabel, Height: data.ylabel[index] }
    })
    console.log(chartData)
    setChartData(chartData)
  }

  useEffect(() => {
    type == 'trailDetail' ? processTrailDetailData() : processHomeData();
  }, [data])

  return (
    <div className="chart">
      <div className="title">{type == 'trailDetail' ? "Height Chart" : "Last 10 Months"}</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart width={730} height={300} data={chartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey={type == 'trailDetail' ? "Distance" : "Name"} stroke='gray'>
            <Label value={type == 'trailDetail' ? "Distance (km)" : "Month"} offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis stroke='gray'>
            <Label value={type == 'trailDetail' ? "Height (m)" : "Number"} offset={0} position="insideLeft" angle="-90"/>
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
          <Tooltip />
          <Area type="monotone" dataKey={type == 'trailDetail' ? "Height" : "Total"} stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart