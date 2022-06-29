import React, { useState, useEffect } from 'react'
import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const Chart = ({ data }) => {

  const [chartData, setChartData] = useState([])


  const processData = () => {
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
      chartData.push({ name: monthHashmap.get((month+1).toString()), Total: usersInThisMonth.length })
    }

    setChartData(chartData.reverse())

  }

  useEffect(() => {
    processData();
  }, [data])

  return (
    <div className="chart">
      <div className="title">Last 10 Months</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart width={730} height={250} data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke='gray' />
          <YAxis stroke='gray' />
          <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
          <Tooltip />
          <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart