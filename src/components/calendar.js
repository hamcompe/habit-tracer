import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import tw from "tailwind.macro"

const CalendarGrid = styled.section`
  font-variant-numeric: tabular-nums;
  font-feature-settings: tnum;
  text-align: right;
`
const DayTitleSegment = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  ${tw`mb-1 text-gray-700 font-semibold`};
`
const DayNumberSegment = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`
const checkStyle = ({ checked }) =>
  checked &&
  css`
    ${tw`bg-gray-400`};
    @media (hover: hover) {
      ${tw`hover:bg-gray-500`};
    }
  `
const DayList = styled.li`
  ${tw`text-gray-900 border-r border-b p-2`};
  @media (hover: hover) {
    ${tw`hover:bg-gray-200`};
  }
  &:nth-of-type(-n + 7) {
    ${tw`border-t`};
  }
  &:nth-of-type(7n + 1) {
    ${tw`border-l`};
  }
  ${checkStyle}
  ${props => props.unFocus && tw`text-gray-500`};
`

const getMonthYear = date =>
  date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  })

const getStartDay = date =>
  new Date(date.getFullYear(), date.getMonth()).getDay()
const getBeginOfMonth = date => new Date(date.getFullYear(), date.getMonth())
const addDay = (date, incrementalDay) => {
  const newDate = new Date(date)
  newDate.setDate(date.getDate() + incrementalDay)
  return newDate
}
function range({ start, end, num }) {
  const length = num || end - start + 1
  return Array.from({ length }).map((_, idx) => start + idx)
}

const TOTAL_DAY_CALENDAR = 42

const Calendar = ({
  focusDate = new Date(),
  didAtList = [new Date("2020-01-07"), new Date("2020-01-14")],
  onClick = date => {
    alert(`Clicked :${date.date.toDateString()}, is checked: ${date.isDid}`)
  },
}) => {
  const lookBackNum = getStartDay(focusDate)
  const beginOfFocusDate = getBeginOfMonth(focusDate)
  const incrementalDayList = range({
    start: -lookBackNum,
    num: TOTAL_DAY_CALENDAR,
  })
  const calendarDayList = incrementalDayList.map(incDay =>
    addDay(beginOfFocusDate, incDay)
  )
  const thisMonth = focusDate.getMonth()

  const isDid = date =>
    !!didAtList.find(
      didAt => didAt.toLocaleDateString() === date.toLocaleDateString()
    )

  return (
    <CalendarGrid>
      <h2 css={tw`text-l font-semibold text-center mb-4 mt-6`}>
        {getMonthYear(focusDate)}
      </h2>
      <DayTitleSegment>
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </DayTitleSegment>
      <DayNumberSegment>
        {calendarDayList.map(date => (
          <DayList
            key={date.getTime()}
            checked={isDid(date)}
            unFocus={thisMonth !== date.getMonth()}
            onClick={() => onClick({ isDid: isDid(date), date: date })}
          >
            {date.getDate()}
          </DayList>
        ))}
      </DayNumberSegment>
    </CalendarGrid>
  )
}

export default Calendar
