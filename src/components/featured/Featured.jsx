import React, { useEffect, useState } from 'react'
import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import moment from 'moment';

const Featured = ({ data }) => {

  const [percentage, setPercentage] = useState('')
  const [todayNumber, setTodayNumber] = useState(0)
  const [lastWeekNumber, setlastWeekNumber] = useState(0)
  const [lastMonthNumber, setlastMonthNumber] = useState(0)


  const processData = () => {

    const yesterday = moment().subtract(1, 'day')

    const lastWeek = moment().subtract(1, 'week')

    const lastMonth = moment().subtract(1, 'month')

    var noOfRecordYest = data.filter((val) => {
      //console.log(moment(val) + " " + yesterday)
      return moment(val) <= yesterday
    })

    var noOfRecordLastWeek = data.filter((val) => {
      return moment(val) <= lastWeek
    })

    var noOfRecordLastMonth = data.filter((val) => {
      return moment(val) <= lastMonth
    })

    //console.log("yesterday", noOfRecordYest)
   // console.log("lastWeek: ", noOfRecordLastWeek)
    //console.log("lastMonth: ", noOfRecordLastMonth)

    setTodayNumber(data.length - noOfRecordYest.length)

    setPercentage(Math.round((data.length - noOfRecordYest.length) / noOfRecordYest.length * 100))

    setlastWeekNumber(data.length - noOfRecordLastWeek.length)

    setlastMonthNumber(data.length - noOfRecordLastMonth.length)

  }

  useEffect(() => {
    processData();
  })
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Statistics</h1>
        <MoreVertIcon fontSize='small' />
      </div>
      <div className="bottom">
        <p className="title">Percentage change</p>
        <div className="featuredChart">
          <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={5} />
        </div>
        <p className="title">Total number today</p>
        <p className="amount">{todayNumber}</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className={`itemResult ${lastWeekNumber == 0 ? "noChange" : "positive"}`}>
              {lastWeekNumber == 0 ? <HorizontalRuleIcon /> : <KeyboardArrowUpOutlinedIcon font='small' />}
              {lastWeekNumber != 0 && <div className="resultAmount">{lastWeekNumber}</div>}
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className={`itemResult ${lastWeekNumber == 0 ? "noChange" : "positive"}`}>
              {lastMonthNumber == 0 ? <HorizontalRuleIcon /> : <KeyboardArrowUpOutlinedIcon font='small' />}
              {lastMonthNumber != 0 && <div className="resultAmount">{lastMonthNumber}</div>}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Featured