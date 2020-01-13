import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "@emotion/styled"
import { css } from "@emotion/core"
import tw from "tailwind.macro"

const Button = styled.button`
  ${tw`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`};
`
const Form = styled.form`
  ${tw`w-full max-w-sm`}
`

const fieldName = "task-name"

const IndexPage = () => {
  const [tasks, setTasks] = React.useState([])

  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h1
          css={css`
            ${tw`text-xl`}
          `}
        >
          Tasks
        </h1>
        <ul>
          {tasks.map(task => (
            <li key={task}>
              <Link to={`/tasks?id=${task}`}>{task}</Link>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <Form
        onSubmit={e => {
          e.preventDefault()
          const value = e.target.elements[fieldName].value

          Array.from(e.target.elements).forEach(element => {
            element.value = null
          })

          setTasks(tasks.concat(value))
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
          <Button type="button">Add</Button>
        </div>
      </Form>
    </Layout>
  )
}

export default IndexPage
