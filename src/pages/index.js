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
import { ArrowUp, Trash2 } from "react-feather"
import Dialog from "../components/dialog"
import { getHabits, setHabits as setPersistHabits } from "../lib/optimistic"

const MenuButton = styled.button`
  ${tw`invisible rounded p-1 text-gray-400`};
  svg {
    ${tw`stroke-current`};
  }
  @media (hover: hover) {
    ${tw`hover:bg-gray-200 hover:text-gray-500`}
  }
`
const HabitItem = styled.li`
  transition: background 0.3s ease;
  ${tw`flex justify-between items-center border-b py-2 px-4 hover:bg-gray-100`}

  /* On desktop show menu button on hover */
  @media (hover: hover) {
    &:hover {
      ${MenuButton} {
        ${tw`visible`}
      }
    }
  }
  /* On mobile always show menu button */
  @media (pointer: coarse) {
    ${MenuButton} {
      ${tw`visible`}
    }
  }
`
const DeleteButton = props => (
  <MenuButton type="button" {...props}>
    <Trash2 size={20} />
  </MenuButton>
)

const fieldName = "task-name"

const IndexPage = ({ user, location }) => {
  const [habits, setHabitsState] = React.useState(getHabits())
  const setHabits = data => {
    setPersistHabits(data)
    setHabitsState(data)
  }
  const [loading, setLoading] = React.useState(
    habits.length === 0 ? true : false
  )
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
      .then(habits => {
        setHabits(habits)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [firebase, user.isLoggedIn, user.uid])

  const handleRemove = docId => {
    setHabits(habits.filter(habit => habit.id !== docId))

    firebase
      .firestore()
      .collection("habits")
      .doc(docId)
      .delete()
  }
  const handleSubmit = habit => {
    if (habit === "") return

    const newHabitRef = firebase
      .firestore()
      .collection("habits")
      .doc()

    setHabits(
      habits.concat({
        id: newHabitRef.id,
        value: habit,
      })
    )
    newHabitRef.set({
      habit,
      userId: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  const [openDialog, setOpenDialog] = React.useState(false)
  const [processHabit, setProcessHabit] = React.useState({})

  return (
    <Layout location={location}>
      <SEO title="Home" />
      <Dialog
        content={
          <>
            Are you sure you want to delete{" "}
            <strong>{processHabit.value}</strong>?
          </>
        }
        open={openDialog}
        onCancel={() => {
          setOpenDialog(false)
        }}
        onSubmit={() => {
          handleRemove(processHabit.id)
          setOpenDialog(false)
        }}
      />
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
              <HabitItem key={id}>
                <Link to={`/tasks?id=${id}`} css={tw`block w-full`}>
                  {value}
                </Link>
                <DeleteButton
                  onClick={() => {
                    setOpenDialog(true)
                    setProcessHabit({ id, value })
                  }}
                />
              </HabitItem>
            ))}
          </ul>
        )}
      </section>
      <form
        className="container mx-auto"
        css={tw`flex fixed inset-x-0 bottom-0 py-3 px-4 border-t border-gray-200`}
        onSubmit={e => {
          e.preventDefault()
          const newHabit = e.target.elements[fieldName].value

          Array.from(e.target.elements).forEach(element => {
            element.value = null
          })

          handleSubmit(newHabit)
        }}
      >
        <input
          css={css`
            ${tw`bg-gray-100 appearance-none border border-gray-300 rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500`}
          `}
          id={fieldName}
          type="text"
          placeholder="New cool habit"
        />
        <button
          type="submit"
          css={tw`ml-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-2`}
        >
          <ArrowUp size={16} />
        </button>
      </form>
    </Layout>
  )
}

export default withUser(IndexPage)
