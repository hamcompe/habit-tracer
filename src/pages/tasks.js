import React from "react"
import queryString from "query-string"

import Layout from "../components/layout"
import SEO from "../components/seo"

import tw from "tailwind.macro"
import { FirebaseContext } from "gatsby-plugin-firebase"
import LoadingSpinner from "../components/loading-spinner"
import Calendar from "../components/calendar"

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

  return (
    <Layout>
      <SEO title="Tasks" />
      <h1 css={tw`text-xl font-semibold mb-4 mt-4`}>Task: {habit}</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Calendar
          focusDate={new Date()}
          didAtList={didAtList}
          onClick={({ isDid, date }) => {
            if (isDid) {
              const removedDayList = didAtList.filter(
                didAt => didAt.toJSON() !== date.toJSON()
              )
              setDidAtList(removedDayList)
              updateList(removedDayList)
            } else {
              const newDidAtList = didAtList.concat(date)
              setDidAtList(newDidAtList)
              updateList(newDidAtList)
            }
          }}
        />
      )}
    </Layout>
  )
}

export default IndexPage
