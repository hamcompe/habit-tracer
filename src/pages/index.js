import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "@emotion/styled"
import { css } from "@emotion/core"
import tw from "tailwind.macro"
import { FirebaseContext } from "gatsby-plugin-firebase"
import withUser from "../helpers/with-user"
import LoadingSpinner from "../components/loading-spinner"

const Button = styled.button`
  ${tw`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`};
`
const Form = styled.form`
  ${tw`w-full max-w-sm`}
`
const HabitItem = styled.li`
  transition: background 0.3s ease;
  ${tw`border-b py-2 px-4 hover:bg-blue-200`}
`

const fieldName = "task-name"

const IndexPage = ({ user }) => {
  const [habits, setHabits] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const firebase = React.useContext(FirebaseContext)

  React.useEffect(() => {
    if (!firebase || !user.isLoggedIn) {
      return
    }

    firebase
      .firestore()
      .collection("habits")
      .where("userId", "==", user.uid)
      .orderBy("createdAt")
      .get()
      .then(snapshot =>
        snapshot.docs
          .map(doc => ({ id: doc.id, value: doc.data() }))
          .map(data => ({ ...data, value: data.value.habit }))
      )
      .then(setHabits)
      .finally(() => {
        setLoading(false)
      })
  }, [firebase, user.isLoggedIn, user.uid])

  const handleSubmit = habit => {
    if (habit === "") return

    firebase
      .firestore()
      .collection("habits")
      .add({
        habit,
        userId: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(doc => {
        setHabits(habits.concat({ id: doc.id, value: habit }))
      })
  }

  return (
    <Layout>
      <SEO title="Home" />
      <section className="mt-4">
        <h1
          css={css`
            ${tw`text-xl font-semibold`}
          `}
        >
          Tasks
        </h1>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <ul className="mb-4">
            {habits.map(({ id, value }) => (
              <Link to={`/tasks?id=${id}`} key={id}>
                <HabitItem>{value}</HabitItem>
              </Link>
            ))}
          </ul>
        )}
      </section>
      <Form
        onSubmit={e => {
          e.preventDefault()
          const newHabit = e.target.elements[fieldName].value

          Array.from(e.target.elements).forEach(element => {
            element.value = null
          })

          handleSubmit(newHabit)
        }}
      >
        <div
          css={css`
            ${tw`md:flex md:items-center mb-6`}
          `}
        >
          <label
            css={css`
              ${tw`block text-gray-700 text-sm font-bold mb-2`}
            `}
            htmlFor={fieldName}
          >
            Task name
          </label>
          <input
            css={css`
              ${tw`bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
            `}
            id={fieldName}
            type="text"
            placeholder="Task name"
          />
        </div>
        <div
          css={css`
            ${tw`flex items-center justify-between`}
          `}
        >
          <Button type="submit">Add</Button>
        </div>
      </Form>
    </Layout>
  )
}

export default withUser(IndexPage)
