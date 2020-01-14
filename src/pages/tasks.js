import React from "react"
import queryString from "query-string"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "@emotion/styled"
import { css } from "@emotion/core"
import tw from "tailwind.macro"
import { FirebaseContext } from "gatsby-plugin-firebase"
import LoadingSpinner from "../components/loading-spinner"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`
const Column = styled.div`
  ${tw`bg-gray-400 h-12`};
  ${props => props.marked && tw`bg-gray-600`};
`
const HeaderColumn = styled.div`
  ${tw`bg-gray-500 h-12`};
`

const getNumListByLength = length =>
  Array.from({ length }).map((_, idx) => idx + 1)
const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate()
const getDateFromDay = ({ year = 2020, month = 0, day }) =>
  new Date(year, month, day)

const IndexPage = ({ location }) => {
  const { id } = queryString.parse(location.search) || {}
  const firebase = React.useContext(FirebaseContext)
  const [habit, setHabit] = React.useState(null)
  const [didAtList, setDidAtList] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!firebase) {
      return
    }

    firebase
      .firestore()
      .collection("habits")
      .doc(id)
      .get()
      .then(doc => doc.data())
      .then(data => {
        setHabit(data.habit)

        return !data.didAtList
          ? []
          : data.didAtList
              .map(timestamp => timestamp.seconds)
              .map(dateSec => new Date(dateSec * 1000))
      })
      .then(setDidAtList)
      .finally(() => {
        setLoading(false)
      })
  }, [firebase, id])

  const updateList = didAtList => {
    firebase
      .firestore()
      .collection("habits")
      .doc(id)
      .update({
        didAtList,
      })
  }

  const numDays = getDaysInMonth(2020, 1)
  const days = getNumListByLength(numDays)

  return (
    <Layout>
      <SEO title="Tasks" />
      <h1>Tasks: {habit}</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid>
          <HeaderColumn>Sun</HeaderColumn>
          <HeaderColumn>Mon</HeaderColumn>
          <HeaderColumn>Tue</HeaderColumn>
          <HeaderColumn>Wed</HeaderColumn>
          <HeaderColumn>Thu</HeaderColumn>
          <HeaderColumn>Fri</HeaderColumn>
          <HeaderColumn>Sat</HeaderColumn>
          {days.map(day => {
            const hasDone = didAtList.find(didAt => didAt.getDate() === day)
            return (
              <Column
                key={day}
                onClick={() => {
                  if (hasDone) {
                    const removedDayList = didAtList.filter(
                      didAt => didAt.getDate() !== day
                    )
                    setDidAtList(removedDayList)
                    updateList(removedDayList)
                  } else {
                    const newDate = getDateFromDay({ day })
                    const newDidAtList = didAtList.concat(newDate)
                    setDidAtList(newDidAtList)
                    updateList(newDidAtList)
                  }
                }}
                marked={hasDone}
              >
                {day}
              </Column>
            )
          })}
        </Grid>
      )}
    </Layout>
  )
}

export default IndexPage
