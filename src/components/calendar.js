import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import tw from "tailwind.macro"
import { ArrowLeft, ArrowRight } from "react-feather"

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
const DayList = styled.li`
  ${tw`border-r border-b`};
  &:nth-of-type(-n + 7) {
    ${tw`border-t`};
  }
  &:nth-of-type(7n + 1) {
    ${tw`border-l`};
  }
`
const DayLabel = styled.label`
  ${tw`block cursor-pointer text-gray-900 p-2`};
  @media (hover: hover) {
    ${tw`hover:bg-gray-200`};
  }
  input:checked + & {
    ${tw`bg-gray-400`};
    @media (hover: hover) {
      ${tw`hover:bg-gray-500`};
    }
  }
  ${props => props.unFocus && tw`text-gray-500`}
`

const getMonth = date =>
  date.toLocaleDateString(undefined, {
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
const addMonth = (date, incrementalMonth) => {
  const newDate = new Date(date)
  newDate.setDate(1)
  newDate.setMonth(date.getMonth() + incrementalMonth)
  return newDate
}
const nextBeginOfMonth = date => addMonth(date, 1)
const previousBeginOfMonth = date => addMonth(date, -1)

const TOTAL_DAY_CALENDAR = 42

const Calendar = ({
  initialFocusDate = new Date(),
  didAtList = [new Date("2020-01-07"), new Date("2020-01-14")],
  onClick = date => {
    alert(`Clicked :${date.date.toDateString()}, is checked: ${date.isDid}`)
  },
}) => {
  const [focusDate, setFocusDate] = React.useState(initialFocusDate)
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
      <div className="flex justify-between items-center mb-4 mt-6">
        <button
          className="text-gray-500 hover:bg-gray-200 hover:text-gray-600 p-1 rounded"
          type="button"
          onClick={() => {
            setFocusDate(previousBeginOfMonth(focusDate))
          }}
        >
          <ArrowLeft />
        </button>
        <h2 css={tw`text-xl text-center`}>
          <span className="font-bold">{getMonth(focusDate)}</span>{" "}
          <span className="font-light">{focusDate.getFullYear()}</span>
        </h2>
        <button
          className="text-gray-500 hover:bg-gray-200 hover:text-gray-600 p-1 rounded"
          type="button"
          onClick={() => {
            setFocusDate(nextBeginOfMonth(focusDate))
          }}
        >
          <ArrowRight />
        </button>
      </div>
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
          <DayList key={date.getTime()}>
            <input
              className="hidden"
              id={date.getTime()}
              type="checkbox"
              onChange={() => {
                onClick({ isDid: isDid(date), date: date })
              }}
              checked={isDid(date)}
            />
            <DayLabel
              htmlFor={date.getTime()}
              unFocus={thisMonth !== date.getMonth()}
            >
              {date.getDate()}
            </DayLabel>
          </DayList>
        ))}
      </DayNumberSegment>
    </CalendarGrid>
  )
}

export default Calendar
