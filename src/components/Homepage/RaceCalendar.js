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
    <div className="country">
      <span className="name">{country}</span>
    </div>
    <div className="race-details"></div>
    <div className="race-short-date d-flex flex-column">
      <time className="date">{timeDate}</time>
      <time className="month">{timeMonth}</time>
    </div>
  </> 
}

let racesLoaded = false
let isFirstIndexSetted = false

export default function RaceCalendar() {
  const [races, setRaces] = useState([])
  const [swiperRef, setSwiperRef] = useState(null)

  const swiperSlideTo = (index) => {
    if (swiperRef) {
      swiperRef.slideTo(index - 1, 0)
    }
  }

  useEffect(() => {
    const loadScheduleOfRaces = async () => {
      apiScheduleRaces('current').then(res => {
        const { MRData: { RaceTable: { Races: raceList } } } = res
        setRaces(raceList)
        racesLoaded = true
      })
    }
    loadScheduleOfRaces()
  }, [])

  if (!racesLoaded & !isFirstIndexSetted) {
    let activeIndex = 0
    for (; activeIndex < races.length; activeIndex++) {
      if (new Date(races[activeIndex].date) > new Date()) {
        break
      }
    }

    if (activeIndex === races.length) {
      activeIndex = races.length - 1
    } else if (activeIndex > 0) {
      activeIndex = activeIndex - 1
    }

    swiperSlideTo(activeIndex)
    isFirstIndexSetted = true
  }

  return (
    <div className="race-calendar">
      <div className="parallax"></div>
      <Swiper
        slidesPerView={'auto'}
        centeredSlides={true}
        freeMode={true}
        pagination={{ clickable: true }}
        onSwiper={setSwiperRef}
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
