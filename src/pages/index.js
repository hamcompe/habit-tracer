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

const Form = styled.form`
  ${tw`w-full max-w-sm`}
`
const MenuButton = styled.button`
  ${tw`invisible rounded p-1`};
  @media (hover: hover) {
    ${tw`hover:bg-gray-100`}
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
    <Trash2 size={20} color="#a0aec0" />
  </MenuButton>
)

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

  const handleRemove = docId => {
    return firebase
      .firestore()
      .collection("habits")
      .doc(docId)
      .delete()
      .then(() => {
        setHabits(habits.filter(habit => habit.id !== docId))
      })
  }
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

  const [openDialog, setOpenDialog] = React.useState(false)
  const [processHabit, setProcessHabit] = React.useState({})

  return (
    <Layout>
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
          css={tw`flex fixed inset-x-0 bottom-0 py-3 px-4 border-t border-gray-200`}
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
        </div>
      </Form>
    </Layout>
  )
}

export default withUser(IndexPage)
