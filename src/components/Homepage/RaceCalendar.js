import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import { scheduleRaces as apiScheduleRaces } from '../../api/raceSchedule'

import 'swiper/swiper.min.css'
import './RaceCalendar.css'

SwiperCore.use([Pagination])

const MMMStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function RaceCalendarItem({ item: { date, raceName, Circuit: { circuitName, circuitId, Location } } }) {
  const { country } = Location
  const dateObj = new Date(date)
  const timeDate = (dateObj.getDate() > 9 ? '' : '0') + dateObj.getDate()
  const timeMonth = MMMStrings[dateObj.getMonth()]

  return <>
    <div className="country">{country}</div>
    <div className="race-details"></div>
    <div className="race-short-date d-flex flex-column">
      <time className="date">{timeDate}</time>
      <time className="timeMonth">{timeMonth}</time>
    </div>
  </> 
}

export default function RaceCalendar() {
  const [races, setRaces] = useState([])

  useEffect(() => {
    const loadScheduleOfRaces = async () => {
      apiScheduleRaces('current').then(res => {
        const { MRData: { RaceTable: { Races: raceList } } } = res
        setRaces(raceList)
      })
    }
    loadScheduleOfRaces()
  }, [])

  return (
    <div className="race-calendar">
      <div className="parallax"></div>
      <Swiper
        slidesPerView={'auto'}
        freeMode={true}
        pagination={{ "clickable": true }}
      >
        {races.map((race, index) =>
          <SwiperSlide key={index} className="race">
            <RaceCalendarItem item={race}></RaceCalendarItem>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}
