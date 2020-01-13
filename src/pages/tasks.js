import React from "react"
import queryString from "query-string"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "@emotion/styled"
import { css } from "@emotion/core"
import tw from "tailwind.macro"

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

const IndexPage = ({ location }) => {
  console.log(queryString.parse(location.search))
  const [didItList, setDidItList] = React.useState([])

  const numDays = getDaysInMonth(2020, 1)
  const days = getNumListByLength(numDays)

  return (
    <Layout>
      <SEO title="Tasks" />
      <h1>Tasks</h1>
      <Grid>
        <HeaderColumn>Sun</HeaderColumn>
        <HeaderColumn>Mon</HeaderColumn>
        <HeaderColumn>Tue</HeaderColumn>
        <HeaderColumn>Wed</HeaderColumn>
        <HeaderColumn>Thu</HeaderColumn>
        <HeaderColumn>Fri</HeaderColumn>
        <HeaderColumn>Sat</HeaderColumn>
        {days.map(day => (
          <Column
            key={day}
            onClick={() => {
              if (didItList.find(didIt => didIt === day)) {
                setDidItList(didItList.filter(didIt => didIt !== day))
              } else {
                setDidItList(didItList.concat(day))
              }
            }}
            marked={didItList.find(didIt => didIt === day)}
          >
            {day}
          </Column>
        ))}
      </Grid>
    </Layout>
  )
}

export default IndexPage
